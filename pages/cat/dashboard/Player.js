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

    constructor(posX, posY){

        this.posX = posX - 15;
        this.posY = posY - 15;

        this.bobberX = posX - 15;
        this.bobberY = posY + 190 - 15;

        this.rodX = posX - 15;
        this.rodY = posY - 15; 

        this.counter = 0;
    }

    update = () => {
        this.counter += 1;
        this.pressed = 0;

        document.onkeydown = (e) => {
            console.log(e.key);
            if(e.key === 'd' && this.posX < 600){
                this.posX += this.speed;
            }
            if(e.key === 'a' && this.posX > 150){
                this.posX -= this.speed;
            }
            if(e.key === ' ' && this.lineRadius - 1 !== 0){
                this.lineRadius -= 1;
                this.counter = 0;
            }

            if(e.key !== ' '){
                this.pressed = 1;
            }
        }

        this.bobberX += (this.posX - this.bobberX)/50;
        this.rodX += (this.posX - this.rodX)/10;

        if (this.counter === 150){
            this.counter = 0;
        }

        if(this.counter % 30 === 0 && this.counter !== 0 && this.lineRadius <= this.originalRadius - 1){

            this.lineRadius += 1;

        }

    }

    draw = (ctx) => {


        ctx.beginPath();
        ctx.lineWidth = this.lineRadius;
        ctx.strokeStyle = rgbToHex(this.r, Math.floor(this.lineRadius * 255/this.originalRadius), Math.floor(this.lineRadius * 255/this.originalRadius));
        ctx.moveTo(this.rodX + 15, this.rodY + 15);
        ctx.lineTo(this.bobberX + 15, this.bobberY + 15);
        ctx.stroke();

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

        ctx.beginPath(); //water
        ctx.strokeStyle = this.background;
        ctx.fillStyle = this.background;
        ctx.lineWidth = 1;
        ctx.rect(this.bobberX, this.bobberY + 20, 30, 15);
        ctx.stroke();
        ctx.fill();

        ctx.beginPath();
        ctx.globalAlpha = 0.2;
        ctx.lineWidth = 18;
        ctx.strokeStyle = this.blue;
        ctx.moveTo(400, 1000);
        ctx.lineTo(this.rodX + 15, this.rodY + 15);
        ctx.stroke();

        ctx.globalAlpha = 1;

    }
}

export default Player;