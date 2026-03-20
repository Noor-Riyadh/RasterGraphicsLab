function lineBres(x0, y0, xEnd, yEnd) {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  const SCALE = 50;
  ctx.fillStyle = "blue";

  // Calculate absolute differences
  let dx = Math.abs(xEnd - x0);
  let dy = Math.abs(yEnd - y0);

  // Determine the direction of the step (1 or -1)
  let sx = x0 < xEnd ? 1 : -1;
  let sy = y0 < yEnd ? 1 : -1;

  let x = x0;
  let y = y0;

  // Case: Shallow Line (|m| <= 1) [cite: 85]
  if (dx >= dy) {
    let p = 2 * dy - dx; // Initial decision parameter [cite: 89]
    let twoDy = 2 * dy;
    let twoDyMinusDx = 2 * (dy - dx);

    for (let i = 0; i <= dx; i++) {
      ctx.fillRect(x * SCALE, y * SCALE, SCALE, SCALE);
      x += sx; // Always step in x [cite: 184]
      if (p < 0) {
        p += twoDy;
      } else {
        y += sy; // Step in y only if p >= 0 [cite: 93, 188]
        p += twoDyMinusDx;
      }
    }
  }
  // Case: Steep Line (|m| > 1) [cite: 224]
  else {
    // Interchange roles of x and y
    let p = 2 * dx - dy;
    let twoDx = 2 * dx;
    let twoDxMinusDy = 2 * (dx - dy);

    for (let i = 0; i <= dy; i++) {
      ctx.fillRect(x * SCALE, y * SCALE, SCALE, SCALE);
      y += sy; // Step along the y direction in unit steps [cite: 225, 233]
      if (p < 0) {
        p += twoDx;
      } else {
        x += sx; // Calculate successive x values nearest the path [cite: 225]
        p += twoDxMinusDy;
      }
    }
  }
}
function handleDraw() {
  clearCanvas();
  const x0 = parseInt(document.getElementById("x0").value);
  const y0 = parseInt(document.getElementById("y0").value);
  const xEnd = parseInt(document.getElementById("xEnd").value);
  const yEnd = parseInt(document.getElementById("yEnd").value);

  lineBres(x0, y0, xEnd, yEnd);
}

function clearCanvas() {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
