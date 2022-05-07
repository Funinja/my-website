import { Flex, Box, Button, useColorMode, Text } from '@chakra-ui/react'
import NextLink from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
    const { colorMode } = useColorMode();
    const router = useRouter();

    const navHoverBg = {
    light: "gray.100",
    dark: "gray.500",
    };
    return (
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        maxWidth="800px"
        minWidth="356px"
        width="100%"
        as="nav"
        px={4}
        my={8}
        mx="auto"
        bg="gray.700"
        w="100%"
        p={4}
        color="white"
      >
        <Box>
          <NextLink href="/" passHref>
            <Button
              as="a"
              variant="ghost"
              p={[1, 2, 4]}
              _hover={{ backgroundColor: navHoverBg[colorMode] }}
              aria-label="Home"
            >
              Home
            </Button>
          </NextLink>
        </Box>
        <Flex flexDir="row">
          <Button
            as="a"
            variant="ghost"
            _hover={{ backgroundColor: navHoverBg[colorMode] }}
          >
            Sign In
          </Button>
          <Button
            as="a"
            variant="ghost"
            _hover={{ backgroundColor: navHoverBg[colorMode] }}
          >
            Register
          </Button>
        </Flex>
      </Flex>
    );
}

export default Navbar;