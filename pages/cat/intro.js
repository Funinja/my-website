import Container from "../../components/management/Container";
import { Heading, Link, Flex, Text, Button } from "@chakra-ui/react";

export default function Intro() {
    return (
        <div>
            <Container>
                <Heading fontSize='5xl'> Welcome to Cat Management! </Heading>
                <Link href="/cat/login">
                    <Button mx={1} my={4} px={6} colorScheme="teal" type="submit" variant="outline"> Login </Button>
                </Link>
                <Link href="/cat/signup">
                    <Button mx={1} colorScheme="teal" type="submit" variant="solid"> Sign Up </Button>
                </Link>
            </Container>

        </div>
    );  
}