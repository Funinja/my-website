import React, { useState, useEffect } from 'react';
import { Flex, Heading, Button, Box, Center } from '@chakra-ui/react';

export default function Timer()  {
    const options = ["Pomodoro", "Short Break", "Long Break"];
    const initialtimes = [1500, 300, 1800];
    let times = [1500, 300, 1800];
    let currentStage = 0;
    const [time, setTime] = useState(times[currentStage]);
    const [pause, setPause] = useState(1);

    const calculateTimeLeft = () => {
        if (pause === 1){
            setPause(0);

        }else{
            setPause(1);

        }

    }

    const convertTimeToString = (time) => {
        const hours = Math.floor(time/60);
        const seconds = time - hours * 60;
        let hours_str = hours.toString();

        if(hours_str.length < 2){
            hours_str = '0' + hours_str;
        }

        let seconds_str = seconds.toString();

        if(seconds_str.length < 2){
            seconds_str = '0' + seconds_str;
        }

        const time_alarm = hours_str + ':' + seconds_str;

        return time_alarm;
    }

    useEffect(() => {
        const id = setInterval(()=>{
            if(pause === 0){
                setTime(time - 1);
            }
            
            if (time <= 0){
                setTime(times[0]);
                setPause(1);
                console.log("Hit Zero");
                clearInterval(id);
            }
        }, 1000);
        return () => clearInterval(id);
    }, [time, pause]);

    return (
        <div className="bg-white" text-align="center">
            <Center w="800px">
                <Box
                    w='400px'
                    alignItems='center'
                    justifyContent='center'
                    backgroundColor='gray.700'
                    borderRadius="50"
                    p={4}
                >
                    <Flex 
                    w='375px'
                    alignItems='center'
                    justifyContent='center'
                    flexDirection='horizontal'
                    >
                        {options.map((option, index)=>{
                            return <Button onClick={() => {
                                // setTime(times[index]);
                            }} variant='ghost' fontSize='lg' key={index}>{option}</Button>;
                        })

                        }
                    </Flex>
                    <Center my={1} fontSize='6xl'>{convertTimeToString(time)}</Center>
                    <Center><Button fontSize='lg' my={2} onClick={() => {
                        calculateTimeLeft();
                        
                    }}> {pause === 1 ? "Start" : "Stop"} </Button></Center>
                </Box>
            </Center>

        </div>
    )
}
