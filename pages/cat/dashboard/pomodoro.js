import Container from '../../../components/UI/Container';
import React, { useState } from 'react';
import { Heading } from '@chakra-ui/react';
import Timer from '../../../components/Timer'

export default function FrontPage(){

    const options = ["Pomodoro", "Short Break", "Long Break"];
    
    return (
        <Container>
            <Timer />
        </Container>
    )
}