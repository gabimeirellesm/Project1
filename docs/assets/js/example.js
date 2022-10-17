const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let speed = 0;
let speed2 = 0;

function ghost(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

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
    }
    
    update = () => {
        this.frames++
        this.clear();
        this.moveObstacle();
        this.moveGhost();
        /* this.time(); */
        this.checkGameOver();
        this.camera();
        this.chronometer();
        this.score();
    }

    camera(){
        ctx.strokeStyle = "#FF0000";
        ctx.strokeRect(210, 100, 600, 400);
    }

    /* getMinutes() {
        if (this.currentTime<10){
            return `0${Math.floor(this.currentTime / 60)}`;
        } else {
            return Math.floor(this.currentTime / 60);
        }
      }
    
    getSeconds() {
        if (this.currentTime<10){
            return `0${Math.floor(this.currentTime % 60)}`;
        } else {
            return Math.floor(this.currentTime % 60);
        }
      } */
    
    chronometer() {
        const minutes = Math.floor(this.frames / 240);
        const seconds = Math.floor(this.frames / 10);
        this.ctx.font = '22px monospace';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(`Time: ${minutes}:${seconds}`, 50, 50);
    }

    score(){
        const points = Math.floor(this.frames / 20);
        this.ctx.font = '22px monospace';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(`Score: ${points}`, 800, 70);
    }  

// ACTION OF THE GAME:

    start(){
        this.intervalId = setInterval(this.update, 1000/60);
    }
    
    takePicture = () => {
        clearInterval(this.intervalId)
    }

    playAgain(){
        window.location.reload();
    }
    
    clear(){
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
    }

    moveObstacle(){
        obstacles( speed % 600 + 210, speed % 400, 40, 40, 'black');
        speed += 3
    }

    moveGhost(){
        ghost( speed2 % 1000 + 210, speed2 % 600, 100, 100, 'yellow');
        speed2 +=10
    }
    
    /* time(){
        const points = Math.floor(this.frames / 30);
        this.ctx.font = '22px monospace';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(`Time: 00:${points}`, 800, 50);
    }      */

// AFTER GAME 

    checkGameOver(){
        /* 
            1) GAME OVER
            - se time = 30
            - se moveGhost !== camera 
         */   

        if (this.moveGhost){
            console.log('win')
        } else {
            console.log('lost')
        }
    }

}

let game = new Game(ctx);