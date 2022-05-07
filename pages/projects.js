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
          <Link href="/cat/dashboard">
            <Flex
              flexDir="column"
              my={4}
              border="1px solid gray"
              p="5px"
              borderRadius={5}
            >
              <Text fontWeight="bold" fontSize="2xl">
                Time Management Site
              </Text>
              <Text fontSize="2xl">
                (Chakra, Javascript, MongoDB, Next-Auth, Cryptography )
              </Text>
            </Flex>
          </Link>
        </Flex>
      </Container>
    );
}