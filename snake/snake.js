let canvas;
let ctx;
let snake;
let apple;

class Apple {
  constructor(){
    this.spawn();
    this.draw();
  }

  spawn() {
    this.x = Math.floor(Math.random() * 16 * 2);
    this.y = Math.floor(Math.random() * 9 * 2);
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(
      this.x * canvas.width/16/2,
      this.y * canvas.height/9/2,
      canvas.width/16/2,
      canvas.height/9/2
    );
  }
};

class Snake {
  constructor(){
    this.dx = 0;
    this.dy = -1;
    this.tail = [
      {
        x: 2*16/2,
        y: 2*8/2
    }];
  }

  draw(){
    for(var i = 0; i < this.tail.length; i++){
      ctx.fillStyle = "#00ccff";
      ctx.fillRect(
        this.tail[i].x * canvas.width/16/2,
        this.tail[i].y * canvas.height/9/2,
        canvas.width/16/2,
        canvas.height/9/2
      );
    }
  };

  update() {

    this.last = {
      x: this.tail[this.tail.length - 1].x,
      y: this.tail[this.tail.length - 1].y
    };

    for(var i = this.tail.length - 1; i > 0; i--){
      this.tail[i].x = this.tail[i-1].x;
      this.tail[i].y = this.tail[i-1].y;
    }
    
    // Update head position
    this.tail[0].x = (this.tail[0].x + this.dx) % (16*2);
    this.tail[0].y = (this.tail[0].y + this.dy) % (9*2);

    if(this.tail[0].x < 0){
      this.tail[0].x = 16*2;
    }

    if(this.tail[0].y < 0){
      this.tail[0].y = 9*2;
    }

    for(var i = 1; i < this.tail.length; i++){
      if(this.tail[i].x === this.tail[0].x && 
         this.tail[i].y === this.tail[0].y){
        // Reset snake to default state
        this.tail = [
          {
            x: 2*16/2,
            y: 2*8/2
          }
        ];
      }
    }

    if(this.tail[0].x === apple.x && this.tail[0].y == apple.y){
      apple.spawn();
      this.tail.push(this.last);
    }

  };
};

window.onload = () => {
  canvas = document.querySelector("canvas");
  ctx = canvas.getContext("2d");
  
  addEventListener("keydown", callback);
  
  canvas.style.backgroundColor = "#bbffbb";
  canvas.height = canvas.width * 9/16;
  
  // Create and Initialize Snake and Apple objects
  snake = new Snake();
  apple = new Apple();
  
  // Set update loop
  setInterval(update, 1000/15);
}

window.onresize = () => {
  // Keep a 16:9 aspect ratio
  canvas.height = canvas.width * 9/16;
}

const callback = (e) => {
  switch(e.keyCode){
    case 38: // UP
      snake.dx = 0;
      snake.dy = -1;
      break;
    case 40: // DOWN
      snake.dx = 0;
      snake.dy = 1;
      break;
    case 37: // LEFT
      snake.dx = -1;
      snake.dy = 0;
      break;
    case 39: // RIGHT
      snake.dx = 1;
      snake.dy = 0;
      break; 
  }
}

const update = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  snake.draw();
  apple.draw();

  snake.update();
}
