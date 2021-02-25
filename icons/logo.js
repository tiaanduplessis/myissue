import { createIcon } from "@chakra-ui/react"

export const LogoIcon = createIcon({
  displayName: "Logo",
  viewBox: "0 0 512 512",
  defaultProps: {
    color: "gray.800",
  },
  path: [
    <circle key="circle" cx="256" cy="256" r="256" fill="currentColor" />,
    <path
      key="path-1"
      d="M220.083 290.915a61.9725 61.9725 0 0020.261 13.763 61.987 61.987 0 0024.01 4.84 61.9789 61.9789 0 0044.271-18.603l70.834-70.833c11.741-11.742 18.337-27.666 18.337-44.271s-6.596-32.53-18.337-44.271c-11.742-11.741-27.667-18.338-44.271-18.338-16.605 0-32.53 6.597-44.271 18.338l-8.854 8.854"
      stroke="#fff"
      strokeWidth="30"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="currentColor"
    />,
    <path
      key="path-2"
      d="M290.915 220.083a61.9725 61.9725 0 00-20.261-13.763 61.9797 61.9797 0 00-24.01-4.84c-8.246 0-16.408 1.646-24.01 4.84a61.9725 61.9725 0 00-20.261 13.763l-70.833 70.833c-11.741 11.742-18.338 27.666-18.338 44.271s6.597 32.53 18.338 44.271 27.666 18.338 44.271 18.338 32.529-6.597 44.271-18.338l8.854-8.854"
      stroke="#fff"
      strokeWidth="30"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="currentColor"
    />,
  ],
})
