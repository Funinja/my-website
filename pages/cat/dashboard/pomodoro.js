import Container from '../../../components/UI/Container';
import React, { useState } from 'react';
import Timer from '../../../components/Timer';

export default function FrontPage(){
    var playerInformation = {
        fish : "Trout",
        length : 0
    }
    return (
        <Container>
            <Timer />
        </Container>
    )
}