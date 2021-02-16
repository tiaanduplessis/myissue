import {
  Container,
  Icon,
  Box,
  Stack,
  Text,
  Link,
  SimpleGrid,
} from '@chakra-ui/react';
import { IoLogoVercel } from 'react-icons/io5';
import NextLink from 'next/link';

import {PRIMARY_COLOR_SCHEME} from "@/styles/theme"


const SOCIAL_LINKS = [
  {
    label: 'GitHub Repository',
    href: 'https://github.com/tiaanduplessis/myissue',
  },
];

const OTHER_INFO_LINKS = [
  {
    label: 'Roadmap',
    href: 'https://github.com/tiaanduplessis/myissue/projects/1?fullscreen=true',
  },
  {
    label: 'Feedback',
    href: 'https://github.com/tiaanduplessis/myissue/issues/new',
  },
]

export const Footer = () => {
  return (
    <Box

      bg={'gray.900'}
      color={"gray.300"}
      py={{ base: 5, sm: 10 }}>
      <Container maxW={'7xl'}>
        <SimpleGrid columns={{ md: 1, lg: 2 }} mb={10} spacing={6}>

          <Stack spacing={4}>
            <Text as="h2"  fontFamily={'heading'} fontWeight="black" fontSize={'lg'}>
              Social
            </Text>
            <Stack align={'start'}>
              {SOCIAL_LINKS.map((link) => (
                <Link key={link.href} href={link.href}>{link.label}</Link>
              ))}
            </Stack>
          </Stack>

          <Stack spacing={4}>
            <Text as="h2" fontFamily={'heading'} fontSize={'lg'} fontWeight="black">
              Other info
            </Text>
            <Stack align={'start'}>
            {OTHER_INFO_LINKS.map((link) => (
                  <Link key={link.href}  href={link.href} isExternal>{link.label}</Link>
              ))}
            </Stack>
          </Stack>

        </SimpleGrid>

        <Stack
          textAlign={'center'}
          borderTopWidth={1}
          borderTopStyle={'solid'}
          borderTopColor={`${PRIMARY_COLOR_SCHEME}.900`}
          pt={8}>
          <Text>
            <a
              href="https://vercel.com"
              target={'_blank'}>
              Hosted on <Icon mt={-1} as={IoLogoVercel} /> Vercel
            </a>
          </Text>
          <Text>
            Made in Cape Town by{' '}
            <Link href={'https://tiaan.dev'}>Tiaan du Plessis</Link>
          </Text>
        </Stack>
      </Container>
    </Box>
  );
};