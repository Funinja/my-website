import Container from "../../components/management/Container";
import { Heading, Text, Button } from "@chakra-ui/react";


export default function Dashboard() {
    return (
        <div>
            <Container>
                <Heading fontSize='5xl'> Welcome to Cat Management! </Heading>
            </Container>

        </div>
    );  
}