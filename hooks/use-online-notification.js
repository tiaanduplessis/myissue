import {useState, useEffect} from 'react'
import { useToast } from "@chakra-ui/react"

import {isRenderingOnServer} from "@/utils/is-rendering-on-server"

const getInitialState = () => isRenderingOnServer ? true : navigator.onLine

export const useOnlineNotifcation = () => {
    const toast = useToast()
    const [isOnline, setOnline] = useState(getInitialState)

    useEffect(() => {
        if (!isRenderingOnServer) {
            const handleOnline = () => {
                if (!isOnline) {
                    toast({
                        title: "Yay!",
                        description: "You are back online.",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                    })
                }
                setOnline(true)
            }
            const handleOffline = () => {
                if (isOnline) {
                    toast({
                        title: "Oh noes!",
                        description: "You appear to be offline.",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    })
                }
                setOnline(false)
            }

            window.addEventListener('online', handleOnline)
            window.addEventListener('offline', handleOffline)

            return () => {
                window.removeEventListener('online', handleOnline)
                window.removeEventListener('offline', handleOffline)
            }
        }

        
    }, [])
}