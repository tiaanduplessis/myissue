import { isRenderingOnServer } from "@/utils/is-rendering-on-server"

const getDevicePxRatio = () => window.devicePixelRatio || 1
const getVisualViewport = () => ({
  pinchZoomScalingFactor: window.visualViewport.scale,
  cssPixelHight: window.visualViewport.height,
  cssPixelWidth: window.visualViewport.width,
})
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
