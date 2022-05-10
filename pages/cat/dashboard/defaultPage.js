import Container from '../../../components/UI/Container';
import React, { useState } from 'react';
import { Heading } from '@chakra-ui/react'

export default function FrontPage(props){


    return (
        <Container>
          <Heading> Hello {props.name}</Heading>
        </Container>
    )
}

export async function getServerSideProps(ctx){

  const cookie = ctx.req.cookies.CatJWT;
  console.log(cookie);

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

  // console.log(response.status);

  return {
    props:{
      name: data.name,
    },
  }
}