import React from "react"
import NextLink from "next/link"
import { Box, Link, Badge, Button, Menu, MenuButton, MenuList, MenuItem, useClipboard  } from "@chakra-ui/react"
import { parseISO, format } from "date-fns"
import { RiArrowDownSLine } from "react-icons/ri"

import { Table, Tr, Th, Td } from "@/components/table"

const PRIORTY_COLOR_MAP = {
  low: "green",
  medium: "yellow",
  high: "red",
}

const Row = ({ title, id, priority, createdAt }) => {
  const { hasCopied, onCopy } = useClipboard(`${window.location.origin}/bugs/${id}`)
  return <Box as="tr">
      <Td fontWeight="medium" style={{
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: '20rem',
          overflow: 'hidden'
      }}>{title}</Td>
      <Td>
        <Badge colorScheme={PRIORTY_COLOR_MAP[priority]}>
          {priority}
        </Badge>
      </Td>
      <Td>{format(parseISO(createdAt), "PPpp")}</Td>
      <Td style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Menu>
              <MenuButton as={Button} fontWeight="medium" rightIcon={<RiArrowDownSLine />}>
                  {hasCopied ? 'Copied' : 'Actions'}
              </MenuButton>
              <MenuList>
                  {id ?
                      <NextLink href={`/bugs/${id}`} passHref>
                          <MenuItem as={Link}>
                              View bug
                          </MenuItem>
                      </NextLink>
                      : null}
                  <MenuItem onClick={onCopy}>
                      Copy bug link
                  </MenuItem>
                  <MenuItem>Delete</MenuItem>
              </MenuList>
          </Menu>
      </Td>
  </Box>
}

export const BugsTable = ({ bugs }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Title</Th>
          <Th>Priorty</Th>
          <Th>Date Added</Th>
          <Th>{""}</Th>
        </Tr>
      </thead>
      <tbody>
        {bugs.map((bug) => (
          <Row key={`${bug.name}-${bug.id}`} {...bug} />
        ))}
      </tbody>
    </Table>
  )
}
