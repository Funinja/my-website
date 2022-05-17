import React, { useEffect, useState } from 'react';
import { Player } from './Player';

function App(props){
    let canvas;
    let ctx;
    let section = 0;
    const fishType = {
        name: 'trout',
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

            player.update(fishType);

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