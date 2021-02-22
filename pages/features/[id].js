import dynamic from 'next/dynamic'
import {
    Badge, Stack,
    Flex, Heading, Text,
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo';

import { PageLayout } from "@/layouts/page"

import { PRIMARY_COLOR_SCHEME } from "@/styles/theme"

import { getFeatureById } from "@/lib/db-admin"

const ShareLinkButton = dynamic(() =>
    import('@/components/share-link-button').then((mod) => mod.ShareLinkButton)
)

const PRIORTY_COLOR_MAP = {
    low: "green",
    medium: "yellow",
    high: "red",
}

export default function FeatureDetail({ feature }) {
    const { problem: description } = feature
    const title = "Feature request"

    return <PageLayout title={title} actions={<ShareLinkButton title={title} description={description} />}>
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

            <Stack direction="row" mb={4}>
                <Badge size="lg" colorScheme={PRIMARY_COLOR_SCHEME}>{feature.type}</Badge>
                <Badge size="lg" colorScheme={PRIORTY_COLOR_MAP[feature.priority]}>{feature.priority} priority</Badge>
            </Stack>

            <Heading as="h2" size='md' mb={2}>Problem statement</Heading>
            <Text maxW="2xl" mb={8}>{feature.problem}</Text>

            <Heading as="h2" size='md' mb={2}>Impact on users</Heading>
            <Text maxW="2xl" mb={8}>{feature.impact}</Text>

            <Heading as="h2" size='md' mb={2}>Cost</Heading>
            <Text maxW="2xl" mb={8}>{feature.cost}</Text>

            <Heading as="h2" size='md' mb={2}>Business goal</Heading>
            <Text maxW="2xl" mb={8}>{feature.goal}</Text>

            <Heading as="h2" size='md' mb={2}>Need for solution</Heading>
            <Text maxW="2xl" mb={8}>{feature.need}</Text>

            <Heading as="h2" size='md' mb={2}>Potential solution</Heading>
            <Text maxW="2xl" mb={8}>{feature.solution}</Text>

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
    const feature = await getFeatureById(params.id)

    return {
        props: { feature },
        revalidate: 1,
    }
}
