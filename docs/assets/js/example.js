const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let speedCat = 0;
let speedGhost = 0;

/* __________________________VIDEO E MUSICA____________________________________________________ */

const videoEnding = document.getElementById('video');
const myCanvas = document.getElementById('canvas');
const btns = document.getElementById('myBtn');
const restartGame = document.getElementById('retry')
videoEnding.autoPlay = true;

let song = new Audio('./docs/assets/images/song/music_background.mp3');
song.loop = false;

let screamSong = new Audio('./docs/assets/images/song/scream1.mp3')
song.loop = false;

/* ___________________________________________________________________________________________ */



/* __________________________ELEMENTS: CAMERA, CAT AND GHOST__________________________________ */

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
    }

}

class Cat {

    constructor(x, y, ctx){
        this.x = x;
        this.y = y;
        this.w = 50;
        this.h = 50;
        this.ctx = ctx;

        const darkCat = new Image();
        darkCat.addEventListener("load", () => {
            this.darkCat = darkCat;
            this.draw();
        });
        darkCat.src = "./docs/assets/images/scaryCat-removebg-preview.png";
        
    }

    draw(){
        this.ctx.drawImage(this.fantasma, this.x, this.y, 200, 200)     
    }

    moveObstacle(){
        this.x = speedCat % 900
        this.y = speedCat % 500
        speedCat +=5
    }
}

class Ghost{
    constructor(x, y, ctx){
        this.x = x;
        this.y = y;
        this.w = 50;
        this.h = 50;
        this.ctx = ctx;

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
        this.x = speedGhost % 900
        this.y = speedGhost % 500
        speedGhost +=5
    }
}

/* ___________________________________________________________________________________________ */



/* __________________________PLAY GAME________________________________________________________ */


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
            this.cat = null;
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
            this.cat.moveObstacle();
            this.ghost.moveGhost();
            this.ghost.draw()
            this.checkGameOver();
            this.camera.draw();
            this.cat.draw();
            this.chronometer();
            this.score();
        } 
        
        drawBackground() {
            this.ctx.drawImage(this.bgImg, 0, 0, 900, 500)
        }  
      
        chronometer() {
            const seconds = Math.floor(this.frames / 60)
                /*  if(seconds < 10){
                    return `0${seconds}`
                } */
            this.ctx.font = '15px monospace';
            this.ctx.fillStyle = 'white'; 
            this.ctx.fillText(`Time: 00:${this.seconds}`, 50, 50);
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
            this.cat = new Cat(this.ctx)
            song.play();
            this.frames++
            this.score();
            this.chronometer();
            
        }
        
        takePicture = () => {
            clearInterval(this.intervalId)
            let ghost = this.ghost;
            let camera = this.camera;
            if(ghost.x > camera.x && ghost.x + ghost.w < camera.x + camera.w && ghost.y > camera.y && ghost.y + ghost.h < camera.y + camera.h){
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
    
        checkGameOver(){
            if(this.seconds >= 30){
                this.ctx.drawImage(this.girl, 0, 0, 900, 500)
                screamSong.play();
                this.clearInterval(intervalId)
            }       
    }
    }

let game = new Game(ctx);
game.drawBackground()

/* ___________________________________________________________________________________________ */
/* ___________________________________________________________________________________________ */

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