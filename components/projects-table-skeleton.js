import React from 'react';
import { Box, Skeleton } from '@chakra-ui/react';

import { Table, Tr, Th, Td } from '@/components/table';

const SkeletonRow = ({ width }) => (
  <Box as="tr">
    <Td>
      <Skeleton height="1rem" w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height="1rem" w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height="1rem" w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height="1rem" w={width} my={4} />
    </Td>
  </Box>
);

export const ProjectsTableSkeleton = () => {
  return (
    <Table>
      <thead>
        <Tr>
            <Th>Name</Th>
            <Th>Link</Th>
            <Th>Issues</Th>
            <Th>Date Added</Th>
            <Th>{''}</Th>
        </Tr>
      </thead>
      <tbody>
        <SkeletonRow width="4.5rem" />
        <SkeletonRow width="8rem" />
        <SkeletonRow width="3rem" />
        <SkeletonRow width="6.25rem" />
        <SkeletonRow width="4.5rem" />
      </tbody>
    </Table>
  );
};
