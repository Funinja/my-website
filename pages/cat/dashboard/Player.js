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
    r = 255;
    g = 255;
    b = 255;
    lineRadius = 8;

    constructor(posX, posY){

        this.posX = posX;
        this.posY = posY;

        this.bobberX = posX;
        this.bobberY = posY + 175;
    }

    update = () => {
        document.onkeydown = (e) => {
            console.log(e.key);
            if(e.key === 'd' && this.posX < 650){
                this.posX += this.speed;
            }
            if(e.key === 'a' && this.posX > 150){
                this.posX -= this.speed;
            }
            if(e.key === ' '){
                this.lineRadius -= 1;
            }
        }

        this.bobberX += (this.posX - this.bobberX)/10;
    }

    draw = (ctx) => {

        const image = new Image();
        image.src = '/star.png';

        const bobber = new Image();
        bobber.src = '/bomb.png';

        ctx.beginPath();
        ctx.lineWidth = this.lineRadius;
        ctx.strokeStyle = rgbToHex(this.r, Math.floor(this.lineRadius * 255/8), Math.floor(this.lineRadius * 255/8));
        ctx.moveTo(this.posX + 15, this.posY + 15);
        ctx.lineTo(this.bobberX + 15, this.bobberY + 15);
        ctx.stroke();

        ctx.drawImage(image, this.posX, this.posY, 30, 30);
        ctx.drawImage(bobber, this.bobberX, this.bobberY, 30, 30);

    }
}

export default Player;