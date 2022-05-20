import Container from "../../components/management/Container";
import { Heading, Link, Flex, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";


export default function PChanged() {

    const router = useRouter();

    useEffect(() => {
        router.push('/cat/dashboard/change_password');
    }, []);

    return(
        <>
            <Container>
                <Heading>
                    Password Changed!
                </Heading>
            </Container>
        </>
    )

}