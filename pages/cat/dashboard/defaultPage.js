import Container from '../../../components/UI/Container';
import React, { useState } from 'react';
import { Heading, Text } from '@chakra-ui/react'

export default function FrontPage(props){

    console.log("Other info", props.other);

    return (
        <Container>
          <Heading> Hello {props.name}!</Heading>
          <Text fontSize='3xl'> Welcome to Cat Management!</Text>
        </Container>
    )
}

export async function getServerSideProps(ctx){

  const cookie = ctx.req.cookies.CatJWT;

  const response = await fetch('http://localhost:3000/api/getInfo', {
    method: 'POST',
    headers: {
        'Content-Type' : 'application/json'
    },
    
    body: JSON.stringify({
      cookie:cookie,
    }),
  });

  const data = await response.json();

  return {
    props:{
      name: data.name,
      other: data.other
    },
  }
}