// Function to plot points in all 8 octants based on symmetry 
function circlePlotPoints(xCenter, yCenter, x, y, SCALE, ctx) {
  // Standard 8-way symmetry mapping [cite: 635-646]
  ctx.fillRect((xCenter + x) * SCALE, (yCenter + y) * SCALE, SCALE, SCALE);
  ctx.fillRect((xCenter - x) * SCALE, (yCenter + y) * SCALE, SCALE, SCALE);
  ctx.fillRect((xCenter + x) * SCALE, (yCenter - y) * SCALE, SCALE, SCALE);
  ctx.fillRect((xCenter - x) * SCALE, (yCenter - y) * SCALE, SCALE, SCALE);
  ctx.fillRect((xCenter + y) * SCALE, (yCenter + x) * SCALE, SCALE, SCALE);
  ctx.fillRect((xCenter - y) * SCALE, (yCenter + x) * SCALE, SCALE, SCALE);
  ctx.fillRect((xCenter + y) * SCALE, (yCenter - x) * SCALE, SCALE, SCALE);
  ctx.fillRect((xCenter - y) * SCALE, (yCenter - x) * SCALE, SCALE, SCALE);
}

function drawMidpointCircle(xCenter, yCenter, radius) {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  const SCALE = 20; // Scale for better visibility
  ctx.fillStyle = "red";

  let x = 0;
  let y = radius;
  let p = 1 - radius; 

  // Plot the first set of points at (0, r) 
  circlePlotPoints(xCenter, yCenter, x, y, SCALE, ctx);

  // Iterate until the boundary x = y is reached
  while (x < y) {
    x++;
    if (p < 0) {
      // Select E (East): midpoint is inside the circle 
      p += 2 * x + 1; // Increment for E selection 
    } else {
      // Select SE (Southeast): midpoint is outside the circle 
      y--;
      p += 2 * (x - y) + 1; // Increment for SE selection 
    }
    circlePlotPoints(xCenter, yCenter, x, y, SCALE, ctx);
  }
}

function handleDrawCircle() {
  clearCanvas();
  const xc = parseInt(document.getElementById("xc").value);
  const yc = parseInt(document.getElementById("yc").value);
  const r = parseInt(document.getElementById("radius").value);
  drawMidpointCircle(xc, yc, r);
}

function clearCanvas() {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
