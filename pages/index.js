import Container from "../components/Container";
import { Heading, Text, Button } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Container>
        <Heading as="h1" size="3xl">
          Dennis Lam
        </Heading>
        <Text fontSize="2xl" my={4}>
          Software  Student
        </Text>
        <Button colorScheme="cyan" size="lg">
          Hire
        </Button>
      </Container>
    </>
  );
}
