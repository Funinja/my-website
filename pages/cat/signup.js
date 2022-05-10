import Container from '../../components/management/Container';
import Form from '../../components/management/loginForm';
import RegisterForm from '../../components/management/registerForm';
import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';

export default function(){
    
    return (
        <Container>
            <RegisterForm />
        </Container>
    )
}