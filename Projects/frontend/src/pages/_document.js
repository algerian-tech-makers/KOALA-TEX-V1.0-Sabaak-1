import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&family=Libre+Baskerville:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <title>msrc</title>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
