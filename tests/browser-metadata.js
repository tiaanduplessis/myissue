const assert = require("assert")
const fs = require("fs")
const path = require("path")
const vm = require("vm")
const React = require("react")
const { create, act } = require("react-test-renderer")
const { renderToString } = require("react-dom/server")

// These hooks contain no JSX. Load their source with browser globals isolated
// per test, without changing the application's Babel or Next configuration.
const loadHook = (name, globals = {}, server = false) => {
  const source = fs
    .readFileSync(path.join(__dirname, "../hooks", name + ".js"), "utf8")
    .replace(
      'import { useState, useEffect } from "react"',
      "const { useState, useEffect } = React"
    )
    .replace(
      'import { isRenderingOnServer } from "@/utils/is-rendering-on-server"',
      "const isRenderingOnServer = " + server
    )
    .replace("export const ", "const ")
  const exportName = name.replace(/-([a-z])/g, (_, letter) =>
    letter.toUpperCase()
  )
  return vm.runInNewContext(source + "\n" + exportName, {
    React,
    ...globals,
  })
}

const plain = (value) => Object.assign({}, value)
const mountHook = (hook) => {
  let value
  const Consumer = () => {
    value = hook()
    return null
  }
  let renderer
  act(() => {
    renderer = create(React.createElement(Consumer))
  })
  return {
    value: () => plain(value),
    rerender: () => act(() => renderer.update(React.createElement(Consumer))),
    unmount: () => act(() => renderer.unmount()),
  }
}

let passed = 0
const test = (name, run) => {
  run()
  passed += 1
  console.log("ok - " + name)
}

test("server rendering does not access browser globals", () => {
  for (const name of ["use-network-info", "use-display"]) {
    const hook = loadHook(name, {}, true)
    renderToString(
      React.createElement(() => {
        assert.deepStrictEqual(plain(hook()), {})
        return null
      })
    )
  }
})

test("missing Network Information API is harmless on mount and rerender", () => {
  const consumer = mountHook(loadHook("use-network-info", { navigator: {} }))
  assert.deepStrictEqual(consumer.value(), {})
  consumer.rerender()
  assert.deepStrictEqual(consumer.value(), {})
  consumer.unmount()
})

test("partial network metadata omits undefined and preserves zero/false", () => {
  const consumer = mountHook(
    loadHook("use-network-info", {
      navigator: {
        connection: { downlink: 0, rtt: undefined, saveData: false },
      },
    })
  )
  assert.deepStrictEqual(consumer.value(), { downlink: 0, saveData: false })
  consumer.unmount()
})

test("prefixed Network Information APIs remain supported", () => {
  for (const key of ["mozConnection", "webkitConnection"]) {
    const consumer = mountHook(
      loadHook("use-network-info", {
        navigator: { [key]: { effectiveType: "3g" } },
      })
    )
    assert.deepStrictEqual(consumer.value(), { effectiveType: "3g" })
    consumer.unmount()
  }
})

test("partial event APIs are not called and do not leak subscriptions", () => {
  for (const methods of [
    {},
    { addEventListener: true, removeEventListener: true },
    { addEventListener: () => assert.fail("cannot clean up this listener") },
    { removeEventListener: () => assert.fail("never subscribed") },
  ]) {
    const consumer = mountHook(
      loadHook("use-network-info", {
        navigator: { connection: { effectiveType: "4g", ...methods } },
      })
    )
    assert.deepStrictEqual(consumer.value(), { effectiveType: "4g" })
    consumer.rerender()
    consumer.unmount()
  }
})

test("network changes update metadata, subscribe once, and clean up on unmount", () => {
  const listeners = new Set()
  let added = 0
  let removed = 0
  const connection = {
    downlink: 10,
    effectiveType: "4g",
    rtt: 50,
    saveData: false,
    addEventListener(event, listener) {
      assert.strictEqual(this, connection)
      assert.strictEqual(event, "change")
      listeners.add(listener)
      added += 1
    },
    removeEventListener(event, listener) {
      assert.strictEqual(this, connection)
      assert.strictEqual(event, "change")
      assert.ok(listeners.delete(listener))
      removed += 1
    },
  }
  const consumer = mountHook(
    loadHook("use-network-info", { navigator: { connection } })
  )
  assert.deepStrictEqual(consumer.value(), {
    downlink: 10,
    effectiveType: "4g",
    rtt: 50,
    saveData: false,
  })
  consumer.rerender()
  connection.downlink = 0
  connection.rtt = undefined
  connection.saveData = true
  act(() => listeners.forEach((listener) => listener()))
  assert.deepStrictEqual(consumer.value(), {
    downlink: 0,
    effectiveType: "4g",
    saveData: true,
  })
  assert.strictEqual(added, 1)
  consumer.unmount()
  assert.strictEqual(removed, 1)
  assert.strictEqual(listeners.size, 0)
})

const displayGlobals = (visualViewport) => ({
  window: {
    visualViewport,
    devicePixelRatio: 2,
    innerWidth: 800,
    innerHeight: 600,
    outerWidth: 820,
    outerHeight: 640,
    screen: { width: 1920, height: 1080 },
  },
  document: {
    body: {
      children: [{ getBoundingClientRect: () => ({ right: 800 }) }],
      getBoundingClientRect: () => ({ x: 0 }),
      scrollWidth: 800,
      scrollHeight: 1200,
    },
    documentElement: { clientWidth: 800, clientHeight: 600 },
  },
})

test("missing visualViewport preserves the remaining display metadata", () => {
  const info = loadHook("use-display", displayGlobals())()
  assert.strictEqual(info.devicePixelRatio, 2)
  assert.strictEqual(info.screenWidth, 1920)
  assert.strictEqual(info.windowWidth, 800)
  assert.ok(!("cssPixelWidth" in info))
  assert.ok(Object.values(info).every((value) => value !== undefined))
})

test("partial visualViewport omits unsupported fields", () => {
  const info = loadHook("use-display", displayGlobals({ width: 0 }))()
  assert.strictEqual(info.cssPixelWidth, 0)
  assert.ok(!("cssPixelHight" in info))
  assert.ok(!("pinchZoomScalingFactor" in info))
})

test("supported visualViewport keeps the existing metadata keys and values", () => {
  const info = loadHook(
    "use-display",
    displayGlobals({ width: 400, height: 300, scale: 2 })
  )()
  assert.strictEqual(info.cssPixelWidth, 400)
  assert.strictEqual(info.cssPixelHight, 300)
  assert.strictEqual(info.pinchZoomScalingFactor, 2)
})

console.log(passed + " browser metadata tests passed")
