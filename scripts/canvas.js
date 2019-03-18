console.log("Connected!");

var c; // Canvas
var ctx; // Canvas COntext
var bubbles = [];
var xMouse = 0;
var yMouse = 0;
// Blob Sound Effect Retrieved from https://youtu.be/LnMhJU6RsYU
var audioPop = new Audio("assets/blob-sound-effect.mp3");
// Playground Sound Effect Retrieved from  https: //youtu.be/UydZd954-tM
var audioPlayground = new Audio("assets/playground-sound-effect.mp3");
var instructions = document.querySelector(".instructions");
var startBtn = document.querySelector(".initial");
var elem = document.documentElement;
var isFullscreen = false;

function init() {
  // GLOBLA VARIABLE SETUP
  c = document.getElementById("myCanvas");
  c.width = document.body.clientWidth;
  c.height = document.body.clientHeight;
  ctx = c.getContext("2d");
  ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
  ctx.lineWidth = 2;

  // ADD EVENT LISTENERS
  // Not a touch device
  if (!("ontouchstart" in document.documentElement)) {
    c.addEventListener("mousemove", onHover);
  } else {
    c.addEventListener("touchmove", onHover);
  }
  window.addEventListener("resize", onResize);

  // SET AUDIO PROPERTIES
  audioPlayground.volume = 0.08;
  audioPlayground.loop = true;
}

// Params: None
// Result: Start experience
function start() {
  // Remove Start elemenets
  startBtn.classList.add("remove");
  // Show instructions
  instructions.classList.add("show");

  createBubbles(10);
  // Play background audio
  audioPlayground.play();
  // Draw Next Frame
  window.requestAnimationFrame(draw);
}

// Params: None
// Result: Draw Canvas Elements (Bubbles)
function draw() {
  //   ctx.globalCompositeOperation = "copy"; // ALTERNATIVE
  ctx.globalCompositeOperation = "destination-over"; // Draw above
  ctx.clearRect(0, 0, c.width, c.height); // clear canvas

  bubbles.forEach(function(bubble) {
    bubble.move();
    bubble.draw(ctx);
  });

  // Draw Next Frame
  window.requestAnimationFrame(draw);
}

//---------- LISTENER FUNCTIONS----------//

// Params: None
// Return: Sets xMouse and yMouse to cursor cords
function onHover(event) {
  xMouse = event.clientX;
  yMouse = event.clientY;
}

// Params: None
// Return: Changes canvas size and stroke details (color and width)
function onResize() {
  c.width = document.body.clientWidth;
  c.height = document.body.clientHeight;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
  ctx.lineWidth = 2;
}

//---------- UTILITIES----------//

// Params: Num amount of bubbles to create
// Returns: Adds amount param of bubbles to global bubbles array
function createBubbles(amount) {
  for (var i = 0; i < amount; i++) {
    bubbles.push(new Bubble(rand(0, c.width)));
  }
}

// Params: Min and Max number used as random treshold
// Returns: Randomly select a value between min and max (inclusive)
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Params: None
// Return:Decides if the screens should be fullscreened or minimized
function changeScreen() {
  isFullscreen = !isFullscreen;
  if (isFullscreen) {
    openFullscreen();
  } else {
    closeFullscreen();
  }
}

// Params: Num (x1,y1) and (x2,y2) cords
// Return: Draws a line between cords
function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

// Params: Num amplitute, Num val, Num offset
// Return: Amplies a sin function on val
function sinMove(amp, val, offset) {
  var deg = val * (Math.PI / 180);
  return amp * Math.sin(deg) + offset;
}

// Params: Num degree
// Return: Converts Degrees to Radians
function degreesToRadians(deg) {
  return deg * (Math.PI / 180);
}

// START OF w3Schools CODE
/* Get the documentElement (<html>) to display the page in fullscreen */
// Code for fullscreen retrieved from w3Schools
// https://www.w3schools.com/howto/howto_js_fullscreen.asp

/* View in fullscreen */
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE/Edge */
    document.msExitFullscreen();
  }
}
// END OF w3Schools CODE

//---------- INITIALIZE DATA/PROGRAM ----------//
init();
