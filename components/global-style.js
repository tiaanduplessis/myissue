import { Global, css } from "@emotion/react"

export const GlobalStyle = ({ children }) => {
  return (
    <>
      <Global
        styles={css`
          html {
            scroll-behavior: smooth;
          }

          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            line-height: 1.75;
          }

          #nprogress {
            pointer-events: none;
          }

          #nprogress .bar {
            background: #2b6cb0;
            position: fixed;
            z-index: 9999;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
          }

          #nprogress .peg {
            display: block;
            position: absolute;
            right: 0;
            width: 100px;
            height: 100%;
            box-shadow: 0 0 10px #2b6cb0, 0 0 5px #2b6cb0;
            opacity: 1;
            transform: rotate(3deg) translate(0px, -4px);
          }

          #nprogress .spinner {
            display: block;
            position: fixed;
            z-index: 9999;
            bottom: 1rem;
            right: 1rem;
          }

          #nprogress .spinner-icon {
            width: 18px;
            height: 18px;
            box-sizing: border-box;

            border: solid 2px transparent;
            border-top-color: #2b6cb0;
            border-left-color: #2b6cb0;
            border-radius: 50%;
            animation: nprogress-spinner 400ms linear infinite;
          }

          .nprogress-custom-parent {
            overflow: hidden;
            position: relative;
          }

          .nprogress-custom-parent #nprogress .spinner,
          .nprogress-custom-parent #nprogress .bar {
            position: absolute;
          }

          @keyframes nprogress-spinner {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      />
      {children}
    </>
  )
}
