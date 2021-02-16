import React from "react"
import { Box, Skeleton } from "@chakra-ui/react"

import { Table, Tr, Th, Td } from "@/components/table"

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
)

export const FeaturesTableSkeleton = () => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Problem</Th>
          <Th>Type</Th>
          <Th>Priority</Th>
          <Th>Date Added</Th>
          <Th>{""}</Th>
        </Tr>
      </thead>
      <tbody>
        <SkeletonRow width="3rem" />
        <SkeletonRow width="8rem" />
        <SkeletonRow width="3rem" />
        <SkeletonRow width="6rem" />
        <SkeletonRow width="6rem" />
      </tbody>
    </Table>
  )
}
