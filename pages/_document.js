import Document, { Html, Head, Main, NextScript } from "next/document"

class Doc extends Document {
  render() {
    return (
      <Html>
        <Head>
          <title>Logabug</title>
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
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
