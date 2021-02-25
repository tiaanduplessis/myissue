import React, { useEffect, useState } from "react"
import { Text, Box, FormLabel } from "@chakra-ui/react"
import { useDropzone } from "react-dropzone"

import { ResourcePreview } from "@/components/resource-preview"

const MAX_FILE_SIZE = 60000000 // 60mb
const MAX_NUM_OF_FILES = 5

export const ResourceUpload = ({
  id = "files",
  name = "files",
  onFilesChanged,
  ...props
}) => {
  const [files, setFiles] = useState([])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ["image/*", "video/*"],
    multiple: true,
    maxFiles: MAX_NUM_OF_FILES,
    maxSize: MAX_FILE_SIZE,
    onDrop: (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) => {
        return {
          name: file.name,
          path: file.path,
          type: file.type,
          preview: URL.createObjectURL(file),
        }
      })

      if (files.length + newFiles.length <= MAX_NUM_OF_FILES) {
        setFiles((files) => [...files, ...newFiles])
      } else {
        setFiles(newFiles)
      }
    },
  })

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview))
    },
    [files]
  )

  useEffect(() => {
    onFilesChanged(files)
  }, [files])

  return (
    <Box {...props}>
      <FormLabel htmlFor={id}>Files</FormLabel>
      <Box
        {...getRootProps()}
        borderRadius="md"
        px={2}
        py={10}
        backgroundColor="gray.100"
        border="1px dashed"
        borderColor="gray.300"
      >
        <input id={id} name={name} {...getInputProps()} />
        <Text textAlign="center" fontWeight="bold">
          {isDragActive
            ? "Drop the files here(max 60MB) ..."
            : `Drag 'n' drop some files here, or click to select files`}
        </Text>
        <Text textAlign="center" fontSize="sm" color="gray.700">
          ({MAX_NUM_OF_FILES} files are the maximum number of files you can drop
          here)
        </Text>
      </Box>
      <ResourcePreview files={files} mt={8} />
    </Box>
  )
}
