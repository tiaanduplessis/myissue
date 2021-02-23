import React from "react"
import NextLink from "next/link"
import { Text, Flex, Button } from "@chakra-ui/react"

import {PRIMARY_COLOR_SCHEME} from "@/styles/theme"

export const FeaturesEmptyDashboard = ({ href }) => (
  <Flex
    width="100%"
    backgroundColor="white"
    borderRadius="md"
    boxShadow="sm"
    p={16}
    justify="center"
    align="center"
    direction="column"
  >
    <Text size="xl" maxW="lg" textAlign="center" my={8}>You haven’t added any features yet. <br/>Let’s get started.</Text>
    <NextLink href={href}>
      <Button variant="ghost"  mt={8} colorScheme={PRIMARY_COLOR_SCHEME}>
        + Create new feature
      </Button>
    </NextLink>
  </Flex>
)
