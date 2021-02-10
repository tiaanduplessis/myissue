import React from "react"
import NextLink from "next/link"
import { Heading, Flex, Button } from "@chakra-ui/react"

import {PRIMARY_COLOR_SCHEME} from "@/styles/theme"

export const BugsEmptyDashboard = ({ href }) => (
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
      🤯 You haven’t added any bugs yet.
    </Heading>
    {/* <Text mt={8}>Let’s get started.</Text> */}
    <NextLink href={href}>
      <Button variant="ghost"  mt={8} fontWeight="medium" colorScheme={PRIMARY_COLOR_SCHEME}>
        + Create new bug
      </Button>
    </NextLink>
  </Flex>
)
