
import {Heading, Text, Link} from '@chakra-ui/react'

export default {
    h1: props => <Heading as="h1" size="xl" {...props} />,
    h2: props => <Heading as="h2" size="lg" {...props} />,
    h3: props => <Heading as="h3" size="md" {...props} />,
    p:  props => <Text as="p" lineHeight="tall" {...props} />,
    a: props => <Link {...props} />
}