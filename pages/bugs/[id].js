import NextLink from 'next/link'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import {
  Badge, Stack,
  Flex, Heading, Text, Link, Alert, Box,
  AlertIcon, AlertTitle, AlertDescription,
  Divider
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo';

import { DeviceTable } from "@/components/device-table"
import {MarkdownPreview} from "@/components/markdown-preview"
import {ResourcePreview} from "@/components/resource-preview"

import { PageLayout } from "@/layouts/page"

import {PRIMARY_COLOR_SCHEME} from "@/styles/theme"

import { getBugById } from "@/lib/db-admin"

const ShareLinkButton = dynamic(() =>
    import('@/components/share-link-button').then((mod) => mod.ShareLinkButton)
)

const PRIORTY_COLOR_MAP = {
  low: "green",
  medium: "yellow",
  high: "red",
}

const FREQUENCY_TEXT_MAP = {
  'every-time': 'Happens every time',
  'occasionally': 'Happens occasionally',
  'once': 'Happened once'
}

export default function BugDetail({ bug }) {
  const router = useRouter()
  const { title: description } = bug
  const title = router.query?.created ? "Sorted! Bug created" : "Bug report"
  
  return <PageLayout title={title} actions={<ShareLinkButton description={description} title="Bug report" />}>
    <NextSeo
      title={title}
      description={description}
    />

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
      {router.query?.created && <Alert status="success" maxW="2xl" borderRadius={8} mb={12}>
        <AlertIcon />
        <Box flex="1" ml={2}>
          <AlertTitle mb={2}>A link to your bug report has been generated. </AlertTitle>
          <AlertDescription><NextLink href='/sign-in' passHref><Link textDecoration="underline">Sign in</Link></NextLink> to get the ability to manage projects, attach files, create feature requests and view all your previous bugs and features. If you aren't interested you are free to keep using the service as is. No stress.</AlertDescription>
        </Box>
      </Alert>}

      <Stack direction="row" mb={4}>
        <Badge size="lg" colorScheme={PRIORTY_COLOR_MAP[bug.priority]}>{bug.priority} priority</Badge>
        <Badge size="lg" colorScheme={PRIMARY_COLOR_SCHEME}>{FREQUENCY_TEXT_MAP[bug.frequency]}</Badge>
      </Stack>

      <Heading as="h2" size='md' mb={2}>Title</Heading>
      <Divider mb={2}/>
      <Text maxW="2xl" mb={14}>{bug.title}</Text>

      {bug.overview && <>
        <Heading as="h2" size='md' mb={2}>Overview</Heading>
        <Divider mb={2}/>
        <MarkdownPreview maxW="2xl" mb={14}>{bug.overview}</MarkdownPreview>
      </>}
      
      <Heading as="h2" size='md' mb={2}>Expected result/behaviour</Heading>
      <Divider mb={2}/>
      <MarkdownPreview maxW="2xl" mb={14}>{bug.expecting}</MarkdownPreview>

      <Heading as="h2" size='md' mb={2}>Resulting behaviour</Heading>
      <Divider mb={2}/>
      <MarkdownPreview maxW="2xl" mb={14}>{bug.resulting}</MarkdownPreview>
     
      <Heading as="h2" size='md' mb={2}>Steps to reproduce</Heading>
      <Divider mb={2}/>
      <MarkdownPreview maxW="2xl" mb={14}>{bug.steps}</MarkdownPreview>


  

      {bug.files?.length > 0 && <>
        <Heading as="h2" size='md' mb={2}>Files</Heading>
        <Divider mb={2}/>
        <ResourcePreview files={bug.files.map(file => ({name: file.name, preview: file.downloadLink, type: file.type}))} mb={14}/>
      </>}

        {bug.name && <DeviceTable
            data={{
              Browser: bug.name,
              "Browser version": bug.version,
              OS: bug.os,
              Language: bug.language,
              "Estimated effective network type": bug.effectiveType,
              "Estimated effective round-trip time (ms)": bug.rtt,
              "Prefers reduced data usage": bug.saveData ? "Yes" : "No",
              "Prefers reduced motion": bug.prefersReducedMotion ? "Yes" : "No",
              "Cookies enabled": bug.cookieEnabled ? 'Yes' : 'No',
              "Pixel ratio": `${bug.devicePixelRatio}`,
              "Screen (width x height)": `${bug.screenWidth} x ${bug.screenHeight}`,
              "Viewport (width x height)": `${bug.windowWidth} x ${bug.windowHeight}`,
              "Page (width x height)": `${bug.pageWidth} x ${bug.pageHeight}`,
              "CSS pixel (width x height)": `${bug.cssPixelWidth} x ${bug.cssPixelHight}`,
              "Mobile pinch zoom": `${bug.pinchZoomScalingFactor * 100}%`,
            }}
          />
          }
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
