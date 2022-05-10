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

export default function Form() {
    const [password1, setPassword1] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = event => {
        event.preventDefault();

        alert(`Password: ${password1} & Password: ${password}`);
    }
    return(
        <form onSubmit={handleSubmit} width="800px">
            <FormControl isRequired width="800px">
                <FormLabel> New Password </FormLabel>
                <Input 
                    id='password' 
                    type='password'
                    placeholder="********" 
                    size='lg'
                    onChange={event => setPassword1(event.currentTarget.value)}
                />
            </FormControl>
            <FormControl isRequired>
                <FormLabel htmlFor='password' my={4}> New Password Retyped </FormLabel>
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
                <Button my={4} colorScheme="teal" type="submit" variant="outline"> Change </Button>
            </Flex>
        </form>
    );
}