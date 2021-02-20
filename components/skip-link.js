import {Link} from "@chakra-ui/react"

export const SkipLink = ({href = "#content", children = "Skip to content", ...props}) => <Link href={href} sx={{
    transform: 'translateX(-150%)',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'gray.900',
    color: 'white',
    padding: 2,
    ":focus": {
      transform: 'translateX(0)',
    }
  }} {...props}>{children}</Link>