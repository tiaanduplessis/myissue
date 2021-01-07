import { AuthProvider } from '../lib/auth'
import '../styles/globals.css'

function Logabug({ Component, pageProps }) {
  return <AuthProvider>
    <Component {...pageProps} />
  </AuthProvider>
}

export default Logabug
