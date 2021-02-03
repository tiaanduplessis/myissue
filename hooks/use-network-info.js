import { useState, useEffect } from "react"

import { isRenderingOnServer } from "@/utils/is-rendering-on-server"

const getConnection = () =>
  navigator.connection || navigator.mozConnection || navigator.webkitConnection

const getInitialState = () =>
  isRenderingOnServer ? {} : getInfo(getConnection())

const getInfo = (connection) => ({
  downlink: connection.downlink,
  effectiveType: connection.effectiveType,
  rtt: connection.rtt,
  saveData: connection.saveData,
})

export const useNetworkInfo = () => {
  const [networkInfo, setNetworkInfo] = useState(getInitialState)

  useEffect(() => {
    if (!isRenderingOnServer) {
      const connection = getConnection()

      const handleNetworkInfoChanged = () => {
        setNetworkInfo(getInfo(connection))
      }

      connection.addEventListener("change", handleNetworkInfoChanged)
    }
  })

  return networkInfo
}
