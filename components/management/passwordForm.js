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

var sha256 = require('js-sha256').sha256;

export default function Form() {
    const [password1, setPassword1] = useState('');
    const [password, setPassword] = useState('');
    const [submit, setSubmit] = useState(0);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== password1){
            setSubmit(2);
        }else{

            const response = await fetch('/api/newPassword', {
                method: 'POST',
                headers:{
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    password: sha256(password),
                }),
            })

            const data = await response.json();

            console.log(response.status);

            if(response.status < 200 || response.status > 299){
                console.log(data.message);
                if(submit !== 2){
                    setSubmit(2);
                }
                return;
            }

            setSubmit(1);


        }

        // alert(`Password: ${password1} & Password: ${password}`);
    }
    return(
        <form onSubmit={handleSubmit} width="800px">
            <FormControl isRequired width="800px" isInvalid={submit === 2}>
                <FormLabel> New Password </FormLabel>
                <Input 
                    id='password' 
                    type='password'
                    placeholder="********" 
                    size='lg'
                    onChange={event => setPassword1(event.currentTarget.value)}
                />
            </FormControl>
            <FormControl isRequired isInvalid={submit === 2}>
                <FormLabel htmlFor='password' my={4}> New Password Retyped </FormLabel>
                <Input 
                    id='password' 
                    type='password'
                    placeholder="********" 
                    size='lg'
                    onChange={event => setPassword(event.currentTarget.value)}
                />
                {submit === 0 && <FormHelperText> Click button to change password </FormHelperText>}
                {submit === 1 && <FormHelperText> Password Successfully Changed! </FormHelperText>}
                {submit === 2 && <FormErrorMessage> Password is Wrongly Typed </FormErrorMessage>}

            </FormControl>
            <Flex flexDir="row">
                <Spacer />
                <Button my={4} colorScheme="teal" type="submit" variant="outline"> Change </Button>
            </Flex>
        </form>
    );
}