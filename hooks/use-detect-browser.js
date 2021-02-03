import {detect} from 'detect-browser'

import {isRenderingOnServer} from "@/utils/is-rendering-on-server"

export const useDetectBrowser = () => {
  return isRenderingOnServer ? {
    name: null,
    version: null,
    os: null,
    type: 'server'
  } : detect()
}