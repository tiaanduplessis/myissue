import React from "react"
import NextLink from "next/link"
import { Box, Link, Badge, Button, Menu, MenuButton, MenuList, MenuItem, useClipboard  } from "@chakra-ui/react"
import { parseISO, format } from "date-fns"
import { RiArrowDownSLine } from "react-icons/ri"

import { Table, Tr, Th, Td } from "@/components/table"

import {FeaturesDeleteButton} from '@/components/features-delete-button'

const PRIORTY_COLOR_MAP = {
  low: "green",
  medium: "yellow",
  high: "red",
}

const TYPE_COLOR_MAP = {
    feature: 'blue',
    epic: 'cyan'
}

const Row = ({ type, problem, id, priority, createdAt, projectId }) => {
  const { hasCopied, onCopy } = useClipboard(`${window.location.origin}/features/${id}`)

  return <Box as="tr">
     
      <Td fontWeight="medium" style={{
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: '20rem',
          overflow: 'hidden'
      }}>{problem}</Td>

    <Td>

    <Badge colorScheme={TYPE_COLOR_MAP[type]}>
          {type}
        </Badge>
        </Td>
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
                      <NextLink href={`/features/${id}`} passHref>
                          <MenuItem as={Link}>
                              View feature
                          </MenuItem>
                      </NextLink>
                      : null}
                  <MenuItem onClick={onCopy}>
                      Copy feature link
                  </MenuItem>
                  <FeaturesDeleteButton id={id} projectId={projectId}/>
              </MenuList>
          </Menu>
      </Td>
  </Box>
}

export const FeaturesTable = ({ features }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th minW="20rem">Problem</Th>
          <Th minW="5rem">Type</Th>
          <Th minW="5rem">Priority</Th>
          <Th minW="10rem">Date Added</Th>
          <Th>{""}</Th>
        </Tr>
      </thead>
      <tbody>
        {features.map((feature) => (
          <Row key={`${feature.problem}-${feature.id}`} {...feature} />
        ))}
      </tbody>
    </Table>
  )
}
