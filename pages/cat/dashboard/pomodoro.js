import Container from '../../../components/UI/Container';
import React, { useState } from 'react';
import { Heading } from '@chakra-ui/react';
import Timer from '../../../components/Timer';
import dynamic from 'next/dynamic';

const Game = dynamic(() => import('./Game'), {
    ssr: false
});

export default function FrontPage(){
    console.log('test');
    return (
        <Container>
            <Timer />
                <Game />
        </Container>
    )
}