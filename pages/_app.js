import '../styles/globals.css'
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps }) {
  const config = {
    initialColorMode: "dark",
    useSystemColorMode: false,
  };

  const theme = extendTheme({ config });
  return (
    <SessionProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp
