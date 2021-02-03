import React from 'react';
import { Box } from '@chakra-ui/react';

import { Table, Tr, Th, Td } from '@/components/table';

export const DeviceTable = ({ data, ...props }) => {
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
                        <Td>{value}</Td>
                    </Box>
                ))}
            </tbody>
        </Table>
    );
};