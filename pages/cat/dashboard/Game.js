import React, { useEffect, useState } from 'react';
import { Player } from './Player';

function App(props){
    let canvas;
    let ctx;
    let section = 0;

    const fishes = [
        {
            name: 'Lochness Monster',
            image: '/lochness_monster.png',
            fishWidth : 400,
            fishLength : 400,
            fishShadowSize : 30,
            fishX : 0,
            fishY : 0,
            fishSpeed : 1 / 10,
            setMaxFishDepth : 6000,
            depthRatio: 7/10,
            fishToShadowRatio: 1/25,
            fishMaxIdleTime: 30,
            fishSink: 1,
            amount: 1,
        },
        {
            name: 'He Lives in a Pineapple',
            image: '/sponge.png',
            fishWidth : 300,
            fishLength : 225,
            fishShadowSize : 30,
            fishX : 0,
            fishY : 0,
            fishSpeed : 1 / 30,
            setMaxFishDepth : 5000,
            depthRatio: 7/10,
            fishToShadowRatio: 1/100,
            fishMaxIdleTime: 30,
            fishSink: 1,
            amount: 4,
        },
        {
            name: 'Omega Fish',
            image: '/omega_fish.png',
            fishWidth : 400,
            fishLength : 400,
            fishShadowSize : 30,
            fishX : 0,
            fishY : 0,
            fishSpeed : 1 / 8,
            setMaxFishDepth : 5000,
            depthRatio: 7/10,
            fishToShadowRatio: 1/20,
            fishMaxIdleTime: 30,
            fishSink: 1.5,
            amount: 1,
        },
        {
            name: 'Mermaid',
            image: '/mermaid.png',
            fishWidth : 300,
            fishLength : 400,
            fishShadowSize : 30,
            fishX : 0,
            fishY : 0,
            fishSpeed : 1 / 10,
            setMaxFishDepth : 3400,
            depthRatio: 7/10,
            fishToShadowRatio: 1/30,
            fishMaxIdleTime: 20,
            fishSink: 1.3,
            amount: 2,
        },
        {
            name: 'Whale',
            image: '/whale.png',
            fishWidth : 600,
            fishLength : 200,
            fishShadowSize : 30,
            fishX : 0,
            fishY : 0,
            fishSpeed : 1 / 15,
            setMaxFishDepth : 5000,
            depthRatio: 7/10,
            fishToShadowRatio: 1/5,
            fishMaxIdleTime: 60,
            fishSink: 2.2,
            amount: 3,
        },
        {
            name: 'Dennis Fish',
            image: '/dennis_fish.png',
            fishWidth : 300,
            fishLength : 150,
            fishShadowSize : 30,
            fishX : 0,
            fishY : 0,
            fishSpeed : 1 / 10,
            setMaxFishDepth : 3000,
            depthRatio: 7/10,
            fishToShadowRatio: 1/20,
            fishMaxIdleTime: 60,
            fishSink: 2,
            amount: 20,
        },
        {
            name: 'smallmouth bass',
            image: '/smallmouth_bass.png',
            fishWidth : 150,
            fishLength : 150,
            fishShadowSize : 30,
            fishX : 0,
            fishY : 0,
            fishSpeed : 1 / 30,
            setMaxFishDepth : 1800,
            depthRatio: 7/10,
            fishToShadowRatio: 1/80,
            fishMaxIdleTime: 30,
            fishSink: 1,
            amount: 50,
        },
        {
            name: 'largemouth bass',
            image: '/largemouth_bass.png',
            fishWidth : 150,
            fishLength : 150,
            fishShadowSize : 60,
            fishX : 0,
            fishY : 0,
            fishSpeed : 1 / 30,
            setMaxFishDepth : 1800,
            depthRatio: 5/10,
            fishToShadowRatio: 1/20,
            fishMaxIdleTime: 30,
            fishSink: 1,
            amount: 50,
        },
        {
            name: 'salmon',
            image: '/salmon.png',
            fishWidth : 150,
            fishLength : 150,
            fishShadowSize : 40,
            fishX : 0,
            fishY : 0,
            fishSpeed : 1 / 30,
            setMaxFishDepth : 2000,
            depthRatio: 5/10,
            fishToShadowRatio: 1/40,
            fishMaxIdleTime: 30,
            fishSink: 1,
            amount: 180,
        },
        {
            name: 'carp',
            image: '/carp.png',
            fishWidth : 150,
            fishLength : 150,
            fishShadowSize : 30,
            fishX : 0,
            fishY : 0,
            fishSpeed : 1 / 30,
            setMaxFishDepth : 1100,
            depthRatio: 5/10,
            fishToShadowRatio: 1/40,
            fishMaxIdleTime: 30,
            fishSink: 1,
            amount: 110,
        },
        {
            name: 'pike',
            image: '/pike.png',
            fishWidth : 150,
            fishLength : 150,
            fishShadowSize : 30,
            fishX : 0,
            fishY : 0,
            fishSpeed : 1 / 40,
            setMaxFishDepth : 1500,
            depthRatio: 7/10,
            fishToShadowRatio: 1/40,
            fishMaxIdleTime: 30,
            fishSink: 1,
            amount: 90,
        },
        {
            name: 'octopus',
            image: '/octopus.png',
            fishWidth : 320,
            fishLength : 320,
            fishShadowSize : 100,
            fishX : 0,
            fishY : 0,
            fishSpeed : 1 / 10,
            setMaxFishDepth : 4500,
            depthRatio: 7/10,
            fishToShadowRatio: 1/10,
            fishMaxIdleTime: 30,
            fishSink: 2,
            amount: 20,
        },
        {
            name: 'herring',
            image: '/herring.png',
            fishWidth : 150,
            fishLength : 150,
            fishShadowSize : 30,
            fishX : 0,
            fishY : 0,
            fishSpeed : 1 / 35,
            setMaxFishDepth : 1000,
            depthRatio: 7/10,
            fishToShadowRatio: 1/45,
            fishMaxIdleTime: 30,
            fishSink: 1,
            amount: 90
        },
        {
            name: 'squid',
            image: '/squid.png',
            fishWidth : 320,
            fishLength : 320,
            fishShadowSize : 30,
            fishX : 0,
            fishY : 0,
            fishSpeed : 1 / 15,
            setMaxFishDepth : 4000,
            depthRatio: 7/10,
            fishToShadowRatio: 1/15,
            fishMaxIdleTime: 30,
            fishSink: 1,
            amount: 25
        },
        {
            name: 'red snapper',
            image: '/red_snapper.png',
            fishWidth : 150,
            fishLength : 150,
            fishShadowSize : 30,
            fishX : 0,
            fishY : 0,
            fishSpeed : 1 / 30,
            setMaxFishDepth : 500,
            depthRatio: 7/10,
            fishToShadowRatio: 1/60,
            fishMaxIdleTime: 30,
            fishSink: 1,
            amount: 100
        },
        {
            name: 'rainbow trout',
            image: '/rainbow_trout.png',
            fishWidth : 150,
            fishLength : 150,
            fishShadowSize : 30,
            fishX : 0,
            fishY : 0,
            fishSpeed : 1 / 50,
            setMaxFishDepth : 1000,
            depthRatio: 7/10,
            fishToShadowRatio: 1/50,
            fishMaxIdleTime: 30,
            fishSink: 1,
            amount: 100
        },
        {
            name: 'albacore',
            image: '/albacore.png',
            fishWidth : 150,
            fishLength : 150,
            fishShadowSize : 30,
            fishX : 0,
            fishY : 0,
            fishSpeed : 1 / 50,
            setMaxFishDepth : 1000,
            depthRatio: 7/10,
            fishToShadowRatio: 1/50,
            fishMaxIdleTime: 30,
            fishSink: 1,
            amount: 100
        }
    ]

    const fishType = {
        name: 'rainbow trout',
        image: '/rainbow_trout.png',
        fishWidth : 150,
        fishLength : 150,
        fishShadowSize : 30,
        fishX : 0,
        fishY : 0,
        fishSpeed : 1 / 50,
        setMaxFishDepth : 1000,
        depthRatio: 7/10,
        fishToShadowRatio: 1/50,
        fishMaxIdleTime: 30

    }

    const otherFish = {
        name: 'albacore',
        image: '/albacore.png',
        fishWidth : 150,
        fishLength : 150,
        fishShadowSize : 30,
        fishX : 0,
        fishY : 0,
        fishSpeed : 1 / 50,
        setMaxFishDepth : 1000,
        depthRatio: 7/10,
        fishToShadowRatio: 1/50,
        fishMaxIdleTime: 30
    }

    const [fish, setFish] = useState(0);

    const trout = {
        minSize : 30,
        maxSize : 50,
        movement: [
            
        ]
    }

    const player = new Player(400, 150);

    useEffect(() => {
        canvas = document.getElementById("myCanvas");

        // console.log("real", props.p);

        setInterval(() =>{
            // console.log(section);

            ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, 800, 600);

            player.update(fishes);

            player.draw(ctx);


        }, 1000/30);

    }, [player]);

    return(
        <div
            style={{display: 'flex', justifyContent:'center', alignItems:'center', height:'100%', flexDirection: 'row'
        }}
        >

            <canvas id="myCanvas" width="800" height="600" style={{backgroundSize:"cover", border:'2px solid #ffffff', marginTop:'48px'}} />

        </div>
    );
}

export default App;