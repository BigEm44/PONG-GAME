//creating canas
const canvas = document.querySelector(".pong");
const ctx = canvas.getContext("2d");

const cvs = {
  w: 600,
  h: 400
};

class Rect {
  constructor(x, y, w, h, color) {
    (this.x = x),
      (this.y = y),
      (this.w = w),
      (this.h = h),
      (this.color = color),
      (ctx.fillStyle = this.color);
    ctx.fillRect(this.x, this.y, this.w, this.h, this.color);
  }

  drawNet() {
    for (let i = 0; i <= cvs.h; i += 15) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y + i, this.w, this.h, this.color);
    }
  }
}

const drawScore = (color,text,x,y) => {
  ctx.fillStyle = color;
  ctx.font = "35px Arial, sans-serif";
  ctx.fillText(text,x,y);
}


const player = {
  x: 0,
  y: cvs.h / 2 - 50,
  w: 10,
  h: 100,
  score: 0
};

const com = {
  x: cvs.w - 10,
  y: cvs.h / 2 - 50,
  w: 10,
  h: 100,
  score: 0
};

const ball = {
  x: (cvs.w / 2) - 8,
  y: cvs.h / 2,
  w: 16,
  h: 16,
  velocityX: 4,
  velocityY: 4,
  speed: 4
};



//render game elements on the canvas
const render = () => {
  //draw the canvas background
  new Rect(0, 0, cvs.w, cvs.h, "black");
  
  //drawText
  drawScore("white",player.score,cvs.w/4,cvs.h/5);
  drawScore("white",com.score,3*cvs.w/4,cvs.h/5);

  //draw player padlle
  new Rect(player.x, player.y, player.w, player.h, "white");

  //draw computer paddle
  new Rect(com.x, com.y, com.w, com.h, "white");

  //draw the ball
  new Rect(ball.x, ball.y, ball.w, ball.h, "white");

  //draw net
  const net = new Rect(cvs.w / 2 - 1, 0, 2, 10, "white");
  net.drawNet();

};

// paddel control
let canvasPosition = canvas.getBoundingClientRect();

canvas.addEventListener("mousemove", (e) => {
  player.y = e.clientY - canvasPosition.top - player.h / 2;
});

//detecting collision function
function collision(b, p){
    
    b.top = b.y;
    b.bottom = b.y;
    b.right = b.x + b.w;
    b.left = b.x;
    
    p.top = p.y;
    p.bottom = p.y + p.h;
    p.right = p.x + p.w;
    p.left = p.x;
  
      return (
        b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom
          )
  };

  //reset the Ball
const resetBall = () => {
  ball.x = (cvs.w / 2) - 8;
  ball.y =  cvs.h / 2;

  ball.speed = 4,
  ball.velocityX = -ball.velocityX
}

//game logic and action
const update = () => {
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  //collision with walls
  if (ball.y + ball.h >= cvs.h || ball.y <= 0) {
    ball.velocityY = -ball.velocityY;
  }

  //AI - computer paddle control
  com.y += (ball.y - (com.y + com.h/2)) * 0.1;

  //checking which player(player/com)
  let whichPlayer = ball.x < cvs.w/2 ? player:com

  //collisions with paddels
  if(collision(ball,whichPlayer)){

    //ball hit the center of the padell 
    let collisionPoint = (ball.y -(whichPlayer.y + whichPlayer.h/2))
    //collisionPoint divided by player.h/2 to receive numbers beetwen -1 and 1
    collisionPoint = collisionPoint/ (whichPlayer.h/2)
    //calculate the angle
    let angleRadian = (Math.PI * collisionPoint)/4;

    let direction = (ball.x < cvs.w/2) ? 1 : -1

    ball.velocityX = direction * ball.speed * Math.cos(angleRadian)
    ball.velocityY = ball.speed * Math.sin(angleRadian)

    ball.speed += 0.3
  }
 
  //update score
  if(ball.x < 0){
    com.score++
    resetBall()
  }else if (ball.x > cvs.w){
    player.score++
    resetBall()
 }

};

 

const game = () => {
  render();
  update();
};

const fps = 50;
setInterval(game, 1000 / fps);
