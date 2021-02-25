import { Flex, Image, Box } from "@chakra-ui/react"

export const ResourcePreview = ({ files, ...props }) => (
  <Flex
    flexWrap="wrap"
    as="ul"
    sx={{
      listStyle: "none",
    }}
    {...props}
  >
    {files.map((file) => (
      <li key={`${file.name}-${file.type}`}>
        {file.type.startsWith("image") && (
          <a href={file.preview} target="_blank">
            <Image
              alt={file.name}
              src={file.preview}
              w="sm"
              maxW="100%"
              m={2}
              loading="lazy"
              border="1px solid"
              borderColor="gray.100"
              borderRadius="md"
            />
          </a>
        )}

        {file.type.startsWith("video") && (
          <Box
            as="video"
            src={file.preview}
            w="sm"
            maxW="100%"
            controls
            m={2}
            loading="lazy"
            border="1px solid"
            borderColor="gray.100"
            borderRadius="md"
          />
        )}
      </li>
    ))}
  </Flex>
)
