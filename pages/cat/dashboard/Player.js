export class Player{
    score = 0;
    speed = 125;
    acceleration = 10;

    constructor(posX, posY){
        this.posX = posX;
        this.posY = posY;
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
        }
    }

    draw = (ctx) => {

        const image = new Image();
        image.src = '/star.png';

        ctx.drawImage(image, this.posX, this.posY, 30, 30);

    }
}

export default Player;