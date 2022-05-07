import '../styles/globals.css'
import { ChakraProvider, extendTheme } from "@chakra-ui/react"

function MyApp({ Component, pageProps }) {
  const config = {
    initialColorMode: "dark",
    useSystemColorMode: false,
  };

  const theme = extendTheme({ config });
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp
