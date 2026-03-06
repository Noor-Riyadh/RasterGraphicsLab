function round(a) {
  return Math.floor(a + 0.5);
}

function drawPixel(ctx, x, y, scale) {
  ctx.fillRect(x * scale, y * scale, scale, scale);
}

function lineDDA(x0, y0, xEnd, yEnd) {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  const SCALE = 50;

  let dx = xEnd - x0;
  let dy = yEnd - y0;
  let steps;

  if (Math.abs(dx) > Math.abs(dy)) {
    steps = Math.abs(dx);
  } else {
    steps = Math.abs(dy);
  }

  let xIncrement = dx / steps;
  let yIncrement = dy / steps;

  let x = x0;
  let y = y0;

  ctx.fillStyle = "red";
  drawPixel(ctx, round(x), round(y), SCALE);

  for (let k = 0; k < steps; k++) {
    x += xIncrement;
    y += yIncrement;
    drawPixel(ctx, round(x), round(y), SCALE);
  }
}

function handleDraw() {
  clearCanvas();
  const x0 = parseInt(document.getElementById("x0").value);
  const y0 = parseInt(document.getElementById("y0").value);
  const xEnd = parseInt(document.getElementById("xEnd").value);
  const yEnd = parseInt(document.getElementById("yEnd").value);

  lineDDA(x0, y0, xEnd, yEnd);
}

function clearCanvas() {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
