
import Link from "next/link"
import { Button, VisuallyHidden, Icon, Flex, Heading } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth'

export default function Home() {
  const auth = useAuth()

  return (
      <Flex as="main"
      flex={1}
      direction="column"
      align="center"
      justify="center"
      >
        <VisuallyHidden><Heading as="h1">Logabug</Heading></VisuallyHidden>
         <Icon color="gray.900" viewBox="	0 0 139 149" width={10} height={10} mb={4}>
          <path d="M44.043 23.0234c-3.8412.3256-7.3568.6836-10.5469 1.0743-3.1901.3255-6.25.6835-9.1797 1.0742V124c4.2969.586 9.0495 1.107 14.2578 1.562 5.2084.456 10.8724.782 16.9922.977 1.9531.13 3.8737.195 5.7617.195h11.6211c1.9531 0 3.9063-.065 5.8594-.195 7.2917-.195 13.7695-.553 19.4336-1.074 5.7288-.586 10.9048-1.335 15.5278-2.246 1.171-6.446 2.148-14.258 2.929-23.4378h22.266c-.391 6.9658-.944 14.0948-1.66 21.3868-.716 7.227-1.726 14.681-3.028 22.363-12.369 2.084-24.153 3.483-35.3512 4.199-11.1328.717-21.6146 1.075-31.4453 1.075-10.0912 0-20.7683-.358-32.0313-1.075-11.263-.716-22.9818-2.115-35.1562-4.199V5.4453C8.0404 4.0781 15.5273 3.069 22.7539 2.418c7.2917-.7162 14.388-1.2696 21.2891-1.6602v22.2656z" fill="currentColor"/>
         </Icon>
  
         {auth?.user ? <Link href="/dashboard">
          <Button as="a">View dashboard</Button>
         </Link> : <Button mt={4} size="sm" onClick={(e) => auth.signinWithGitHub()}>Sign in</Button>}
      </Flex>
  )
}
