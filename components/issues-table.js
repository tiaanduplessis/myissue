import React from 'react';
import NextLink from "next/link"
import { Box, Link, Spinner } from '@chakra-ui/react';
import { parseISO, format } from 'date-fns';

import { Table, Tr, Th, Td } from '@/components/table';

export const IssuesTable = ({ issues }) => {
    return (
        <Table>
            <thead>
                <Tr>
                    <Th>Title</Th>
                    <Th>Status</Th>
                    <Th>Date Added</Th>
                    <Th>{''}</Th>
                </Tr>
            </thead>
            <tbody>
                {issues.map((issue) => (
                    <Box as="tr" key={`${issue.name}-${issue.id}`}>
                        <Td fontWeight="medium">{issue.name}</Td>
                        <Td><Link href={issue.link} target="_blank" isExternal>
                            {project.link}
                        </Link></Td>
                        <Td>
                            {project.id ? <NextLink href={`/issues?projectId=${project.id}`}>
                                <Link>View issues</Link>
                            </NextLink> : <Spinner />}
                        </Td>
                        <Td>{format(parseISO(project.createdAt), 'PPpp')}</Td>
                    </Box>
                ))}
            </tbody>
        </Table>
    );
};