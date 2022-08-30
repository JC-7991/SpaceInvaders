export default class Player{

    constructor(canvas, velocity){

        this.canvas = canvas;
        this.velocity = velocity;

        this.x = this.canvas.width / 2;
        this.y = this.canvas.height - 75;

        this.width = 50;
        this.height = 48;

    }
    
}