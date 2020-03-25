let canvas;
let ctx;

window.onload = () => {
  canvas = document.querySelector("canvas");
  ctx = canvas.getContext("2d");
  
  addEventListener("keydown", callback);
  
  canvas.style.backgroundColor = "#bbffbb";
  canvas.height = canvas.width * 9/16;
  
  // Create and Initialize objects
  
  
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
      
      break;
    case 40: // DOWN
      
      break;
    case 37: // LEFT
      
      break;
    case 39: // RIGHT
      
      break; 
  }
}

const update = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

}