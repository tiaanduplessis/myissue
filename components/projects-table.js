import React from "react"
import NextLink from "next/link"
import { Box, Link, Button, Menu, MenuButton, MenuList, MenuItem, useClipboard } from "@chakra-ui/react"
import { parseISO, format } from "date-fns"

import { Table, Tr, Th, Td } from "@/components/table"
import { RiArrowDownSLine } from "react-icons/ri"

const Row = ({ name, id, link, createdAt }) => {
    const { hasCopied, onCopy } = useClipboard(link)
    return <Box as="tr" >
        <Td fontWeight="medium">{name}</Td>
        <Td>
            <Link
                color="blue.600"
                href={link}
                target="_blank"
                isExternal
                fontSize="sm"
            >
                {link}
            </Link>
        </Td>
        <Td>{format(parseISO(createdAt), "PPpp")}</Td>
        <Td>
            <Menu>
                <MenuButton as={Button} isLoading={!id} fontWeight="medium" rightIcon={<RiArrowDownSLine />}>
                    {hasCopied ? 'Copied' : 'Actions'}
                </MenuButton>
                <MenuList>
                        <NextLink href={`/issues?projectId=${id}`} passHref>
                            <MenuItem as={Link}>
                                View issues
                            </MenuItem>
                        </NextLink>
                    <MenuItem hidden={!link} onClick={onCopy}>
                        Copy link
                    </MenuItem>
                    <MenuItem>Delete</MenuItem>
                </MenuList>
            </Menu>

        </Td>
    </Box>


}

export const ProjectsTable = ({ projects }) => {

    return (
        <Table>
            <thead>
                <Tr>
                    <Th>Name</Th>
                    <Th>Link</Th>
                    <Th>Date Added</Th>
                    <Th>{""}</Th>
                </Tr>
            </thead>
            <tbody>
                {projects.map((project) => <Row key={`${project.name}-${project.id}`} {...project} />)}
            </tbody>
        </Table>
    )
}
