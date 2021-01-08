import { AuthProvider } from '@/lib/auth'

function Logabug({ Component, pageProps }) {
  return <AuthProvider>
    <Component {...pageProps} />
  </AuthProvider>
}

export default Logabug
