import {
    Box,
    Container,
    Heading,
    Stack,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
  } from "@chakra-ui/react"

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
  
  export const LandingFAQs = () => {
    return (
      <Box id="faqs" px={4} py={20}>
          <Heading as="h2" fontSize={"3xl"} textAlign="center" maxW="3xl" mx="auto" >FAQs</Heading>

  
        <Container maxW="3xl" mt={12}>

        <Accordion spacing={10}>
            {features.map(faq => {
                return  <AccordionItem>
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
  