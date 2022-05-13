import React, { useEffect } from 'react';
import { Player } from './Player';

function App(){
    let canvas;
    let ctx;

    const player = new Player(400, 150);

    useEffect(() => {
        canvas = document.getElementById("myCanvas");

        

        setInterval(() =>{

            ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, 800, 600);

            player.update();
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