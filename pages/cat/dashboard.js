import Container from "../../components/management/Container";
import { Heading, Link, Flex, Text, Button } from "@chakra-ui/react";


export default function Dashboard() {
    return (
        <div>
            <Container>
                <Heading fontSize='5xl'> Welcome to Cat Management! </Heading>
                <Link href="/cat/signup">
                    <Button my={4} colorScheme="teal" type="submit" variant="outline"> Sign Up </Button>
                </Link>
            </Container>

        </div>
    );  
}