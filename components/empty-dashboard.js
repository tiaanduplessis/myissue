import React from 'react';
import { Heading, Flex, Text } from '@chakra-ui/react';

import {ProjectCreateModal} from "@/components/projects-create-modal"

export const EmptyDashboard = ({type}) => (
    <Flex
      width="100%"
      backgroundColor="white"
      borderRadius="8px"
      p={16}
      justify="center"
      align="center"
      direction="column"
    >
      <Heading size="lg" mb={2}>
        You haven’t added any {type}.
      </Heading>
      <Text mb={4}>Let’s get started.</Text>
      <ProjectCreateModal>Add your first</ProjectCreateModal>
    </Flex>
);