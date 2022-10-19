const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');



/* 
 class Song{
    play(){
let song = new Audio('./docs/assets/images/song/music_background.mp3');
song.loop = false;

let screamSong = new Audio('./docs/assets/images/song/scream1.mp3')
song.loop = false;
    }



}
 */
let speed = 0;
let speed2 = 0;

function obstacles(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

const videoEnding = document.getElementById('video');
const myCanvas = document.getElementById('canvas');
const btns = document.getElementById('myBtn');
const restartGame = document.getElementById('retry')
videoEnding.autoPlay = true;

let song = new Audio('./docs/assets/images/song/music_background.mp3');
song.loop = false;

let screamSong = new Audio('./docs/assets/images/song/scream1.mp3')
song.loop = false;

class Camera {

    constructor(ctx){
        this.x = 310;
        this.y = 95;
        this.w = 300;
        this.h = 300;
        this.ctx = ctx;

        const nikon = new Image();
        nikon.addEventListener("load", () => {
            this.nikon = nikon;
            this.draw();
        });
        nikon.src = "./docs/assets/images/camera-removebg-preview.png";
        
    }

    draw(){
        this.ctx.drawImage(this.nikon, 310, 95, 300, 300)     
        /* this.ctx.strokeStyle = "#FF0000";
        this.ctx.strokeRect(210, 100, 500, 300); */
    }

}

class Ghost{
    constructor(x, y, ctx, color){
        this.x = x;
        this.y = y;
        this.w = 50;
        this.h = 50;
        this.ctx = ctx;
        /* TEM QUE TIRAR A COLOR */
        this.color = color;

        const fantasma = new Image();
        fantasma.addEventListener("load", () => {
            this.fantasma = fantasma;
            this.draw();
        });
        fantasma.src = "./docs/assets/images/ghost-removebg-preview.png";
    }

    draw(){
/*      this.ctx.src = "docs/assets/images/Project1/docs/assets/images/ghost-removebg-preview.png";
        this.ctx.drawImage(this.img,this.x, this.y, this.w, this.h) */
        this.ctx.drawImage(this.fantasma, this.x, this.y, 200, 200)   
/*         this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.w, this.h) */
    }

    moveGhost(){
        this.x = speed2 % 900
        this.y = speed2 % 500
        speed2 +=10
    }
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
            const bgImg = new Image();
            bgImg.addEventListener("load", () => {
                this.bgImg = bgImg;
                this.drawBackground();
            });
            bgImg.src = "./docs/assets/images/backgroundCanvas.jpeg";
    
            const girl = new Image();
            girl.addEventListener("load", () => {
                this.girl = girl;
                this.takePicture();
            });
            girl.src = "./docs/assets/images/gameOver.jpeg";
    
            /* let song = new Audio('./docs/assets/images/music_background.mp3');
            song.addEventListener("load", () => {
            song.loop = true;
            }); */
        }
    
        update = () => {
            myCanvas.classList.remove('hidden');
            restartGame.classList.add('hidden');
            /* btns.classList.remove('hidden'); */
            videoEnding.classList.add('hidden');
            this.frames++
            this.clear();
            this.drawBackground();
            this.moveObstacle();
            this.ghost.moveGhost();
            this.ghost.draw()
            this.checkGameOver();
            this.camera.draw();
            this.chronometer();
            this.score();
        } 
        
        drawBackground() {
            this.ctx.drawImage(this.bgImg, 0, 0, 1000, 600)
        }  
      
        chronometer() {
            this.seconds = Math.floor(this.frames / 60)
    /*             if(seconds < 10){
                    return `0${seconds}`
                } */
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
            song.play();
            
        }
        
        takePicture = () => {
            clearInterval(this.intervalId)
            let ghost = this.ghost;
            let camera = this.camera;
            if(ghost.x > camera.x && ghost.x + ghost.w < camera.x + camera.w && ghost.y > camera.y && ghost.y + ghost.h < camera.y + camera.h){
               /*  VIDEO */
               videoEnding.classList.remove('hidden');
               videoEnding.load();
               restartGame.classList.remove('hidden');
                myCanvas.classList.add('hidden');
                btns.classList.add('hidden');
            } else {
                this.ctx.drawImage(this.girl, 0, 0, 900, 500)
                screamSong.play();
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