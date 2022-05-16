import React, { useState, useEffect } from 'react';
import { Flex, Heading, Button, Box, Center } from '@chakra-ui/react';

export default function Timer()  {
    const options = ["Pomodoro", "Short Break", "Long Break"];
    const initialtimes = [3, 3, 3];
    let times = [1500, 300, 1800];
    const pattern = [0, 1, 0, 1, 0, 1, 2];
    var counter = 0;
    const [currentStage, setCurrentStage] = useState(0);
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
            counter += 1;
            // console.log(counter);

            if(pause === 1 && time <= 0 && counter % 30 !== 0){

                setTime(times[pattern[currentStage]]);

            }

            if(pause === 0 && counter % 30 === 0){
                console.log(pause, currentStage, time - 1);
                setTime(time - 1);
                counter = 0;

                if (time <= 0){
                    setCurrentStage(currentStage + 1);
                    setTime(0);
                    setPause(1);
                    clearInterval(id);
                }
            }

        }, 1000/30);

        return () => clearInterval(id);

    }, [currentStage, time, pause, counter]);

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
