//creating canas
const canvas = document.querySelector(".pong");
const ctx = canvas.getContext('2d');

const cvs = {
    w: 600,
    h: 400
}


class Rect {
    constructor(x,y,w,h,color){
        this.x = x,
        this.y = y,
        this.w = w,
        this.h = h,
        this.color = color,
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.w,this.h,this.color)

        }

        drawNet(){
            for(let i = 0; i<=cvs.h; i+= 15){
                ctx.fillStyle = this.color
                ctx.fillRect(this.x,this.y + i,this.w,this.h,this.color)
            }
        }

}

const player = {
    x: 0,
    y: cvs.h/2 -50,
    w: 10,
    h: 100,
}

const com = {
    x: cvs.w -10,
    y: cvs.h/2 -50,
    w: 10,
    h: 100
}

const ball = {
    x: cvs.w/2 - 8,
    y: cvs.h/2,
    w: 16,
    h: 16,
    velocityX: 3,
    velocityY: 3,
    speed: 3
}


//render game elements on the canvas
const render = ()=>{
    //draw the canvas background
    new Rect(0,0,cvs.w,cvs.h,"black");
    
    //draw player padlle
    new Rect(player.x,player.y,player.w,player.h,"white");

    //draw computer paddle
    new Rect(com.x,com.y,com.w,com.h,"white");

    //draw the ball
    new Rect(ball.x,ball.y,ball.w,ball.h,"white")

    //draw net
    const net = new Rect(cvs.w/2-1,0,2,10,"white")
    net.drawNet()
}


//game logic and action
const update = () => {
    ball.x += ball.velocityX
    ball.y += ball.velocityY

    //collision with walls
    if(ball.y+ball.h >= cvs.h || ball.y <= 0) {
        ball.velocityY = -ball.velocityY
    }else if(ball.x + ball.h >= cvs.w || ball.x<=0){
        ball.velocityX = -ball.velocityX
    }

}

// control the paddel
let canvasPosition = canvas.getBoundingClientRect();

canvas.addEventListener("mousemove",(e)=>{

   player.y = e.clientY - canvasPosition.top - player.h/2

})


let game = () => {
    render()
    update()
}

let fps = 50
setInterval(game,1000/fps);