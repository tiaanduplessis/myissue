import Document, { Html, Head, Main, NextScript } from "next/document"

class Doc extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <title>myissue</title>
          <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#171923" />
          <meta name="apple-mobile-web-app-title" content="myissue" />
          <meta name="application-name" content="myissue" />
          <meta name="msapplication-TileColor" content="#171923" />
          <meta name="theme-color" content="#ffffff" />
          
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          
          <link rel="preload"
              as="style"
              href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap&subset=latin"  />

        <link rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap&subset=latin" 
              media="print" onload="this.media='all'" />

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Doc
