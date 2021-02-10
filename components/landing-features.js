import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
} from "@chakra-ui/react"
import { TiTickOutline } from "react-icons/ti"

import {PRIMARY_COLOR_SCHEME} from "@/styles/theme"



const features = [
  {
    title: "Instantly sharable issue link",
    text: "Use with any project management tool you like. Just drop the link.",
  },
  {
    title: "Proven bug reporting template",
    text: "No more vague bugs that cause devs headaches. All the information in one link.",
  },
  {
    title: "Device specific information",
    text: "Attach all your device information with the bug.",
  },
  {
    title: "Manage issues",
    text: "Group issues under projects and their priorty and status",
  },
  {
    title: "Smart feedback",
    text: "Get suggestions for consise language while writing your issues",
  },
  {
    title: "High performance",
    text: "Don't get bogged down with slow project management software",
  },
  
]

export const LandingFeatures = () => {
  return (
    <Box id="features" px={4} py={20}>
      <Stack spacing={4} as={Container} maxW="3xl" textAlign={"center"}>
        <Heading fontSize={"3xl"} mb={5}>Features</Heading>
        <Text color={"gray.700"} fontSize={"xl"}>
        A lot of time and money goes into dealing with ambiguity and vagueness in bug reports and feature requests. Cut down on that cost by giving your developer the information required to get the job done.
        </Text>
      </Stack>

      <Container maxW="3xl" mt={12}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10}>
          {features.map((feature) => (
            <HStack key={feature.title} align={"top"}>
              <Box color={`${PRIMARY_COLOR_SCHEME}.600`} px={2}>
                <Icon as={TiTickOutline} />
              </Box>
              <VStack align={"start"}>
                <Text fontWeight={500} as='h3'>{feature.title}</Text>
                <Text color={"gray.600"}>{feature.text}</Text>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
