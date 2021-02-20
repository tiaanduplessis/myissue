import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Button,
  Flex,
  Link,
  VisuallyHidden,
  Avatar,
  SimpleGrid,
} from "@chakra-ui/react"
import { NextSeo } from 'next-seo';
import NextLink from "next/link"
import { useRouter } from "next/router"

import { useAuth } from "@/lib/auth"
import { LogoIcon } from "@/icons/logo"

import { useOnlineNotifcation } from "@/hooks/use-online-notification"


const DEFAULT_LINKS = [
  {
    label: "Home",
    href: "/",
  },
]

const SIGNED_IN_LINKS = [
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Bugs",
    href: "/bugs",
  },
  {
    label: "Features",
    href: "/features",
  },
]

export const PageLayout = ({
  children,
  title,
  breadcrumbs,
  actions = [],
}) => {
  useOnlineNotifcation()
  const { user } = useAuth()
  const router = useRouter()

  return (<>
    <NextSeo
      title={title}
    />
    <Box backgroundColor="gray.100" minHeight="100vh" pb={8}>
      <Flex backgroundColor="white" 
      mb={{
        base: 8,
        md: 16,
      }} w="full">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          pt={4}
          pb={4}
          maxW="7xl"
          margin="0 auto"
          w="full"
          px={8}
        >
          <Flex alignItems="center">
            <NextLink href="/">
              <LogoIcon width={10} height={10} mr={8} />
            </NextLink>

            <Box as="nav">
              <Flex as="ul" style={{ listStyle: "none" }}>
                {(user ? SIGNED_IN_LINKS : DEFAULT_LINKS).map(({ label, href }) => {
                  const isActive = router.pathname.startsWith(href)
                  return (
                    <li key={href}>
                      <NextLink  href={href} passHref>
                        <Link
                          mr={4}
                          fontWeight={isActive ? "medium" : "normal"}
                          aria-current={isActive ? "page" : null}
                        >
                          {label}
                        </Link>
                      </NextLink>
                    </li>
                  )
                })}
              </Flex>
            </Box>
            
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            {user && (
              <>
              <NextLink href="/account" passHref>
                <a>
                <Avatar size="sm" src={user?.photoUrl} />
                  <VisuallyHidden>Account</VisuallyHidden>
                </a>            
              </NextLink>
              </>
             
            )}
            
          </Flex>
        </Flex>
      </Flex>
      <Flex margin="0 auto" direction="column" maxW="7xl" px={8}>
        {(breadcrumbs && user) && (
          <Breadcrumb>
            {breadcrumbs.map(({ label, href = null }) => (
              <BreadcrumbItem key={label} isCurrentPage={!href}>
                <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
              </BreadcrumbItem>
            ))}
          </Breadcrumb>
        )}

        <Flex justifyContent="space-between">
          <Heading mb={8}>{title}</Heading>
          <SimpleGrid spacing={2}>{actions}</SimpleGrid>
        </Flex>
        {children}
      </Flex>
    </Box>
      </>
  )
}