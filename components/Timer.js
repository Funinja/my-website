import React from 'react';
import { Flex, Heading, Button, Box, Center } from '@chakra-ui/react';

export default function Timer()  {
    const options = ["Pomodoro", "Short Break", "Long Break"];
    const calculateTimeLeft = () => {
        let year = new Date();
        console.log(year);
    }
    return (
        <div className="bg-white" text-align="center">
            <Center w="800px">
                <Box
                    w='450px'
                    alignItems='center'
                    justifyContent='center'
                    backgroundColor='gray.700'
                    borderRadius="50"
                    p={4}
                >
                    <Flex 
                    w='420px'
                    alignItems='center'
                    justifyContent='center'
                    flexDirection='horizontal'
                    >
                        {options.map((option, index)=>{
                            return <Button variant='ghost' fontSize='lg' key={index}>{option}</Button>;
                        })}
                    </Flex>
                    <Center my={1} fontSize='6xl'>25:00</Center>
                    <Center><Button fontSize='lg' my={2} onClick={() => {calculateTimeLeft()}}> Start </Button></Center>
                </Box>
            </Center>

        </div>
    )
}
