import React from "react"
import { Heading, Flex, Text } from "@chakra-ui/react"

import { ProjectCreateModal } from "@/components/projects-create-modal"

export const EmptyDashboard = ({ type }) => (
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
    {/* <Text my={8}>Let’s get started.</Text> */}
    <ProjectCreateModal>Add your first</ProjectCreateModal>
  </Flex>
)
