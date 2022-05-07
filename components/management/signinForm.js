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
    console.log("In form");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = event => {
        event.preventDefault();

        alert(`Email: ${email} & Password: ${password}`);
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
                <Button my={4} colorScheme="teal" type="submit" variant="outline"> Login </Button>
            </Flex>
        </form>
    );
}