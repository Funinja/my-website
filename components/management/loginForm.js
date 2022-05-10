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
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from 'next/router';

const bcrypt = require('bcryptjs');
var sha256 = require('js-sha256').sha256;

export default function Form() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const recaptchaRef = React.useRef();
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        await recaptchaRef.current.executeAsync();
    }

    const onReCAPTCHAChange = async (captchaCode) => {
        if(!captchaCode){
            return;
        }


        alert(`Captcha working ${captchaCode}`);

        if(!email || !email.includes('@') || !password){
            alert('Invalid details');
            return;
        }

        try{
            console.log("awaiting signup api");
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    email:email,
                    captcha: captchaCode,
                    password: sha256(password),
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

            window.location.href = '/cat/dashboard';


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
                    <FormHelperText> Also Username </FormHelperText>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor='password' my={2}> Password </FormLabel>
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
        </>
    );

}