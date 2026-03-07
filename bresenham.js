function lineBres(x0, y0, xEnd, yEnd) {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  const SCALE = 50;
  ctx.fillStyle = "blue";

  let dx = Math.abs(xEnd - x0);
  let dy = Math.abs(yEnd - y0);

  let p = 2 * dy - dx;
  let twoDy = 2 * dy;
  let twoDyMinusDx = 2 * (dy - dx);

  let x, y;

  if (x0 > xEnd) {
    x = xEnd;
    y = yEnd;
    xEnd = x0;
  } else {
    x = x0;
    y = y0;
  }

  ctx.fillRect(x * SCALE, y * SCALE, SCALE, SCALE);

  while (x < xEnd) {
    x++;
    if (p < 0) {
      p += twoDy;
    } else {
      y++;
      p += twoDyMinusDx;
    }
    ctx.fillRect(x * SCALE, y * SCALE, SCALE, SCALE);
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
