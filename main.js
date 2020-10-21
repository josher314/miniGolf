

// setup canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// Putter
  class Putter {
    constructor (x, y, vel, angle) {
        this.x = x;
        this.y = y;
        this.vel = vel; 
        this.angle = angle;
    }
    
   drawlineTraject(e) {
    ctx.beginPath();
    ctx.moveTo(this.x,this.y);
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    } 

    getAngle(e){
     let x1 = e.clientX;
     let y1 = e.clientY;
     let dy = this.y-y1 ;
     let dx = this.x = x1;
     this.angle = (Math.atan2(dy, dx) * 180) / Math.PI
    }

    
    loadHit() {
     
    }

    hit(ball) {
     ball.velX = this.vel*Math.cos(this.angle);
     ball.velY = this.vel*Math.sin(this.angle);
    }

   }

 // Represent a Golf Ball object with position, x-velocity, y-velocity, color, size, and boolean (whether it exists)
   class Golfball {
   constructor(x, y, velX, velY, color, inhole, isMoving){
      this.x = x;
      this.y = y;
      this.velX = velX;
      this.velY = velY;
	  this.color = color;
	  this.size = 10;
      this.inhole = false;
      this.isMoving= false;
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
     let dx = (hole.xpos - this.x);
     let dy = (hole.ypos - this.y);
     let dist = Math.sqrt(dx**2 + dy**2);
     if (dist <= this.size*2) {
            this.inhole = true;
     }
        
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
    //when speed is small enough, stop ball
   if (Math.abs(this.velX) < .15 && Math.abs(this.velY) <.15) {
        this.velX = 0;
        this.velY = 0; 
        this.isMoving = false;
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
    this.ball = new Golfball(7*width/16, 7*height/16, 2, 3, 'white', false);
    this.putter = new Putter(width/3-1, height/3, 0, 0);
    this.hole = new Hole(width/2, height/2);
    }
   

   
 }

const game1 = new Game();
const ball1 = game1.ball;
const hole1 = game1.hole;
 //animate the canvas and start the game
 let lastTime = Date.now();
function loop() {
 //get time between animation frames to accurately render objects on screen 
  let currentTime = Date.now();
  let delta = (currentTime- lastTime)/1000;
  ctx.beginPath();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  //Putting Green 
  ctx.beginPath();
  ctx.fillStyle = 'green';
  //center it 
  ctx.fillRect(width/4, height/4, width/2 , height/3);
  hole1.draw();
  ball1.draw();
  ball1.update(0.99, delta);
  ball1.inHole(hole1);
  lastTime = currentTime;
  requestAnimationFrame(loop);
}

loop();