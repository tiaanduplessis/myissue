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

const features = [
  {
    title: "Instantly sharable bug link",
    text: "Use with any project management tool you like. Just drop the link!",
  },
  {
    title: "Proven reporting template",
    text:
      "No more vague bugs that cause devs headaches. Get all the information you need.",
  },
  {
    title: "Device specific information",
    text: "Get all the information about the device the issue occured on.",
  },
  {
    title: "Smart feedback",
    text: "Know what makes a good issue report with our feedback system",
  },
]

export const LandingFeatures = () => {
  return (
    <Box id="features" px={4} py={20}>
      <Stack spacing={4} as={Container} maxW="3xl" textAlign={"center"}>
        <Heading fontSize={"3xl"}>Features</Heading>
        <Text color={"gray.700"} fontSize={"xl"}>
          Software can be expensive and not everyone can afford to have a dedicated QA person on staff. 
          With our suite of tools a small business owner can create bug reports and feature requests without ambiguity.
        </Text>
      </Stack>

      <Container maxW="3xl" mt={10}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10}>
          {[...features, ...features].map((feature) => (
            <HStack key={feature.title} align={"top"}>
              <Box color={"cyan.600"} px={2}>
                <Icon as={TiTickOutline} />
              </Box>
              <VStack align={"start"}>
                <Text fontWeight={500}>{feature.title}</Text>
                <Text color={"gray.600"}>{feature.text}</Text>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
