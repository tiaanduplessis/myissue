import { Flex, Image } from "@chakra-ui/react"

export const ResourcePreview = ({ files, ...props }) => <Flex flexWrap="wrap" as="ul" sx={{
    listStyle: 'none'
}} {...props}>
    {files.map(file => (
        <li >
            {file.type.startsWith('image') && <a href={file.preview} target="_blank">
                <Image
                    alt={file.name}
                    src={file.preview}
                    maxW="sm"
                    m={2}
                    loading="lazy"
                    border="1px solid"
                    borderColor="gray.100"
                    borderRadius="md"
                />
            </a>}
            
        </li>

    ))}
</Flex>