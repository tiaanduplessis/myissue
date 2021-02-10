import Head from "next/head"
import {Flex, Button} from "@chakra-ui/react"

import { useAuth } from "@/lib/auth"

import { DashboardLayout } from "@/layouts/dashboard"

const Account = () => {
    const {signout} = useAuth()

  return (
    <DashboardLayout
      title="Account"
    >
      <Head>
        <title>Account</title>
      </Head>

      <Flex
        width="100%"
        backgroundColor="white"
        bordered="sm"
        boxShadow="sm"
        p={{
          base: 5,
          md: 10,
        }}
        direction="column"
      >

        <Button onClick={() => signout()}>
          Log Out
        </Button>


      </Flex>

    </DashboardLayout>
  )
}

export default Account
