import React from 'react';
import NextLink from "next/link"
import { Heading, Flex, Text, Button } from '@chakra-ui/react';

export const IssuesEmptyDashboard = ({href}) => (
    <Flex
      width="100%"
      backgroundColor="white"
      borderRadius={6}
      boxShadow="sm"
      p={16}
      justify="center"
      align="center"
      direction="column"
    >
      <Heading size="xl" maxW="lg" textAlign="center">
      🤯 You haven’t added any issues yet.
      </Heading>
      {/* <Text mt={8}>Let’s get started.</Text> */}
      <NextLink
          href={href}
          >
            <Button mt={8} fontWeight="medium" colorScheme="purple">
                + Create new issue
            </Button>
          </NextLink>
    </Flex>
);