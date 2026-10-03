import { isRenderingOnServer } from "@/utils/is-rendering-on-server"

const getDevicePxRatio = () => window.devicePixelRatio || 1
const getVisualViewport = () => {
  const viewport = window.visualViewport
  if (!viewport) return {}

  return [
    ["pinchZoomScalingFactor", "scale"],
    ["cssPixelHight", "height"],
    ["cssPixelWidth", "width"],
  ].reduce((info, [key, field]) => {
    if (viewport[field] !== undefined) info[key] = viewport[field]
    return info
  }, {})
}
const getWindow = () => {
  const contentWidth =
    [...document.body.children].reduce(
      (a, el) => Math.max(a, el.getBoundingClientRect().right),
      0
    ) - document.body.getBoundingClientRect().x

  return {
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
    outerHeight: window.outerHeight,
    outerWidth: window.outerWidth,
    windowWidth: document.documentElement.clientWidth,
    windowHeight: document.documentElement.clientHeight,
    pageWidth: Math.min(document.body.scrollWidth, contentWidth),
    pageHeight: document.body.scrollHeight,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
  }
}

export const useDisplay = () => {
  return isRenderingOnServer
    ? {}
    : {
        devicePixelRatio: getDevicePxRatio(),
        ...getVisualViewport(),
        ...getWindow(),
      }
}
