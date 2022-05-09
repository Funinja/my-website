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
import React, { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { hash } from 'bcryptjs';
import NextLink from "next/link";
import Proptypes from "prop-types";
import ReCAPTCHA from "react-google-recaptcha";


export default function Register() {

    const [email, setEmail] = useState('');

    const [error, setError] = useState('');

    const [token, setToken] = useState('');

    const isError = error === '';

    const recaptchaRef = React.useRef();

    const handleSubmit = async (event) => {
        event.preventDefault();

        await recaptchaRef.current.executeAsync();

    }

    const onReCAPTCHAChange = async (captchaCode) => {
        if(!captchaCode){
            return;
        }

        setToken(captchaCode);

        alert(`Captcha working ${captchaCode}`);

        if(!email || !email.includes('@')){
            alert('Invalid details');
            return;
        }

        try{
            console.log("awaiting signup api");
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    email:email,
                    captcha: captchaCode
                }),
            });

            const data = await response.json();

            console.log(response.status);

            if(response.status < 200 || response.status > 299){
                // console.log(data.message);
                setError(data.message);
                console.log(error);
                return;
            }

            console.log(data);
        }catch(error){
            alert(error?.message || "Something went wrong")
        }finally{
            recaptchaRef.current.reset();
        }
    }

    const PUBLIC_SITEKEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY;

    return(
        <>
            <form onSubmit={handleSubmit} width="800px">
                <ReCAPTCHA
                    ref={recaptchaRef}
                    size="invisible"
                    sitekey={PUBLIC_SITEKEY}
                    onChange={onReCAPTCHAChange}
                />
                <FormControl isRequired width="800px">
                    <FormLabel> Email Address </FormLabel>
                    <Input 
                        placeholder="test@test.com"
                        type='email' 
                        size='lg'
                        onChange={event => setEmail(event.currentTarget.value)}
                    />


                    <FormHelperText> You will get an email to make an account, check your spam folder </FormHelperText>


                </FormControl>

                <Flex flexDir="row">
                    <Spacer />
                    <Button my={4} colorScheme="teal" type="submit" variant="outline"> Sign Up </Button>
                </Flex>
            </form>

        </>
    )
}
