
import {isRenderingOnServer} from "@/utils/is-rendering-on-server"

const getDevicePxRatio = () => window.devicePixelRatio || 1
const getVisualViewport = () => ({
  pinchZoomScalingFactor: window.visualViewport.scale,
  cssPixelHight: window.visualViewport.height,
  cssPixelWidth: window.visualViewport.width
})
const getWindow = () => ({
  innerHeight: window.innerHeight,
  innerWidth: window.innerWidth,
  outerHeight: window.outerHeight,
  outerWidth: window.outerWidth,
})


export const useDisplay = () => {
  return isRenderingOnServer ? {} : {
    devicePixelRatio: getDevicePxRatio(),
    ...getVisualViewport(),
    ...getWindow()
  }
}