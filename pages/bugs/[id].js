import { PageLayout } from "@/layouts/page"
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import {
  Flex, Text, Link, Button, Alert, Box,
  AlertIcon,AlertTitle, AlertDescription
} from '@chakra-ui/react'
import { RiShareFill } from "react-icons/ri"
import { NextSeo } from 'next-seo';

import { getBugById } from "@/lib/db-admin"
import { useEffect, useState } from "react";

const RWebShare = dynamic(() =>
  import('react-web-share').then((mod) => mod.RWebShare)
)

export default function BugDetail({ bug }) {
  const router = useRouter()
  const [url, setUrl] = useState('')
  const { title: description } = bug
  const title = router.query?.created ? "Sorted! Bug created" : "Bug report"

  useEffect(() => {
    setUrl(`${window.location.origin}${window.location.pathname}`)
  }, [])

  return <PageLayout title={title} actions={<RWebShare
    data={{
      text: description,
      url,
      title: "Bug report",
    }}
  >
    <Button leftIcon={<RiShareFill />} >Share</Button>
  </RWebShare>}>
    <NextSeo
      title={title}
      description={description}
    />

    <Flex
      width="100%"
      backgroundColor="white"
      borderRadius={8}
      boxShadow="sm"
      p={{
        base: 5,
        md: 10,
      }}
      direction="column"
    >
      {router.query?.created && <Alert status="success" maxW="2xl" borderRadius={8}>
        <AlertIcon />
        <Box flex="1" ml={2}>
        <AlertTitle mb={2}>A link to your bug report has been generated. </AlertTitle>
        <AlertDescription><NextLink href='/sign-in' passHref><Link textDecoration="underline">Sign in</Link></NextLink> to get the ability to manage projects, create feature requests and view all your previous bugs and features. If you aren't interested you are free to keep using the service as is. No stress.</AlertDescription>
      </Box>
  </Alert>}

    </Flex>
  </PageLayout>
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  }
}

export async function getStaticProps({ params }) {
  const bug = await getBugById(params.id)

  return {
    props: { bug },
    revalidate: 1,
  }
}
