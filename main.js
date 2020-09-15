

// setup canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// Putter
  class Putter {
    constructor (x, y, vel, theta) {
        this.x = x;
        this.y = y;
        this.velX= vel*Math.cos(theta);
        this.velY = vel*Math.sin(theta);
        this.angle = theta;
    }
    
    draw() {
    //add image for putter here 
    }

    hit(ball) {
     ball.velX = this.velX;
     ball.velY = this.velY;
    }

   }


 // Represent a Golf Ball object with position, x-velocity, y-velocity, color, size, and boolean (whether it exists)
   class Golfball {
   constructor(x, y, velX, velY, color, inhole){
      this.x = x;
      this.y = y;
      this.velX = velX;
      this.velY = velY;
	  this.color = color;
	  this.size = 10;
      this.inhole = false;
    }

   //draw a ball object on the context
   draw() {
    if (!this.inhole){
        ctx.beginPath();
	    ctx.fillStyle = this.color;
	    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
	    ctx.fill();
     }
    }

    //Checks whether the ball has "collided" with the hole
    inHole(hole){

        
    }

   //update the ball's position, making sure it bounces off any walls and loses speed according to the "slow" rate which must be < 1 in magnitude
   update(rate, dt) {
   //check walls
   if ((this.x + this.size) >= 3*(width/4)) { 
     this.velX = -(this.velX);
    }

   if ((this.x - this.size) <= (width/4)) {
     this.velX = -(this.velX);
   }

   if ((this.y + this.size) >= 7*height/12) {
     this.velY = -(this.velY);
   }

   if ((this.y - this.size) <= height/4) {
     this.velY = -(this.velY);
   }
   if (this.velX !==0 || this.velY !== 0) {
                  this.velX *= rate;
                  this.velY *= rate;
    }
    //lose speed 
   if (Math.abs(this.velX) < .15 && Math.abs(this.velY) <.15) {
        this.velX = 0;
        this.velY = 0;  
     }

   this.x += this.velX*dt;
   this.y += this.velY*dt;
  }

 }

 class Hole {
  constructor (xpos, ypos) {
        this.xpos = xpos;
        this.ypos =ypos;
        this.size = 10;
  }
  
  draw() {
   ctx.beginPath();
	ctx.fillStyle = 'black';
	ctx.arc(this.xpos, this.ypos, this.size, 0, 2 * Math.PI);
	ctx.fill();
  }

 }

 class Game{
   constructor(){
    this.ball = new Golfball(width/3, height/3, 0, 0, 'white', false);
    this.putter = new Putter(width/3-1, height/3, 0, 0);
    this.hole = new Hole();
    }

   
 }

const game1 = new Game();
const ball = game1.ball;
const hole1 = game1.hole;
 //animate the canvas and start the game
 let lastTime;
function loop() {
 //get time between animation frames to accurately render objects on screen 
  let currentTime = Date.now();
  let dt = (currentTime- lastTime)/1000;
  ctx.beginPath();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  //Putting Green 
  ctx.beginPath();
  ctx.fillStyle = 'green';
  //center it 
  ctx.fillRect(width/4, height/4, width/2 , height/3);
  hole1.draw();
  ball.draw();
  ball.update(0.99);
  lastTime = currentTime;
  requestAnimationFrame(loop);
}


loop();