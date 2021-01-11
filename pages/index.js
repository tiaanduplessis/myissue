
import { Button, Heading, Text, Code } from '@chakra-ui/react';
import { useAuth } from '@/lib/auth'

export default function Home() {
  const auth = useAuth()

  return (
      <main>
        <Heading as="h1">
          Logabug
        </Heading>

        <Text> Current user: <Code>{auth?.user ? auth.user.email : 'None'}</Code></Text>
        {auth?.user ? <Button type="button" onClick={(e) => auth.signout()}>Sign Out</Button> : <Button type="button" onClick={(e) => auth.signinWithGitHub()}>Sign In</Button>}
      </main>
  )
}
