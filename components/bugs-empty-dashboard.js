import React from "react"
import NextLink from "next/link"
import { Text, Flex, Button } from "@chakra-ui/react"
import { HiPlus } from "react-icons/hi"

import { PRIMARY_COLOR_SCHEME } from "@/styles/theme"

export const BugsEmptyDashboard = ({ href }) => (
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
    <Text size="xl" maxW="lg" textAlign="center" my={8}>
      You haven’t added any bugs yet. <br />
      Let’s get started.
    </Text>
    <NextLink href={href}>
      <Button
        variant="ghost"
        mt={8}
        colorScheme={PRIMARY_COLOR_SCHEME}
        leftIcon={<HiPlus />}
      >
        Create new bug
      </Button>
    </NextLink>
  </Flex>
)
