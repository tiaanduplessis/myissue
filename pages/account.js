import Head from "next/head"
import {useRouter} from 'next/router'
import {Flex, Button} from "@chakra-ui/react"

import { useAuth } from "@/lib/auth"

import { PageLayout } from "@/layouts/page"

const Account = () => {
  const router = useRouter()
    const {signout} = useAuth()

  return (
    <PageLayout
      title="Account"
    >
      <Head>
        <title>Account</title>
      </Head>

      <Flex
        width="100%"
        backgroundColor="white"
        borderRadius="md"
        boxShadow="sm"
        p={{
          base: 5,
          md: 10,
        }}
        direction="column"
      >

        <Button onClick={async () => {
          await signout()
          router.push('/')
        }}>
          Log Out
        </Button>


      </Flex>

    </PageLayout>
  )
}

export default Account
