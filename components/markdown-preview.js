import ReactMarkdown from "react-markdown"
import { Box } from "@chakra-ui/react"
import gfm from "remark-gfm"

export const MarkdownPreview = ({ children, ...props }) => {
  return (
    <Box
      {...props}
      sx={{
        "& h1": {
          fontSize: "2rem",
        },
        "& h2": {
          fontSize: "1.5rem",
        },
        "& h3": {
          fontSize: "1.25rem",
        },
        "& a": {
          textDecoration: "underline",
        },
        "& ul, & ol": {
          paddingLeft: "1rem",
        },
      }}
    >
      <ReactMarkdown plugins={[gfm]}>{children}</ReactMarkdown>
    </Box>
  )
}
