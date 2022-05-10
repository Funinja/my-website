import {
    Flex,
    Heading,
    Text,
    Link
} from '@chakra-ui/react'
import Container from '../components/Container'

export default function Projects(){

    return (
      <Container>
        <Heading fontSize="6xl"> Projects </Heading>
        <Flex flexDir="column" w="800px">
          <Link href="/cat/intro">
            <Flex
              flexDir="column"
              my={4}
              border="1px solid gray"
              p="5px"
              borderRadius={5}
            >
              <Text fontWeight="bold" fontSize="2xl">
                Cat Management
              </Text>
              <Text fontSize="2xl">
                (Chakra, Javascript, MongoDB, Cryptography )
              </Text>
            </Flex>
          </Link>
        </Flex>
      </Container>
    );
}