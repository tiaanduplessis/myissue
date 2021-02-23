import React from "react"
import { Box, Text } from "@chakra-ui/react"

export const Th = (props) => (
  <Text
    as="th"
    textTransform="uppercase"
    fontSize="xs"
    color="gray.500"
    fontWeight="medium"
    px={4}
    {...props}
  />
)

export const Td = (props) => (
  <Box
    as="td"
    color="gray.900"
    p={4}
    borderBottom="1px solid"
    borderBottomColor="gray.100"
    sx={{
      "&:last-child": {
        "display": "flex",
        "justifyContent": "flex-end"
      }
    }}
    {...props}
  />
)

export const Tr = (props) => (
  <Box
    as="tr"
    backgroundColor="gray.50"
    borderTopLeftRadius={8}
    borderTopRightRadius={8}
    borderBottom="1px solid"
    borderBottomColor="gray.200"
    height="40px"
    {...props}
  />
)

export const Table = (props) => {
  return (
    <Box overflowX="auto">
      <Box
        as="table"
        textAlign="left"
        backgroundColor="white"
        mx={0}
        rounded="sm"
        w="full"
        boxShadow="sm"
        {...props}
      />
    </Box>
  )
}
