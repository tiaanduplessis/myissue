import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  Input,
  useDisclosure,
  useToast
} from '@chakra-ui/react';

import { addProject } from '@/lib/db';
import { useAuth } from '@/lib/auth';

export const AddProjectModal = ({children = 'Add project'}) => {
  const toast = useToast();
  const auth = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register } = useForm();

  const onAddProject = ({name, description = null, link = null}) => {

    const project = {
      userId: auth.user.uid,
      createdAt: new Date().toISOString(),
      name,
      description,
      link
    };

    addProject(project);
    toast({
      title: 'Success!',
      description: "We've added your project.",
      status: 'success',
      duration: 5000,
      isClosable: true
    });

    mutate(
      '/api/projects',
      async (data) => {
        return { projects: [...data.projects, project] };
      },
      false
    );

    onClose();
  };

  return (
    <>
      <Button fontWeight="medium" 

       onClick={onOpen}>  
        {children}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onAddProject)}>
          <ModalHeader fontWeight="bold">Add new project</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="My project"
                name="name"
                ref={register({
                  required: 'Required'
                })}
              />
            </FormControl>

            <FormControl mt={5}>
              <FormLabel>Description (optional)</FormLabel>
              <Input
                placeholder="Greatest project in the world"
                name="description"
                ref={register()}
              />
            </FormControl>

            <FormControl mt={5}>
              <FormLabel>Link</FormLabel>
              <Input
                placeholder="Link to the project board"
                name="link"
                ref={register({
                  required: 'Required'
                })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3} fontWeight="medium">
              Cancel
            </Button>
            <Button
              backgroundColor="#99FFFE"
              color="#194D4C"
              fontWeight="medium"
              type="submit"
            >
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

