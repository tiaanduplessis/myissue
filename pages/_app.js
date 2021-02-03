import { ChakraProvider } from "@chakra-ui/react"

import { AuthProvider } from "@/lib/auth"
import theme from "@/styles/theme"
import { GlobalStyle } from "@/components/global-style"

function Logabug({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default Logabug
