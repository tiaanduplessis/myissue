import { isRenderingOnServer } from "@/utils/is-rendering-on-server"

export const useCookieEnabled = () => {
  return isRenderingOnServer ? false : navigator.cookieEnabled
}
