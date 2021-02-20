import { ChakraProvider } from "@chakra-ui/react"
import { SWRConfig } from 'swr'
import { MDXProvider } from '@mdx-js/react'

import { AuthProvider } from "@/lib/auth"

import theme from "@/styles/theme"

import { GlobalStyle } from "@/components/global-style"
import MdxComponents from "@/components/mdx-components"

import { fetcher } from "@/utils/fetcher"

function MyIssue({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <SWRConfig value={{
        fetcher,
        onError: (error, key) => {
          if (error.status !== 403 && error.status !== 404) {
            // TODO: track errors
          }
        }
      }}>
        <AuthProvider>
          <MDXProvider components={MdxComponents}>
            <GlobalStyle />
            <Component {...pageProps} />
          </MDXProvider>
        </AuthProvider>
      </SWRConfig>
    </ChakraProvider>
  )
}

export default MyIssue
