const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let speed = 0;
let speed2 = 0;

function obstacles(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

class Game {

// ELEMENTS:

    constructor(ctx){
        this.ctx = ctx;
        this.intervalId = null;
        this.frames = 0;
        this.currentTime = 0;
        this.seconds = 0;
        this.ghost = null;
        this.camera = null;
        this.bgImg = new Image();
        this.bgImg.onload = () => {
            this.drawBackground()
        }
        this.bgImg.src = "docs/assets/images/backgroundCanvas.jpeg"
    }
    
    update = () => {
        this.frames++
        this.clear();
        this.drawBackground()
        this.moveObstacle();
        this.ghost.moveGhost();
        this.ghost.draw()
        this.checkGameOver();
        this.camera.draw();
        this.chronometer();
        this.score();
    }

    drawBackground(){
        this.ctx.drawImage(this.bgImg, 0, 0, 1000, 600)
    }
  
    chronometer() {
        this.seconds = Math.floor(this.frames / 60);
        this.ctx.font = '15px monospace';
        this.ctx.fillStyle = 'white'; 
        this.ctx.fillText(`Time: 00:${this.seconds}`, 750, 50);
    }

    score(){
        const points = Math.floor(this.frames / 20);
        this.ctx.font = '15px monospace';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`Score: ${points}`, 750, 70);
    }  

// ACTION OF THE GAME:

    start(){
        this.intervalId = setInterval(this.update, 1000/60);
        this.ghost = new Ghost(0, 0, this.ctx, 'yellow')
        this.camera = new Camera(this.ctx)
        this.bgImg.src = "docs/assets/images/backgroundCanvas.jpeg"
    }
    
    takePicture = () => {
        clearInterval(this.intervalId)
        let ghost = this.ghost;
        let camera = this.camera;
        if(ghost.x > camera.x && ghost.x + ghost.w < camera.x + camera.w && ghost.y > camera.y && ghost.y + ghost.h < camera.y + camera.h){
            this.ctx.fillStyle = "white"
            this.ctx.fillRect(0, 0, 1000, 800)
        } else {
           this.bgImg.src = "docs/assets/images/gameOver.jpeg"
        }
    }

    playAgain(){
        window.location.reload();
    }
    
    clear(){
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
    }

    moveObstacle(){
        obstacles( speed % 500 + 210, speed % 300, 40, 40, 'black');
        speed += 3
    }

// AFTER GAME 

    checkGameOver(){
        if(this.seconds >= 30){
            this.clearInterval(intervalId)
        }       
}
}

let game = new Game(ctx);
game.drawBackground()

class Camera {

    constructor(ctx){
        this.x = 210;
        this.y = 100;
        this.w = 600;
        this.h = 400
        this.ctx = ctx;
    }

    draw(){
        this.ctx.strokeStyle = "#FF0000";
        this.ctx.strokeRect(210, 100, 500, 300);
    }

}

class Ghost{
    constructor(x, y, ctx, color){
        this.x = x;
        this.y = y;
        this.w = 100;
        this.h = 100;
        this.ctx = ctx;
        this.color = color;
    }

    draw(){
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.w, this.h)
    }

    moveGhost(){
        this.x = speed2 % 1000 + 210
        this.y = speed2 % 600
        speed2 +=20
    }
}