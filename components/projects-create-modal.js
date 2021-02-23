import { useForm } from "react-hook-form"
import { mutate } from "swr"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ButtonGroup,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Button,
  Input,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { yupResolver } from '@hookform/resolvers/yup';

import { createProject } from "@/lib/db"

import { useAuth } from "@/lib/auth"

import {projectsCreateSchema}  from "@/schemas/projects-create-schema"

import {PRIMARY_COLOR_SCHEME} from "@/styles/theme"

export const ProjectCreateModal = ({ children = "Create project", ...props }) => {
  const toast = useToast()
  const auth = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { handleSubmit, register, errors } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(projectsCreateSchema)
  })

  const onCreateProject = ({ name, description = null, link = null }) => {
    const project = {
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      name,
      description,
      link,
    }

    createProject(project).then(() => mutate("/api/projects"))
    toast({
      title: "Success!",
      description: "We've created your project.",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
    mutate(
      "/api/projects",
      async (data) => {
        return { projects: [project, ...data.projects ] }
      },
      false
    )

    onClose()
  }


  return (
    <>
      <Button fontWeight="medium" colorScheme={PRIMARY_COLOR_SCHEME} onClick={onOpen} {...props}>
        {children}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onCreateProject)}>
          <ModalHeader fontWeight="bold">Add new project</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired isInvalid={errors.name?.message?.length > 0}>
              <FormLabel htmlFor="name">Name</FormLabel>

              <Input
                
                placeholder="My project"
                id="name"
                name="name"
                ref={register}
              />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>

            {/* <FormControl mt={6}>
              <FormLabel>Description (optional)</FormLabel>
              <Input
                placeholder="Greatest project in the world"
                name="description"
                ref={register()}
              />
            </FormControl> */}

            <FormControl  mt={6} isInvalid={errors.link?.message?.length > 0}>
              <FormLabel htmlFor="link">Link</FormLabel>
              <Input
                id="link"
                
                placeholder="Link to the project board"
                name="link"
                ref={register}
              />

             <FormErrorMessage>{errors.link?.message}</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup spacing={4}>
              <Button onClick={onClose} fontWeight="medium">
                Cancel
              </Button>

              <Button colorScheme={PRIMARY_COLOR_SCHEME} fontWeight="medium" type="submit">
                Create
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
