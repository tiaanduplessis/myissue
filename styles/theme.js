import { extendTheme } from "@chakra-ui/react"

const fontStack = `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
"Segoe UI Symbol"`

export const PRIMARY_COLOR_SCHEME = 'blue'

export default extendTheme({
  fonts: {
    body: fontStack,
    heading: fontStack
  },
  components: {
    Heading: {
      baseStyle: {
        fontWeight: 'black'
      }
    },
    Button: {
      baseStyle: {
        "&:active": {
          transform: "scale(.98)",
        },
      },
    },
  },
})
