import { useState } from 'react'
import { Flex, Box, Stack, Button, Heading, useToast } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { IoLogoGithub, IoLogoGoogle } from "react-icons/io5"

import { LogoIcon } from "@/icons/logo"

import { useAuth } from "@/lib/auth"

const SignIn = () => {
  const [isSubmitting, setSubmitting] = useState(false)
  const toast = useToast()
  const router = useRouter()
  const auth = useAuth()

  const handleAuth = (authHandler) => async () => {
    try {
      setSubmitting(true)
      const user = await authHandler()
      if (user) router.push("/projects")
    } catch (error) {
      console.error(error)
      toast({
        title: "Oh noes!",
        description: error.message,
        status: "error",
        duration: 10000,
        isClosable: true,
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      flexDirection="column"
      bg={"gray.100"}
      p={4}
    >
      <LogoIcon w={14} h={14} />

      <Heading mt={5} as="h1" fontSize={"3xl"} textAlign={"center"}>
        Sign in to your account
      </Heading>

      <Box
        my={10}
        bg={"white"}
        rounded={"sm"}
        boxShadow="sm"
        p={{ base: 4, md: 8 }}
        w={"full"}
        maxW="md"
      >
        <Stack spacing={4}>
          <Button
            leftIcon={<IoLogoGithub />}
            iconSpacing={3}
            colorScheme="gray"
            size="md"
            isLoading={isSubmitting}
            loadingText="Submitting"
            onClick={handleAuth(auth.signinWithGitHub)}
          >
            Sign in with Github
          </Button>
          <Button
            leftIcon={<IoLogoGoogle />}
            colorScheme="red"
            iconSpacing={3}
            mt={6}
            size="md"
            isLoading={isSubmitting}
            loadingText="Submitting"
            onClick={handleAuth(auth.signinWithGoogle)}
          >
            Sign in with Google
          </Button>
        </Stack>
      </Box>
    </Flex>
  )
}

export default SignIn
