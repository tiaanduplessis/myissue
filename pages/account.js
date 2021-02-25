import Head from "next/head"
import { useRouter } from 'next/router'
import useSWR from "swr"
import { Flex, Button, Text, Avatar, Icon, Heading, Stat, StatLabel, StatNumber, SimpleGrid } from "@chakra-ui/react"
import { IoLogoGithub, IoLogoGoogle } from "react-icons/io5";


import { useAuth } from "@/lib/auth"

import { PageLayout } from "@/layouts/page"

const PROVIDERS = {
  'github.com': <Icon as={IoLogoGithub} color="gray.800" />,
  'google.com': <Icon as={IoLogoGoogle} colorScheme="red.800" />
}

const Account = () => {
  const router = useRouter()
  const { signout, user } = useAuth()

  const { data: bugsData } = useSWR("/api/bugs")
  const { data: featuresData } = useSWR("/api/features")

  const handleSignOut = async () => {
    await signout()
    router.push('/')
  }

  return (
    <PageLayout
      title="Account"
    >
      <SimpleGrid columns={{ md: 1, lg: 2 }} width="100%" spacing={6} backgroundColor="white"
        borderRadius="md"
        boxShadow="sm"
        p={{
          base: 6,
          md: 12,
        }}>

        <Flex flexDirection="column" alignItems='center'>
          <Avatar w={{
            base: '6rem',
            lg: "10rem"
          }}
            h={{
              base: '6rem',
              lg: "10rem"
            }} mb={6} name={user?.name} src={user?.photoUrl} />
          <Heading textAlign="center" as="h2" mb={3}>{user?.name}</Heading>
          <Text color="blue.700" textAlign="center">{user?.email} {PROVIDERS[user?.provider]}</Text>
        </Flex>

        <Flex flexDirection="column" justify='space-between'>
          <SimpleGrid columns={{ sm: 1, lg: 2 }} mb={6}>

            {bugsData?.bugs && <Stat>
              <StatLabel fontSize="xl" fontWeight="bold">Total bugs</StatLabel>
              <StatNumber >{bugsData?.bugs?.length}</StatNumber>
            </Stat>}

            {featuresData?.features && <Stat>
              <StatLabel fontSize="xl" fontWeight="bold">Total features</StatLabel>
              <StatNumber>{featuresData?.features?.length}</StatNumber>
            </Stat>}
          </SimpleGrid>

          <Button onClick={handleSignOut}>
            Log Out
        </Button>

        </Flex>

      </SimpleGrid>

    </PageLayout>
  )
}

export default Account
