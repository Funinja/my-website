import { Text, 
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
    Flex,
    Spacer
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { hash } from 'bcryptjs';
import NextLink from "next/link";

export default function Register() {
    const [email, setEmail] = useState('');

    const [error, setError] = useState('');

    const isError = error === '';

    const handleSubmit = async (event) => {
        event.preventDefault();
        // alert('Registering New Account');
        if(!email || !email.includes('@')){
            alert('Invalid details');
            return;
        }

        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email:email,
            }),
        })

        const data = await res.json();

        console.log(res.status);

        if(res.status < 200 || res.status > 299){
            // console.log(data.message);
            setError(data.message);
            console.log(error);
            return;
        }

        console.log(data);
    }

    return(
        <>
            <form onSubmit={handleSubmit} width="800px">
                <FormControl isRequired width="800px">
                    <FormLabel> Email Address </FormLabel>
                    <Input 
                        placeholder="test@test.com"
                        type='email' 
                        size='lg'
                        onChange={event => setEmail(event.currentTarget.value)}
                    />


                    <FormHelperText> You will get an email to make an account, check your spam folder </FormHelperText>


                </FormControl>
                <Flex flexDir="row">
                    <Spacer />
                    <Button my={4} colorScheme="teal" type="submit" variant="outline"> Sign Up </Button>
                </Flex>
            </form>
        </>
    )
}