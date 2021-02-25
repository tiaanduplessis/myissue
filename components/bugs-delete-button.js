import React, { useState, useRef } from "react"
import { mutate } from "swr"
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
  Button,
  MenuItem,
} from "@chakra-ui/react"

import { deleteBug } from "@/lib/db"

export const BugsDeleteButton = ({ id, projectId, ...props }) => {
  const toast = useToast()
  const [isOpen, setIsOpen] = useState()
  const cancelRef = useRef()
  const key = projectId ? `/api/projects/${projectId}/bugs` : "/api/bugs"

  const onClose = () => setIsOpen(false)
  const onDelete = () => {
    deleteBug(id).then(() => mutate(key))
    toast({
      title: "Success!",
      description: "We've deleted the bug.",
      status: "success",
      duration: 5000,
      isClosable: true,
    })

    mutate(
      key,
      async (data) => {
        return {
          bugs: data?.bugs.filter((bug) => bug.id !== id) ?? [],
        }
      },
      false
    )
    onClose()
  }

  return (
    <>
      <MenuItem
        {...props}
        style={{ color: "#C53030" }}
        onClick={() => setIsOpen(true)}
      >
        Delete
      </MenuItem>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="xl" fontWeight="black">
            Delete bug
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={onDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
