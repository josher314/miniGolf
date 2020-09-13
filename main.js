
// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;


 // Represent a Golf Ball object with position, x-velocity, y-velocity, color, size, and boolean (whether it exists)
   class Golfball {
   constructor(x, y, velX, velY, color, isMoving, inHole){
      this.x = x;
      this.y = y;
      this.velX = velX;
      this.velY = velY;
	  this.color = color;
      this.isMoving = isMoving;
      this.inHole = inHole;
	  this.size = 10;
    }

   //draw a ball object on the context
   draw() {
    ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
	ctx.fill();
    }

   //update the ball's position, making sure it bounces off any walls and loses speed according to the "slow" rate which must be < 1 in magnitude
   update(rate) {
   //check walls
   if ((this.x + this.size) >= 3*(width/4)) { 
     this.velX = -(this.velX);
    }

   if ((this.x - this.size) <= (width/4)) {
     this.velX = -(this.velX);
   }

   if ((this.y + this.size) >= height) {
     this.velY = -(this.velY);
   }

   if ((this.y - this.size) <= 0) {
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
        this.isMoving = false;
     }

   this.x += this.velX;
   this.y += this.velY;
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

  //initialize a game ball to be used 
  let ball = new Golfball(
    // ball position always drawn centered on the left end of the putting green 
    width/3, 
    height/3,
    9,
    1,
    'white',
    true,
    true
  );

  let hole1 = new Hole( width/2, 2*height/5);


//animate the canvas and start the game
function loop() {
 //semi transparent background
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
  requestAnimationFrame(loop);
}

loop();