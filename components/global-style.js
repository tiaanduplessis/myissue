import { Global, css } from "@emotion/react"

export const GlobalStyle = ({ children }) => {
  return (
    <>
      <Global
        styles={css`
          html {
            min-width: 24rem;
            scroll-behavior: smooth;
            text-rendering: optimizeSpeed;
          }

          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
        `}
      />
      {children}
    </>
  )
}
