export default class BulletController{

    bullets = [];
    timeUntilNextBulletAllowed = 0;

    constructor(canvas, maxBulletsAtATime, bulletColor, soundEnabled){

        this.canvas = canvas;
        this.maxBulletsAtATime = maxBulletsAtATime;
        this.bulletColor = bulletColor;
        this.soundEnabled = soundEnabled;

        this.shootSound = new Audio("sounds/shoot.wav");
        this.shootSound.volume = 0.5;

    }

    shoot(x, y, velocity, timeUntilNextBulletAllowed = 0){
        if(this.timeUntilNextBulletAllowed <= 0 && this.bullets.length < this.maxBulletsAtATime){
            const bullet = new Bullet(this.canvas, x, y, velocity, this.bulletColor);
        }
    }

}