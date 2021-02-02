import {
    Flex,
    Box,
    Stack,
    Button,
    Heading,
  } from '@chakra-ui/react';

  import { useAuth } from '@/lib/auth'
  
  const SignIn = () => {
    const auth = useAuth()

    return (
      <Flex minH={'100vh'} align={'center'} justify={'center'} bg={'gray.100'}>
        <Stack spacing={8} mx={'auto'} w={'full'} maxW={'md'} py={12} px={6}>
          <Heading fontSize={'3xl'} textAlign={'center'}>
            Sign in to your account
          </Heading>
          <Box
            
            bg={'white'}
            rounded={'sm'}
            boxShadow="sm"
            p={{ base: 4, md: 8 }}>
            <Stack spacing={4}>
                <Button mt={4} size="sm" onClick={(e) => auth.signinWithGitHub()}>Sign in with Github</Button>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }

  export default SignIn