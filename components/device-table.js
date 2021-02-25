import React from "react"
import {
  Box,
  useMediaQuery,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react"

import { Table, Tr, Th, Td } from "@/components/table"

export const DeviceTable = ({ data, ...props }) => {
  const [isSmallDisplay] = useMediaQuery("screen and (max-width: 45em)")

  if (isSmallDisplay) {
    return (
      <StatGroup flexDirection="column">
        {Object.entries(data).map(([name, value]) => {
          return (
            <Stat key={name} mb={4}>
              <StatLabel>{name}</StatLabel>
              <StatNumber>{value}</StatNumber>
            </Stat>
          )
        })}
      </StatGroup>
    )
  }

  return (
    <Table {...props}>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Value</Th>
        </Tr>
      </thead>
      <tbody>
        {Object.entries(data).map(([name, value]) => (
          <Box as="tr" key={name}>
            <Td fontWeight="medium">{name}</Td>
            <Td
              sx={{
                "&:last-child": {
                  display: "flex",
                  justifyContent: "flex-start",
                },
              }}
            >
              {value}
            </Td>
          </Box>
        ))}
      </tbody>
    </Table>
  )
}
