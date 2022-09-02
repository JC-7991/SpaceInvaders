import Enemy from "./Enemy.js";
import MovingDirection from "./MovingDirection.js";

export default class EnemyController{

    enemyMap = [
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 2, 1, 1, 1, 1, 1, 1, 2, 2],
        [2, 2, 1, 3, 3, 3, 3, 1, 2, 2],
        [2, 2, 1, 3, 3, 3, 3, 1, 2, 2],
        [2, 2, 1, 1, 1, 1, 1, 1, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    ];

    enemyRows = [];

    currentDirection = MovingDirection.right;
    xVelocity = 0;
    yVelocity = 0;

    defaultXVelocity = 1;
    defaulyYVelocity = 1;

    moveDownTimerDefault = 30;
    moveDownTimer = this.moveDownTimerDefault;
    
    fireBulletDefaultTimer = 100;
    fireBulletTimer = this.fireBulletDefaultTimer;

    constructor(canvas, enemyBulletController, playerBulletController){

        this.canvas = canvas;
        this.enemyBulletController = enemyBulletController;
        this.playerBulletController = playerBulletController;
        this.createEnemies();

    }

    draw(ctx){
        this.decrementMoveDownTimer();
        this.updateVelocityAndDirection();
        this.drawEnemies(ctx);
        this.resetMoveDownTimer();
        this.fireBullet();
    }

    fireBullet(){

        this.fireBulletTimer--;

        if(this.fireBulletTimer <= 0){

            this.fireBulletTimer = this.fireBulletDefaultTimer;
            const allEnemies = this.enemyRows.flat();
            const enemyIndex = Math.floor(Math.random() * allEnemies.length);
            const enemy = allEnemies[enemyIndex];
            this.enemyBulletController.shoot(enemy.x + enemy.width / 2, enemy.y, -3); 

        }

    }

    resetMoveDownTimer(){
        if(this.moveDownTimer <= 0){
            this.moveDownTimer = this.moveDownTimerDefault;
        }
    }

    decrementMoveDownTimer(){
        if(this.currentDirection === MovingDirection.downLeft || this.currentDirection === MovingDirection.downRight){
            this.moveDownTimer--;
        }
    }

    updateVelocityAndDirection(){

        for(const enemyRow of this.enemyRows){

            if(this.currentDirection == MovingDirection.right){

                this.xVelocity = this.defaultXVelocity;
                this.yVelocity = 0;
                const rightmostEnemy = enemyRow[enemyRow.length - 1];

                if(rightmostEnemy.x + rightmostEnemy.width >= this.canvas.width){
                    this.currentDirection = MovingDirection.downLeft;
                    break;
                }

            }
            
            else if(this.currentDirection === MovingDirection.downLeft){
                if(this.moveDown(MovingDirection.left)){
                    break;
                }
            }

            else if(this.currentDirection === MovingDirection.left){

                this.xVelocity = -this.defaultXVelocity;
                this.yVelocity = 0;
                const leftmostEnemy = enemyRow[0];

                if(leftmostEnemy.x <= 0){
                    this.currentDirection = MovingDirection.downRight;
                    break;
                }

            }

            else if(this.currentDirection === MovingDirection.downRight){
                if(this.moveDown(MovingDirection.right)){
                    break;
                }
            }

        }

    }

    moveDown(newDirection){

        this.xVelocity = 0;
        this.yVelocity = this.defaulyYVelocity;

        if(this.moveDownTimer <= 0){
            this.currentDirection = newDirection;
            return true;
        }

        return false;

    }

    drawEnemies(ctx){
        this.enemyRows.flat().forEach((enemy) => {
            enemy.move(this.xVelocity, this.yVelocity);
            enemy.draw(ctx);
        });
    }

    createEnemies(){

        this.enemyMap.forEach((row, rowIndex) => {

            this.enemyRows[rowIndex] = [];
            row.forEach((enemyNumber, enemyIndex) => {
                if(enemyNumber > 0){
                    this.enemyRows[rowIndex].push(new Enemy(enemyIndex * 50, rowIndex * 35, enemyNumber));
                }
            });

        });

    }

}