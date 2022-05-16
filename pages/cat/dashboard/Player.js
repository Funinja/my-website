function componentToHex(c){
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export class Player{
    score = 0;
    speed = 125;
    acceleration = 10;
    red = rgbToHex(255, 0, 0);
    white = rgbToHex(255, 255, 255);
    blue = rgbToHex(0, 204, 255);
    blueBobber = rgbToHex(0, 102, 102);
    background = rgbToHex(26, 32, 44);
    r = 255;
    g = 255;
    b = 255;
    lineRadius = 10;
    originalRadius = this.lineRadius;
    pressed = 0;
    catch = 0;
    reeled = 1;

    //fish related information
    fishShadow = rgbToHex(14, 23, 41);
    fishShadowSize = 30; //fish properties
    fishX = 0;
    fishY = 0;
    fishDepth = 0;
    setMaxFishDepth = 1000;
    depthRatio = 7/10;
    fishToShadowRatio = 1/50;
    fishSet = 0;
    fishXDir = 0;
    fishSpeed = 0;

    //rod parameters
    pull = 5;
    rodPower = 50;
    succeed = 0;
    rodDuration = 1/4;

    constructor(posX, posY){

        this.posX = posX - 15;
        this.posY = posY - 15;

        this.bobberX = posX - 15;
        this.bobberY = posY + 190 - 15; 

        this.rodX = posX - 15;
        this.rodY = posY - 15; 

        this.counter = 0;
    }

    update = (fishType) => {

        document.onkeydown = (e) => {
            console.log(e.key);
            if(e.key === 'd' && this.posX < 600){
                this.posX += this.speed;
            }
            if(e.key === 'a' && this.posX > 150){
                this.posX -= this.speed;
            }
            if(e.key === 'f'){
                if (this.catch === 1){
                    this.catch = 0;
                }else{
                    this.catch = 1;
                    this.fishX = this.bobberX + 15;
                    this.fishY = this.bobberY + 20;
                    this.fishDepth = fishType.setMaxFishDepth * fishType.depthRatio;
                    this.fishShadowSize = fishType.fishShadowSize;
                    this.setMaxFishDepth = fishType.setMaxFishDepth;

                    this.fishSpeed = fishType.fishSpeed;
                    this.fishXDir = Math.floor(Math.random() * 501 + 150);

                }
            }
            if(e.key === ' ' && this.lineRadius - 1 !== 0){
                this.lineRadius -= this.rodDuration;
                this.counter = 0;

                if(this.catch === 1){
                    this.fishDepth = this.fishDepth - this.rodPower;
                }
            }

            if(e.key !== ' '){
                this.pressed = 1;
            }
        }
        this.counter += 1;
        this.pressed = 0;

        this.fishX += Math.floor((this.fishXDir - this.fishX) * this.fishSpeed);
        this.rodX += (this.posX - this.rodX)/10;

        if (this.catch === 1){
            this.fishShadowSize = Math.floor(this.setMaxFishDepth - this.fishDepth);
            this.fishDepth += 1;


            if(this.setMaxFishDepth - this.fishDepth <= 0){ //fish breaks rod
                this.catch = 0;
                this.succeed = -1;
            }else if(this.fishDepth <= 0) { //fish gets out of the water
                this.catch = 0;
                this.succeed = 1;
                console.log(this.succeed);
            }else if(this.lineRadius <= 1) { //rod line breaks
                this.catch = 0;
                this.succeed = -1;
                console.log(this.succeed);
            }
        }

        if(this.catch === 0){
            this.bobberX += (this.posX - this.bobberX)/50;

            // if(this.posX - 5 < this.bobberX && this.posX + 5 > this.bobberX) console.log("perfect");
        }

        if (this.counter === 150){
            this.counter = 0;
        }

        if(this.counter % 30 === 0 && this.counter !== 0 && this.lineRadius <= this.originalRadius - 1){

            this.lineRadius += 1;

        }

    }

    draw = (ctx) => {

        if(this.reeled === 1){

            if(this.catch === 1){
                ctx.beginPath(); //bobber drawing lower half
                ctx.strokeStyle = this.background;
                ctx.fillStyle = this.blueBobber;
                ctx.lineWidth = 1;
                // ctx.globalAlpha = 0.3;
                // ctx.arc(this.bobberX + 15, this.bobberY + 15, 50 , 0, Math.PI);
                ctx.ellipse(this.fishX, this.fishY, this.fishShadowSize * 2 * this.fishToShadowRatio, this.fishShadowSize * this.fishToShadowRatio, 0, Math.PI, 2 * Math.PI);
                ctx.stroke();


                var grd = ctx.createRadialGradient(this.fishX, this.fishY, 1, this.fishX, this.fishY, Math.floor(this.fishShadowSize * 5/6));
                grd.addColorStop(0, this.fishShadow);
                grd.addColorStop(1, this.background);
                ctx.fillStyle = grd;
                ctx.fill();
            }

            ctx.beginPath(); //fishing line
            ctx.lineWidth = this.lineRadius;
            ctx.strokeStyle = rgbToHex(this.r, Math.floor(this.lineRadius * 255/this.originalRadius), Math.floor(this.lineRadius * 255/this.originalRadius));
            ctx.moveTo(this.rodX + 15, this.rodY + 15);
            if(this.catch === 0){
                ctx.lineTo(this.bobberX + 15, this.bobberY + 15);
            }else if(this.catch === 1){
                ctx.lineTo(this.fishX, this.fishY + 15);
            }
            ctx.stroke();

            if (this.catch === 0){
                ctx.beginPath(); //bobber upper half
                ctx.strokeStyle = this.blueBobber;
                ctx.fillStyle = "#FFFFFF";
                ctx.lineWidth = 10;
                ctx.arc(this.bobberX + 15, this.bobberY + 15, 10, Math.PI, 2 * Math.PI);
                ctx.stroke();
                ctx.fill();

                ctx.beginPath(); //bobber drawing lower half
                ctx.strokeStyle = this.blueBobber;
                ctx.fillStyle = this.blueBobber;
                ctx.lineWidth = 10;
                ctx.arc(this.bobberX + 15, this.bobberY + 15, 10 , 0, Math.PI);
                ctx.stroke();
                ctx.fill();
            }

            ctx.beginPath(); //water
            ctx.strokeStyle = this.background;
            ctx.fillStyle = this.background;
            ctx.lineWidth = 1;
            if(this.catch === 0){
                ctx.rect(this.bobberX - 65, this.bobberY + 21, 160, 50);
            }else if(this.catch === 1){
                ctx.rect(this.fishX - 50, this.bobberY + 21, 160, 50);
            }
            ctx.stroke();
            ctx.fill();

            if(this.catch === 1){
                ctx.beginPath(); //bobber drawing lower half
                ctx.strokeStyle = this.background;
                ctx.lineWidth = 1;
                // ctx.globalAlpha = 0.3;
                // ctx.arc(this.bobberX + 15, this.bobberY + 15, 50 , 0, Math.PI);
                ctx.ellipse(this.fishX, this.fishY, this.fishShadowSize * 2 * this.fishToShadowRatio, this.fishShadowSize * this.fishToShadowRatio, 0, 0, Math.PI);
                ctx.stroke();

                var grd = ctx.createRadialGradient(this.fishX, this.fishY, 1, this.fishX, this.fishY, this.fishShadowSize * 5/6);
                grd.addColorStop(0, this.fishShadow);
                grd.addColorStop(1, this.background);
                ctx.fillStyle = grd;
                ctx.fill();
            }

            ctx.beginPath(); //fishing rod
            ctx.globalAlpha = 0.2;
            ctx.lineWidth = 18;
            ctx.strokeStyle = this.blue;
            ctx.moveTo(400, 1000);
            ctx.lineTo(this.rodX + 15, this.rodY + 15);
            ctx.stroke();

            ctx.globalAlpha = 1;
        }

    }
}

export default Player;