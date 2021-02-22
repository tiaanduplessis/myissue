import React, { useState, useRef } from 'react';
import { mutate } from 'swr';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
  Button,
  MenuItem
} from '@chakra-ui/react';

import { deleteProject } from '@/lib/db';

export const ProjectsDeleteButton = ({ id, ...props }) => {
const toast = useToast()
  const [isOpen, setIsOpen] = useState();
  const cancelRef = useRef();

  const onClose = () => setIsOpen(false);
  const onDelete = () => {
    deleteProject(id).then(() => mutate('/api/projects'))
    toast({
        title: "Success!",
        description: "We've deleted the project.",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    mutate(
      '/api/projects',
      async (data) => {
        return {
          projects: data?.projects.filter(
            (project) => project.id !== id
          ) ?? []
        };
      },
      false
    );
    onClose();
  };

  return (
    <>
      <MenuItem
        {...props}
        style={{color: '#C53030'}}
        onClick={() => setIsOpen(true)}

      >Delete</MenuItem>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="xl" fontWeight="black">
            Delete project
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
  );
};