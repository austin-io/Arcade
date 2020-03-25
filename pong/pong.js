let canvas;
let ctx;
let player;
let npc;
let score;

var primaryColor = "#FA498A";

class Ball {
  constructor(){
    this.reset();
    this.radius = canvas.width / (16 * 8);
  }

  reset(){
    this.x = canvas.width  / 2;
    this.y = canvas.height / 2;
    this.getAngle();
  }

  getAngle(){
    this.angle = Math.floor(Math.random() * 360);
    this.dx = Math.cos(this.angle) * 5;
    this.dy = Math.sin(this.angle) * 5;
  }

  draw(){
    ctx.fillStyle = primaryColor;
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.radius, this.radius, 0, 0, 2*Math.PI);
    ctx.fill();
  }

  update(){

    this.dx *= 1.001;
    this.dy *= 1.001;

    this.x += this.dx;
    this.y += this.dy;

    if(this.x > canvas.width){
      this.dx = -this.dx;
      
      // Check if NPC missed the ball 
      if(this.y < npc.y || this.y > npc.y + npc.h){
        player.score += 1;
        score.innerText = "Player Score: "+ player.score +" | NPC Score: " + npc.score;
        this.reset();
      }
    }

    if(this.x < 0){
      this.dx = -this.dx;
      
      // Check if Player missed the ball
      if(this.y < player.y || this.y > player.y + player.h){
        npc.score += 1;
        score.innerText = "Player Score: "+ player.score +" | NPC Score: " + npc.score;
        this.reset();
      }
    }
    
    if(this.y > canvas.height || this.y < 0){
      this.dy = -this.dy;
    }
  }
};

class Paddle {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.score = 0;
    this.w = canvas.width / (16 * 4);
    this.h = canvas.height / 9 * 2;
  }

  draw(){
    ctx.fillStyle = primaryColor;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  npcUpdate(){
    var speed = 3;
    if(ball.y > (this.y + this.h / 2)){
      this.y += speed;
    }
    if(ball.y < (this.y + this.h / 2)){
      this.y -= speed;
    }
  }
};

window.onload = () => {
  score = document.querySelector("p");
  canvas = document.querySelector("canvas");
  ctx = canvas.getContext("2d");
  
  canvas.style.backgroundColor = "#F2F5A9";
  canvas.height = canvas.width * 9/16;

  // Handle User Input
  addEventListener("keydown", callback);
  addEventListener("mousemove", mouseCallback);
  
  // Create and Initialize objects
  player = new Paddle(0, 0);
  npc = new Paddle(canvas.width - canvas.width / (16 * 4), 0);
  ball = new Ball();
  
  // Set update loop
  setInterval(update, 1000/30);
}

window.onresize = () => {
  // Keep a 16:9 aspect ratio
  canvas.height = canvas.width * 9/16;
  player.w = canvas.width / (16 * 4);
  player.h = canvas.height / 9 * 2;
}

const mouseCallback = (e) => {
  var rect = canvas.getBoundingClientRect();
  var scale = canvas.height / rect.height;
  player.y = ((e.clientY - rect.top) * scale) - player.h / 2;
};

const callback = (e) => {
  switch(e.keyCode){
    case 38: // UP
      player.y -= player.y > 0 ? 15 : 0;
      break;
    case 40: // DOWN
      player.y += player.y + player.h < canvas.height ? 15 : 0;
      break;
  }
}

const update = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ball.update();
  npc.npcUpdate();

  drawScene();

  player.draw();
  npc.draw();
  ball.draw();
}

const drawScene = () => {
  ctx.fillStyle = "#fff";
  ctx.fillRect(
    (canvas.width / 2) - 3, 0, 6,
    canvas.height
  );
};