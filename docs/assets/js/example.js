const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let speedCat = 0;
let speedGhost = 6;
let speedBlood = 0;
let speedEyes = 0;
let speedBirds = 0;


/* __________________________VIDEO E MUSICA____________________________________________________ */

const videoEnding = document.getElementById('video');
const myCanvas = document.getElementById('canvas');
const btns = document.getElementById('myBtn');
const restartGame = document.getElementById('retry')
/* videoEnding.autoPlay = true; */

let song = new Audio('./docs/assets/images/song/music_background.mp3');
song.loop = false;

let screamSong = new Audio('./docs/assets/images/song/scream1.mp3')
song.loop = false;

/* ___________________________________________________________________________________________ */

/* __________________________INSTRUCTIONS AND CONTEXT_________________________________________ */

document.getElementById('info-btn').onclick = () => {
    let instructions = document.getElementById('instructions')
    instructions.classList.toggle('hidden')
}

document.getElementById('ctx-btn').onclick = () => {
    let instructions = document.getElementById('information')
    instructions.classList.toggle('hidden')
}


/* ___________________________________________________________________________________________ */

/* __________________________ELEMENTS: CAMERA ________________________________________________ */

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

/* ___________________________________________________________________________________________ */

/* __________________________ELEMENTS: OBSTACLES______________________________________________ */

class Cat {

    constructor(x, y, ctx){
        this.x = x;
        this.y = y;
        this.w = 80;
        this.h = 80;
        this.ctx = ctx;
        this.img = new Image()
        this.img.src = "./docs/assets/images/scaryCat-removebg-preview.png"

    }

    draw(){
        this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)     
    }

    moveCat(){
        this.x = speedCat % 600
        this.y = speedCat % 500
        speedCat +=10
    }
}

class Blood {

    constructor(x, y, ctx){
        this.x = x;
        this.y = y;
        this.w = 90;
        this.h = 90;
        this.ctx = ctx;
        this.img = new Image()
        this.img.src = "./docs/assets/images/blood-removebg-preview.png"

    }

    draw(){
        this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)     
    }

    moveBlood(){
        this.x = speedBlood % 600
        this.y = speedBlood % 500
        speedBlood +=2
    }
}

class Eyes {

    constructor(x, y, ctx){
        this.x = x;
        this.y = y;
        this.w = 100;
        this.h = 100;
        this.ctx = ctx;
        this.img = new Image()
        this.img.src = "./docs/assets/images/eyes-removebg-preview.png"

    }

    draw(){
        this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)     
    }

    moveEyes(){
        this.x = speedEyes % 900
        this.y = speedEyes % 500
        speedEyes +=4
    }
}


class Birds {

    constructor(x, y, ctx){
        this.x = x;
        this.y = y;
        this.w = 300;
        this.h = 300;
        this.ctx = ctx;
        this.img = new Image()
        this.img.src = "./docs/assets/images/birds-removebg-preview.png"

    }

    draw(){
        this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)     
    }

    moveBirds(){
        this.x = speedBirds % 900
        this.y = speedBirds % 500
        speedBirds +=8
    }
}
/* ___________________________________________________________________________________________ */

/* __________________________ELEMENTS: GHOST  ________________________________________________ */

class Ghost{
    constructor(ctx){
        this.x = Math.floor(Math.random() * 900)
        this.y = Math.floor(Math.random() * 500)
        this.w = 50;
        this.h = 50;
        this.ctx = ctx;

        this.img = new Image()
        this.img.src = "./docs/assets/images/ghost-removebg-preview.png";
  
    }

    draw(){
/*      this.ctx.src = "docs/assets/images/Project1/docs/assets/images/ghost-removebg-preview.png";
        this.ctx.drawImage(this.img,this.x, this.y, this.w, this.h) */
        this.ctx.drawImage(this.img, this.x % 900, this.y % 500, 200, 200)   
/*         this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.w, this.h) */
    }

    moveGhost(){
       /*  this.x = speedGhost % 900  */
        this.x += speedGhost 
        this.y += speedGhost
     
        /* this.y = speedGhost % 500 */
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
            this.birds = null;
            this.eyes = null;
            this.blood = null;
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
            this.birds.moveBirds();
            this.eyes.moveEyes();
            this.blood.moveBlood();
            this.cat.moveCat();
            this.ghost.moveGhost();
            this.ghost.draw()
            this.checkGameOver();
            this.camera.draw();
            this.birds.draw();
            this.eyes.draw();
            this.blood.draw();
            this.cat.draw();
            this.chronometer();
            this.score();

        } 
        
        drawBackground() {
            this.ctx.drawImage(this.bgImg, 0, 0, 900, 500)
        }  
      
        chronometer() {
            this.seconds = Math.floor(this.frames / 60)

            let secondsToPrint = Math.floor(this.frames / 60)
                  if(this.seconds < 10){
                    secondsToPrint = `0${this.seconds}`
                } 
            this.ctx.font = '15px monospace';
            this.ctx.fillStyle = 'white'; 
            this.ctx.fillText(`Time: 00:${secondsToPrint}`, 750, 105);
        }
    
        score(){
            let points = (100 - Math.floor(this.frames / 29));
            this.ctx.font = '15px monospace';
            this.ctx.fillStyle = 'white';
            this.ctx.fillText(`Score: ${points}`, 750, 90);
        }  


    // ACTION OF THE GAME:
    
        start(){
            this.intervalId = setInterval(this.update, 1000/60);
            this.ghost = new Ghost(this.ctx)
            this.camera = new Camera(this.ctx)
            this.birds = new Birds(0,0,this.ctx);
            this.eyes = new Eyes(0,0,this.ctx);
            this.blood = new Blood(0,0,this.ctx);
            this.cat = new Cat(0, 0,this.ctx)
            song.play();
            this.frames++
            this.score();
            this.chronometer();
            
        }
        
        takePicture = () => {
            clearInterval(this.intervalId)
            let ghost = this.ghost;
            let camera = this.camera;
            if(ghost.x % 900 > camera.x && ghost.x % 900 + ghost.w < camera.x + camera.w && ghost.y % 500> camera.y && ghost.y % 500 + ghost.h < camera.y + camera.h){
               restartGame.classList.remove('hidden');
                myCanvas.classList.add('hidden');
                btns.classList.add('hidden');
                videoEnding.classList.remove('hidden');
               videoEnding.load();
            } else {
                this.ctx.drawImage(this.girl, 0, 0, 900, 500)
                screamSong.play();
            }
        }
    
        playAgain(){
            window.location.reload();
            btns.classList.remove('hidden');
            this.start();
        }
        
        clear(){
            ctx.clearRect(0, 0, canvas.width, canvas.height); 
        }
    
        checkGameOver(){
            if(this.seconds >= 45){
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