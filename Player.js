export default class Player{

    constructor(canvas, velocity){

        this.canvas = canvas;
        this.velocity = velocity;

        this.x = this.canvas.width / 2;
        this.y = this.canvas.height - 75;

        this.width = 50;
        this.height = 48;

        this.image = new Image();
        this.image.src = "images/player.png";

    }

    draw(ctx){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

}