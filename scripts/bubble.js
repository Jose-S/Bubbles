// Params: Num x cordinate
// Results: Creates a new Bubble object with random values
function Bubble(x) {
  // Values used to calculate bubble line
  var lineStart = 3 / rand(0, 9);
  var lineLength = 1 / rand(2, 4);

  // Used to position and size bubble
  this.x = x;
  this.y = rand(c.height, c.height + 75);
  this.xStart = x;
  this.radius = rand(10, 30);
  // Used to Pop Bubble
  this.popped = false;
  this.popLine = this.radius / 1.5;
  this.popBars = rand(6, 9);
  //   Used to draw bubble line
  this.lineStartAngle = lineStart * Math.PI;
  this.lineEndAngle = (lineStart + lineLength) * Math.PI;
  // Used to rotate oscillate bubble line
  this.lineRotation = 0;
  this.lineRotateInc = 1 / rand(40, 100);
  this.rotateRigth = true;
  // Control the bubble movement
  this.speed = 30 / rand(10, 20);
  this.jiggleAmplitude = rand(15, 50);
  // Methods
  this.draw = drawBubble;
  this.pressed = pressed;
  this.move = move;
  this.explode = explode;
  this.remove = remove;
}

//---------- DRAWING FUNCTIONS ----------//

// Prams: Canvas Context
// Result: Draw a circle
function drawBubble(ctx) {
  // Draw Bubble if not popped
  if (this.popped == false) {
    // DRAW BUBBLE CIRCLE
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.stroke();

    // DRAW BUBBLE LINE
    ctx.beginPath();
    ctx.arc(
      this.x,
      this.y,
      this.radius - this.radius / 4,
      this.lineStartAngle + this.lineRotation,
      this.lineEndAngle + this.lineRotation
    );
    ctx.stroke();
  }

  // DRAW BUBBLE POP if hovered and not popped
  if (this.pressed(xMouse, yMouse) && this.popped == false) {
    this.popped = true;
    // Remove Hover Over Instructions
    instructions.classList.remove("show");
  }

  // Continue drawing pop animation if popline is still visible (> 0)
  if (this.popped && this.popLine > 0) {
    this.popLine -= this.radius / 25;
    this.explode();
  }
}

// Prams: None
// Result: Draw bubble explosion lines
function explode() {
  audioPop.play();
  // Angle Interval to draw new line
  var angleInter = 360 / this.popBars;
  for (var i = 0; i < this.popBars; i++) {
    let degree = degreesToRadians(i * angleInter);
    // Calculate x and y cord around bubble circle
    var x = this.radius * Math.cos(degree);
    var y = this.radius * Math.sin(degree);
    // Calculate x2 and y2 cord outside of bubble circle
    var x2 = (this.radius + this.popLine) * Math.cos(degree);
    var y2 = (this.radius + this.popLine) * Math.sin(degree);
    // Pass in cords with ofset of bubble center cord
    drawLine(x + this.x, y + this.y, x2 + this.x, y2 + this.y);
  }
}

//---------- DRAWING FUNCTIONS ----------//

// Params: X and Y cords
// Results: Boolean if given cord is inside of bubble
function pressed(x, y) {
  var d = Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2));
  return d < this.radius;
}

// Params: None
// Results: Move Bubbles
function move() {
  // DECIDE TO REMOVE BUBBLE
  if (this.popped && this.popLine <= 0) {
    this.remove();
  }
  // MOVE BUBBLE
  // If out of bound by atleast its radius, then reset y val
  if (this.y + this.radius <= -this.radius) {
    this.y = c.height;
    this.x = this.xStart;
  } else {
    this.y -= this.speed;
    // Creates side motions
    this.x = sinMove(this.jiggleAmplitude, this.y, this.xStart);
  }

  // ROTATE BUBBLE LINE
  // Change Rotation direction based on current lineRotation amount
  if (this.lineRotation > this.lineRotateInc * 50 || this.lineRotation < 0) {
    this.rotateRigth = !this.rotateRigth;
  }
  // Decide to increase or decrease lineRotation amount
  this.lineRotation += this.rotateRigth
    ? this.lineRotateInc
    : -this.lineRotateInc;
}

function remove() {
  var i = bubbles.indexOf(this);
  if (i > -1) {
    bubbles.splice(i, 1);
    // Add a new Bubble
    createBubbles(1);
  }
}
