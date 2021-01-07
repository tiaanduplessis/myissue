import Head from 'next/head'
import { useAuth } from '../lib/auth'

export default function Home() {
  const auth = useAuth()

  return (
    <div>
      <Head>
        <title>Logabug</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          Welcome to Logabug
        </h1>

        <p> Current user: <code>{auth?.user ? auth.user.email : 'None'}</code></p>
        {auth?.user ? <button type="button" onClick={(e) => auth.signout()}>Sign Out</button> : <button type="button" onClick={(e) => auth.signinWithGithub()}>Sign In</button>}
      </main>
 
    </div>
  )
}
