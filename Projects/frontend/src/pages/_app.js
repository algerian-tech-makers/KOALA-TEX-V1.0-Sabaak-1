import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Navbar } from "../components/layouts/navbar";
import themes from "../theme";

function MyApp({ Component, pageProps }) {
  const theme = extendTheme(themes);
  return (
    <ChakraProvider theme={theme}>
      <Navbar>
        <Component {...pageProps} />
      </Navbar>
    </ChakraProvider>
  );
}

export default MyApp;
