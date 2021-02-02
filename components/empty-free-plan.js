import React from 'react';
import { Heading, Box, Text, Button } from '@chakra-ui/react';

export const EmptyFreePlan = () => (
    <Box width="100%" backgroundColor="white" borderRadius="8px" p={8}>
      <Heading size="md">Log better issues instantly.</Heading>
      <Text>Start today, then grow with us 🌱</Text>
      <Button>Upgrade to Starter</Button>
    </Box>
);
