import { Flex, Stack } from "@chakra-ui/react";
import Navbar from "./Navbar";

export default function Container({ children }) {
  return (
    <>
      <Navbar />
      <Stack
        as="main"
        spacing={8}
        justifyContent="center"
        alignItems="center"
        m="0 auto 4rem auto"
        maxWidth="800px"
        px={4}
      >
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          maxWidth="800px"
          w="100%"
        >
          {children}
        </Flex>
      </Stack>
    </>
  );
}
