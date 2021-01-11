import { extendTheme } from "@chakra-ui/react"
export default extendTheme({
    fonts: {
        body: `Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
        "Segoe UI Symbol"`
    },
    components: {
        Button: {
            baseStyle: {
                "&:active": {
                    "transform": "scale(.98)"
                }
            }
        }
    }
})