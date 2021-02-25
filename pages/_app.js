import { useEffect, useRef } from 'react'
import { ChakraProvider } from "@chakra-ui/react"
import { SWRConfig } from 'swr'
import { MDXProvider } from '@mdx-js/react'
import { DefaultSeo } from 'next-seo';
import Router from 'next/router'
import NProgress from 'nprogress'

import { AuthProvider } from "@/lib/auth"
import { GlobalStyle } from "@/components/global-style"
import MdxComponents from "@/components/mdx-components"
import { fetcher } from "@/utils/fetcher"
import theme from "@/styles/theme"

import SEO from '../next-seo.config';

function MyIssue({ Component, pageProps }) {
  const timeout  = useRef(null)
  useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      timeout.current = setTimeout(() => NProgress.start(), 100)
    })
    Router.events.on('routeChangeComplete', () => {
      clearTimeout(timeout.current)
      NProgress.done()
    })
    Router.events.on('routeChangeError', () => {
      clearTimeout(timeout.current)
      NProgress.done()
    })
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <DefaultSeo {...SEO} />
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
