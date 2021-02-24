import { Flex, Box, Stack, Button, Heading, useToast, } from "@chakra-ui/react"
import {useRouter} from 'next/router'
import { IoLogoGithub, IoLogoGoogle } from "react-icons/io5";

import {LogoIcon} from '@/icons/logo'

import { useAuth } from "@/lib/auth"

const SignIn = () => {
  const toast = useToast()
  const router = useRouter()
  const auth = useAuth()

  const handleAuth = (authHandler) => async () => {
    try {
      const user = await authHandler()
      if (user) router.push('/projects')
    } catch(error) {
      console.error(error)
      toast({
        title: "Oh noes!",
        description: error.message,
        status: "error",
        duration: 10000,
        isClosable: true,
      })
    }
 
  }

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} flexDirection="column" bg={"gray.100"}>
        <LogoIcon w={14} h={14}/>

        <Heading mt={5} as="h1" fontSize={"3xl"} textAlign={"center"}>
          Sign in to your account
        </Heading>


        <Box mt={10} bg={"white"} mx={4} rounded={"sm"} boxShadow="sm" p={{ base: 4, md: 8 }} w={"full"} maxW="md">
          <Stack spacing={4}>
            <Button leftIcon={<IoLogoGithub/>} iconSpacing={3} colorScheme="gray" size="md" onClick={handleAuth(auth.signinWithGitHub)}>
              Sign in with Github
            </Button>
            <Button leftIcon={<IoLogoGoogle/>} colorScheme="red" iconSpacing={3}  mt={6} size="md" onClick={handleAuth(auth.signinWithGoogle)}>
              Sign in with Google
            </Button>
          </Stack>
        </Box>

    </Flex>
  )
}

export default SignIn
