import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Button,
  Flex,
  Link,
  Avatar
} from '@chakra-ui/react';
import NextLink from "next/link"
import {useRouter} from "next/router"

import { useAuth } from '@/lib/auth';
import { LogoIcon } from '@/icons/logo';
import {AddProjectModal} from "@/components/add-project-modal"

const NAV_LINKS = [
  {
    label: 'Projects',
    href: '/dashboard'
  },
  {
    label: "Issues",
    href: '/issues'
  }
]

export const DashboardLayout = ({ children, type, breadcrumbs }) => {
  const { user, signout } = useAuth();
  const router = useRouter()

  return (
    <Box backgroundColor="gray.100" minHeight="100vh">
      <Flex backgroundColor="white" mb={16} w="full">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          pt={4}
          pb={4}
          maxW="80rem"
          margin="0 auto"
          w="full"
          px={8}
        >
          <Flex>
            <NextLink href='/'>
              <LogoIcon width={6} height={6} mr={8} />
            </NextLink>
            {NAV_LINKS.map(({label, href}) => {
              const isActive = router.pathname.startsWith(href) 
              return <NextLink key={href} href={href} passHref>
                <Link mr={4} fontWeight={isActive ? "700" : "400"} aria-current={isActive ? 'page' : null}>{label}</Link>
            </NextLink>
            })}
          </Flex>
          <Flex justifyContent="center" alignItems="center">
          {user && (
              <Button variant="ghost" mr={2} onClick={() => signout()}>
                Log Out
              </Button>
            )}
            <Avatar size="sm" src={user?.photoUrl} />
          </Flex>
        </Flex>
      </Flex>
      <Flex margin="0 auto" direction="column" maxW="80rem" px={8}>
            {breadcrumbs && <Breadcrumb>
              {breadcrumbs.map(({label, href = null}) => <BreadcrumbItem isCurrentPage={!href}>
            <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
          </BreadcrumbItem>)}
        </Breadcrumb>}
      
        <Flex justifyContent="space-between">
          <Heading mb={8} fontWeight="800">My {type}</Heading>
          <AddProjectModal>
          + Add project
          </AddProjectModal>
        </Flex>
        {children}
      </Flex>
    </Box>
    
  );
};
