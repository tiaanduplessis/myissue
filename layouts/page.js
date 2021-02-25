import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Flex,
  Link,
  VisuallyHidden,
  Avatar,
  SimpleGrid,
} from "@chakra-ui/react"
import { NextSeo } from 'next-seo';
import NextLink from "next/link"
import { useRouter } from "next/router"

import {SkipLink} from "@/components/skip-link"
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
  ...props
}) => {
  useOnlineNotifcation()
  const { user } = useAuth()
  const router = useRouter()

  return (<>
    <NextSeo
      title={title}
      {...props}
    />
    <SkipLink/>
    <Box backgroundColor="gray.100" minHeight="100vh" pb={8}>
      <Flex backgroundColor="white" 
      mb={{
        base: 8,
        md: 16,
      }} w="full">
        <Flex
          alignItems="center"
          justify="space-between"
          pt={4}
          pb={4}
          maxW="7xl"
          margin="0 auto"
          w="full"
          px={{
            base: 4,
            md: 8
          }}
        >
          <Flex alignItems="center">
            <NextLink href="/" passHref>
              <a><LogoIcon width={10} height={10} mr={{
                base: 4,
                md: 8
              }} /> <VisuallyHidden>Home</VisuallyHidden></a>
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
                          textDecoration={isActive ? 'underline' : 'none'}
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
          <Flex justify="center" alignItems="center">
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
      <Flex id="content" margin="0 auto" direction="column" maxW="7xl" px={{
        base: 4,
        md: 8
      }}>
        {(breadcrumbs && user) && (
          <Breadcrumb>
            {breadcrumbs.map(({ label, href = null }) => (
              <BreadcrumbItem key={label} isCurrentPage={!href}>
                <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
              </BreadcrumbItem>
            ))}
          </Breadcrumb>
        )}

        <Flex justify="space-between" mb={8}>
          <Heading as="h1" fontSize={
          {
            base: '2xl',
            lg: '4xl'
          }
          } >{title}</Heading>
          <SimpleGrid spacing={2}>{actions}</SimpleGrid>
        </Flex>
        {children}
      </Flex>
    </Box>
      </>
  )
}
