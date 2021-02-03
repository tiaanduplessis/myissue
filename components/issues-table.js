import React from 'react';
import NextLink from "next/link"
import { Box, Link, Spinner, Badge } from '@chakra-ui/react';
import { parseISO, format } from 'date-fns';

import { Table, Tr, Th, Td } from '@/components/table';

const PRIORTY_COLOR_MAP = {
    "low": "green",
    "medium": "yellow",
    "high": "red"
}

export const IssuesTable = ({ issues }) => {
    return (
        <Table>
            <thead>
                <Tr>
                    <Th>Title</Th>
                    <Th>Priorty</Th>
                    <Th>Date Added</Th>
                    {/* <Th>Status</Th> */}
                    <Th>{''}</Th>
                </Tr>
            </thead>
            <tbody>
                {issues.map((issue) => (
                    <Box as="tr" key={`${issue.title}-${issue.id}`}>
                        <Td fontWeight="medium">{issue.title}</Td>
                        <Td><Badge colorScheme={PRIORTY_COLOR_MAP[issue.priority]}>{issue.priority}</Badge></Td>
                        <Td>{format(parseISO(issue.createdAt), 'PPpp')}</Td>
                        <Td>
                            {issue.id ? <NextLink href={`/issues/${issue.id}`}>
                                <Link>View issue</Link>
                            </NextLink> : <Spinner />}
                        </Td>
                    </Box>
                ))}
            </tbody>
        </Table>
    );
};