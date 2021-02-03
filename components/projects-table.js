import React from 'react';
import NextLink from "next/link"
import { Box, Link, Spinner } from '@chakra-ui/react';
import { parseISO, format } from 'date-fns';

import { Table, Tr, Th, Td } from '@/components/table';

export const ProjectsTable = ({ projects }) => {
    return (
        <Table>
            <thead>
                <Tr>
                    <Th>Name</Th>
                    <Th>Link</Th>
                    <Th>Date Added</Th>
                    <Th>{''}</Th>
                </Tr>
            </thead>
            <tbody>
                {projects.map((project) => (
                    <Box as="tr" key={`${project.name}-${project.id}`}>
                        <Td fontWeight="medium">{project.name}</Td>
                        <Td><Link color="blue.600" href={project.link} target="_blank" isExternal>
                            {project.link}
                        </Link></Td>
                        <Td>{format(parseISO(project.createdAt), 'PPpp')}</Td>
                        <Td>
                            {project.id ? <NextLink href={`/issues?projectId=${project.id}`}>
                                <Link>View issues</Link>
                            </NextLink> : <Spinner />}
                        </Td>
                    </Box>
                ))}
            </tbody>
        </Table>
    );
};