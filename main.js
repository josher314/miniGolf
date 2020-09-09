// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

 // Represent a Golf Ball object with position, xvelocity, yvelocity, color, size, and boolean (whether it exists)
 
  class Golfball {
   constructor(x, y, velX, velY, color, boolean){
      this.x = x;
      this.y = y;
      this.velX = velX;
      this.velY = velY;
	  this.color = color;
      this.boolean = boolean;
	  this.size = 10;
      this.weight = .04;
      this.bounceFriction = 0.7;
    }

   //draw a ball object on the context
   draw() {
    ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
	ctx.fill();
    }

   //update the ball's position, making sure it bounces off any walls and loses speed according to the bounce friction
   checkBorders() {
    if ((this.x + this.size) >= 3*(width/4)) {
    
     this.velX = -(this.velX)*this.bounceFriction;
    }

   if ((this.x - this.size) <= (width/4)) {
     this.velX = -(this.velX)*this.bounceFriction;
   }

   if ((this.y + this.size) >= height) {
     this.velY = -(this.velY)*this.bounceFriction;
   }

   if ((this.y - this.size) <= 0) {
     this.velY = -(this.velY)*this.bounceFriction;
   }

   this.x += velX;
   this.y += velY;
  }

  }


  //initialize a game ball to be used 
  let ball = new Golfball(
    // ball position always drawn centered on the left end of the putting green 
    width/3, 
    height/3,
    5,
    4,
    'white',
    true
  );


//animate the canvas and start the game
function loop() {
 //semi transparent background
  ctx.beginPath();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  //Putting Green 
  ctx.beginPath();
  ctx.fillStyle = 'green';
  ctx.fillRect(width/4, height/4, width/2 , height/3);
  ball.draw();
  ball.checkBorders();
  
  requestAnimationFrame(loop);
}

loop();
