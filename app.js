const FPS = 30; // Frames per second set to 30
const SHIP_SIZE = 30; // Ship size in pixels
const SPEED = 360; // turn speed in degrees per second
const SHIP_THRUST = 5; //Acceleration in pixels per second
var canvas = document.getElementById("asteroidCanvas");
const ctx = canvas.getContext("2d"); // Get the rendering context in 2d

var ship = {
  xPlane: canvas.width / 2,
  yPlane: canvas.height / 2,
  radius: SHIP_SIZE / 2,
  directionAngle: (90 / 180) * Math.PI, // Converting to radians
  rotation: 0,
  thrusting: false,
  thrust: {
    x: 0,
    y: 0,
  },
};

// event handlers
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

// Set game loop
setInterval(upDate, 1000 / FPS); // Repeatedly call a function with a fixed time delay between each call

function keyDown(evt) {
  switch (evt.keyCode) {
    case 37: // left arrow on the keyboard (rotate ship to the left)
      ship.rotation = ((SPEED / 180) * Math.PI) / FPS;
      break;

    case 38: // up arrow on the keyboard (move forward)
      ship.thrusting = true;
      break;

    case 39: // right arrow on the keyboard (rotate ship to the right)
      ship.rotation = ((-SPEED / 180) * Math.PI) / FPS;
      break;
  }
}
function keyUp(evt) {
  switch (evt.keyCode) {
    case 37: //stop left rotation
    case 39: // stop right rotation
      ship.rotation = 0;
      break;

    case 38: // Stop thrusting
      ship.thrusting = false;
      break;
  }
}
function upDate() {
  // Draw background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // thrust ship

  if (ship.thrusting) {
    ship.thrust.x += (SHIP_THRUST * Math.cos(ship.directionAngle)) / FPS;
    ship.thrust.y -= (SHIP_THRUST * Math.sin(ship.directionAngle)) / FPS;
  }

  // Draw a triangular ship
  ctx.strokeStyle = "white";
  ctx.lineWidth = SHIP_SIZE / 20;
  ctx.beginPath();

  // Nose of the ship
  ctx.moveTo(
    ship.xPlane + (4 / 3) * ship.radius * Math.cos(ship.directionAngle), // cos represents the horizontal line
    ship.yPlane - (4 / 3) * ship.radius * Math.sin(ship.directionAngle) // sin represents the vertical line
  );

  // Rear left of the ship
  ctx.lineTo(
    ship.xPlane -
      ship.radius *
        ((2 / 3) * Math.cos(ship.directionAngle) +
          Math.sin(ship.directionAngle)),
    ship.yPlane +
      ship.radius *
        ((2 / 3) * Math.sin(ship.directionAngle) -
          Math.cos(ship.directionAngle))
  );

  // Rear right of the ship
  ctx.lineTo(
    ship.xPlane -
      ship.radius *
        ((2 / 3) * Math.cos(ship.directionAngle) -
          Math.sin(ship.directionAngle)),
    ship.yPlane +
      ship.radius *
        ((2 / 3) * Math.sin(ship.directionAngle) +
          Math.cos(ship.directionAngle))
  );

  // Back to the nose to complete the triangle
  ctx.closePath(); //complete the triangle
  ctx.stroke();

  //Rotate ship
  ship.directionAngle += ship.rotation;

  //move the ship
  ship.xPlane += ship.thrust.x;
  ship.yPlane += ship.thrust.y;
  // Center of the ship
  ctx.fillStyle = "red";
  ctx.fillRect(ship.xPlane - 1, ship.yPlane - 1, 2, 2);
}
