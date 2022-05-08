import Container from '../../components/management/Container';
import Form from '../../components/management/signupForm';
import RegisterForm from '../../components/management/registerForm';
import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';

export default function(){
    const [register, setRegister] = useState(1);
    const handleRegister = async (event) => {
        event.preventDefault();
        // alert('Changed to Register');
        if(register){
            setRegister(0);
        }else{
            setRegister(1);
        }
    }
    return (
        <Container>
            <Button onClick={handleRegister} mx={300} my={4} px={50}> {register ? 'Sign Up' : 'Sign In'} </Button>
            {register ? <Form /> : <RegisterForm />}
        </Container>
    )
}