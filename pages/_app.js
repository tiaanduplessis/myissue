import { ChakraProvider } from "@chakra-ui/react"
import { SWRConfig } from 'swr'

import { AuthProvider } from "@/lib/auth"
import theme from "@/styles/theme"
import { GlobalStyle } from "@/components/global-style"

import {fetcher} from "@/utils/fetcher"

function MyIssue({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <GlobalStyle />
        <SWRConfig value={{
          fetcher,
          onError: (error, key) => {
            if (error.status !== 403 && error.status !== 404) {
              // TODO: track errors
            }
          }
        }}>
          <Component {...pageProps} />
        </SWRConfig>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyIssue
