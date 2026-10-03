import { useState, useEffect } from "react"

import { isRenderingOnServer } from "@/utils/is-rendering-on-server"

const getConnection = () =>
  navigator.connection || navigator.mozConnection || navigator.webkitConnection

const getInitialState = () =>
  isRenderingOnServer ? {} : getInfo(getConnection())

const getInfo = (connection) => {
  if (!connection) return {}

  // Unsupported fields must be omitted: Firestore rejects undefined values.
  return ["downlink", "effectiveType", "rtt", "saveData"].reduce(
    (info, key) => {
      if (connection[key] !== undefined) info[key] = connection[key]
      return info
    },
    {}
  )
}

export const useNetworkInfo = () => {
  const [networkInfo, setNetworkInfo] = useState(getInitialState)

  useEffect(() => {
    if (isRenderingOnServer) return

    const connection = getConnection()
    if (
      !connection ||
      typeof connection.addEventListener !== "function" ||
      typeof connection.removeEventListener !== "function"
    ) {
      return
    }

    const handleNetworkInfoChanged = () => {
      setNetworkInfo(getInfo(connection))
    }

    connection.addEventListener("change", handleNetworkInfoChanged)
    return () =>
      connection.removeEventListener("change", handleNetworkInfoChanged)
  }, [])

  return networkInfo
}
