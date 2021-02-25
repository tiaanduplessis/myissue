import {
  Box,
  Container,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react"

const faqs = [
  {
    title: "Why build a tool for just creating bugs and features?",
    text:
      "When working with clients that have a limited budget, we've found that investing in expensive project management software isn't always a viable option. In many cases the business owner is the one performing the QA and just wants the ability to log bugs, create feature requests and know what the status is.",
  },
  {
    title: "How much does it cost?",
    text: "It's free to create a bug. You can also sign up and use the rest of the platform for free. Some additional priced features may be added in the future.",
  },

  {
    title: "Can it integrate with my project management software?",
    text:
      "Additional integrations are planned for the future.",
  },
  {
    title: "It feels limited. Can I do additional configuration for my use case?",
    text: "Things are kept as simple as possible to make it easy for non-technical users to get things done. Additioanl configuration features may be added in the future, but not at cost of complexity.",
  }
]

export const LandingFAQs = () => {
  return (
    <Box id="faqs" px={4} py={{
      base: 12,
      md: 18
    }}>
      <Heading as="h2" fontSize={"3xl"} textAlign="center" maxW="3xl" mx="auto" >FAQs</Heading>

      <Container maxW="3xl" mt={12}>

        <Accordion spacing={10}>
          {faqs.map(faq => {
            return <AccordionItem key={faq.title}>
              <Heading as="h3" >
                <AccordionButton fontWeight='bold' py={4}>
                  <Box flex="1" textAlign="left">
                    {faq.title}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </Heading>
              <AccordionPanel pt={4} pb={8}>
                {faq.text}
              </AccordionPanel>
            </AccordionItem>
          })}


        </Accordion>
      </Container>
    </Box>
  )
}
