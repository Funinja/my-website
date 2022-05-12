import { Flex, Box, Button, useColorMode, Link } from '@chakra-ui/react'
import NextLink from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
    const { colorMode } = useColorMode();
    const router = useRouter();


    const handleLogout = async() => {

      try{
        const response = await fetch('/api/logout', {
          method: 'POST',
          headers: {
              'Content-Type' : 'application/json'
          },
        });

        const data = await response.json();

        console.log(response.status);

        if(response.status < 200 || response.status > 299){
          alert(data.message);
          return;
        }

        console.log(data.message);

      }catch(error){
        alert(error?.message || "Something went wrong")
      }
    console.log("Logging Out...");


    }

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
          <NextLink href="/cat/intro" passHref>
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
            mx={8}
            href="/cat/change_password"
            _hover={{ backgroundColor: navHoverBg[colorMode] }}
          >
            Change Password
          </Button>

        </Flex>
      </Flex>
    );
}

export default Navbar;