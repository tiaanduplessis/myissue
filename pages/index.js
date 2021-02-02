
import Link from "next/link"
import { Button, VisuallyHidden, Icon, Flex, Heading } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth'
import { LogoIcon } from "@/icons/logo";

export default function Home() {
  const auth = useAuth()

  return (
      <Flex as="main"
      flex={1}
      direction="column"
      align="center"
      justify="center"
      >
        <VisuallyHidden><Heading as="h1">myissue.link</Heading></VisuallyHidden>
          <LogoIcon width={16} height={16} mb={4}/>
         {auth?.user ? <Link href="/dashboard">
          <Button as="a">View dashboard</Button>
         </Link> : <Button mt={4} size="sm" onClick={(e) => auth.signinWithGitHub()}>Sign in</Button>}
      </Flex>
  )
}
