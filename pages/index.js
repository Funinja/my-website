import Container from "../components/Container";
import { Flex, Center, Heading, Text, Image, Spacer } from "@chakra-ui/react";


export default function Home() {
  return (
    <>
      <Container>

        <Flex
        flexDirection='row'
        width='740px'>

          <Flex
            flexDirection='column' 
            >
            <Spacer />
            <Heading as="h1" size="3xl">
              Dennis Lam
            </Heading>
            <Text fontSize="2xl" my={4}>
              Software Student
            </Text>
            <Spacer />
          </Flex>
          
          <Spacer />


          <Image 
          borderRadius='full'
          boxSize='180px'
          src='/my_pic.jpg'
          alt='Dennis Lam' 
          />


        </Flex>

        <Text fontSize="2xl" my={10}>
          Welcome to my website! Currently, I am a Computer Engineer graduating in 2023 at the University of Toronto - St. George Campus.
          I have an interest in low-level programming, art, and reading.
        </Text>
        {/* <Button colorScheme="cyan" size="lg">
          Hire
        </Button> */}
      </Container>
    </>
  );
}
