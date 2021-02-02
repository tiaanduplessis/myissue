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

import { useAuth } from '@/lib/auth';
import { LogoIcon } from '@/icons/logo';

export const DashboardLayout = ({ children }) => {
  const { user, signout } = useAuth();

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
            <LogoIcon width={6} height={6} mr={8} />
            <Link mr={4}>Projects</Link>
            <Link>Issues</Link>
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            <Button variant="ghost" mr={2} onClick={() => signout()}>
              Log Out
            </Button>
            <Avatar size="sm" src={user.photoUrl} />
          </Flex>
        </Flex>
      </Flex>
      <Flex margin="0 auto" direction="column" maxW="80rem" px={8}>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink>Projects</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex justifyContent="space-between">
          <Heading mb={8}>My Projects</Heading>
          <Button
            fontWeight="medium"
          >
            + Add Site
          </Button>
        </Flex>
        {children}
      </Flex>
    </Box>
  );
};
