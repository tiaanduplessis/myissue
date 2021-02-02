import { Box, Flex, Link } from "@chakra-ui/react"
import NextLink from "next/link"

const FOOTER_LINKS = [
    {
        label: 'Feedback',
        href: "/feedback"
    },
    {
        label: "Roadmap",
        href: "/roadmap",
    },
    {
        label: "FAQs",
        href: '/faqs'
    }
]

export const Footer = () => {

    return <Flex
        background="white"
        alignItems="center"
        justifyContent="flex-start"
        px={8}
        py={12}
    >
        <Box 
        maxW="80rem"
            margin="0 auto"
            w="full"
        >



        <Flex as="nav"
            
            flexDirection="column"
        >
            {FOOTER_LINKS.map(({ label, href }) => (
                <NextLink  href={href} passHref>
                    <Link mb={2}>{label}</Link>
                </NextLink>
            ))}
        </Flex>

        </Box>
    </Flex>
}