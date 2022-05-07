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
        borderRadius='lg'
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
          <NextLink href="/cat/dashboard" passHref>
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
          <NextLink href="/cat/signup" passHref>
            <Button
              as="a"
              variant="ghost"
              _hover={{ backgroundColor: navHoverBg[colorMode] }}
            >
              Sign In
            </Button>
          </NextLink>
          <NextLink href="/cat/change_password" passHref>
            <Button
              as="a"
              variant="ghost"
              _hover={{ backgroundColor: navHoverBg[colorMode] }}
            >
              Change Password
            </Button>
            </NextLink>
          <Button
            as="a"
            variant="outline"
            colorScheme='teal'
            _hover={{ backgroundColor: navHoverBg[colorMode] }}
          >
            Logout
          </Button>
        </Flex>
      </Flex>
    );
}

export default Navbar;