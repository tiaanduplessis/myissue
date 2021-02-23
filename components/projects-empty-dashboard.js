import React from "react"
import { Heading, Flex, Text } from "@chakra-ui/react"

import { ProjectCreateModal } from "@/components/projects-create-modal"

export const EmptyDashboard = ({ type }) => (
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
    <Text size="xl" maxW="lg" textAlign="center" my={8}>You haven’t added any projects yet. <br/>Let’s get started.</Text>
    <ProjectCreateModal variant="ghost">Add your first</ProjectCreateModal>
  </Flex>
)
