import { useState, useEffect } from "react"
import { isRenderingOnServer } from "@/utils/is-rendering-on-server"

const getInitialState = (query) => {
  return isRenderingOnServer ? true : !window.matchMedia(query).matches
}

export const useMatchMediaQuery = (query) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    getInitialState(query)
  )

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query)
    const handleChange = (event) => {
      setPrefersReducedMotion(!event.matches)
    }
    mediaQueryList.addListener(handleChange)
    return () => mediaQueryList.removeListener(handleChange)
  }, [])
  return prefersReducedMotion
}
