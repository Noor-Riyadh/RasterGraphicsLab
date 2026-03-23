// Helper to plot points in all 4 quadrants
function ellipsePlotPoints(xCenter, yCenter, x, y, SCALE, ctx) {
  ctx.fillRect((xCenter + x) * SCALE, (yCenter + y) * SCALE, SCALE, SCALE); // Quad 1
  ctx.fillRect((xCenter - x) * SCALE, (yCenter + y) * SCALE, SCALE, SCALE); // Quad 2
  ctx.fillRect((xCenter - x) * SCALE, (yCenter - y) * SCALE, SCALE, SCALE); // Quad 3
  ctx.fillRect((xCenter + x) * SCALE, (yCenter - y) * SCALE, SCALE, SCALE); // Quad 4
}

function drawMidpointEllipse(xCenter, yCenter, rx, ry) {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  const SCALE = 10;
  ctx.fillStyle = "purple";

  let x = 0;
  let y = ry; // Initial point (0, ry)

  let rx2 = rx * rx;
  let ry2 = ry * ry;
  let twoRx2 = 2 * rx2;
  let twoRy2 = 2 * ry2;
  let px = 0;
  let py = twoRx2 * y;

  // --- Region 1 --- 
  // Initial decision parameter for Region 1 
  let p = Math.round(ry2 - rx2 * ry + 0.25 * rx2);

  ellipsePlotPoints(xCenter, yCenter, x, y, SCALE, ctx);

  while (px < py) {
    // Condition: 2*ry^2*x < 2*rx^2*y
    x++;
    px += twoRy2;
    if (p < 0) {
      p += ry2 + px; // Select (x+1, y) 
    } else {
      y--;
      py -= twoRx2;
      p += ry2 + px - py; // Select (x+1, y-1) 
    }
    ellipsePlotPoints(xCenter, yCenter, x, y, SCALE, ctx);
  }

  // --- Region 2 --- 
  // Initial decision parameter for Region 2 
  p = Math.round(
    ry2 * (x + 0.5) * (x + 0.5) + rx2 * (y - 1) * (y - 1) - rx2 * ry2,
  );

  while (y > 0) {
    y--;
    py -= twoRx2;
    if (p > 0) {
      p += rx2 - py; // Select (x, y-1) 
    } else {
      x++;
      px += twoRy2;
      p += rx2 - py + px; // Select (x+1, y-1) 
    }
    ellipsePlotPoints(xCenter, yCenter, x, y, SCALE, ctx);
  }
}
