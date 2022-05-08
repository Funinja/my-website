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

export default function Form() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();

        alert(`Email: ${email} & Password: ${password}`);

        if(!email || !email.includes('@') || !password){
            alert('Invalid details');
            return;
        }

        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email:email,
                password: await hash(password, 12),
            }),
        })

        const data = await res.json();
        console.log(data);

    }
    return(
        <form onSubmit={handleSubmit} width="800px">
            <FormControl isRequired width="800px">
                <FormLabel> Email Address </FormLabel>
                <Input 
                    placeholder="test@test.com"
                    type='email' 
                    size='lg'
                    onChange={event => setEmail(event.currentTarget.value)}
                />
                <FormHelperText> Also Username </FormHelperText>
            </FormControl>
            <FormControl isRequired>
                <FormLabel htmlFor='password' my={4}> Password </FormLabel>
                <Input 
                    id='password' 
                    type='password'
                    placeholder="********" 
                    size='lg'
                    onChange={event => setPassword(event.currentTarget.value)}
                />
                <FormHelperText> I am not liable for any stolen passwords </FormHelperText>

            </FormControl>
            <Flex flexDir="row">
                <Spacer />
                <Button my={4} colorScheme="teal" type="submit" variant="outline"> Sign Up </Button>
            </Flex>
        </form>
    );
}