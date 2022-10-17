const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


function ghost(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function obstacles(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

let speed = 0;

let speed2 = 0;

class Game {
    constructor(ctx){
        this.ctx = ctx;
        this.intervalId = null;
        this.frames = 0;
    }
    
    start(){
        this.intervalId = setInterval(this.update, 1000/60);
    }
    
    clear(){
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
    }
    
    update = () => {
        this.frames++
        this.clear();
        this.moveSquares();

    }

    moveSquares(){

    ctx.strokeStyle = "#FF0000";
    ctx.strokeRect(210, 100, 600, 400);

    ghost( speed2 % 1000 + 210, speed2 % 600, 100, 100, 'yellow');
    obstacles( speed % 600 + 210, speed % 400, 40, 40, 'black');

    speed += 3
    speed2 +=10
    }

    takePicture = () => {
        clearInterval(this.intervalId)
    }

}

let game = new Game(ctx);