const COLOUR_WHITE = 0xFFFFFFFF;

let canvas;
let ctx;

// Size of the image underlying the canvas
let canvasWidth = 1024;
let canvasHeight = 1024;

// Image rendered onto the canvas
let img;

// Size of one rendered pixel
let pxSize;

const main = () => {
  init();
  canvas = document.getElementById('px-canvas');
  if (canvas.getContext) {
    ctx = canvas.getContext('2d');
  }
  draw();
}

const init = () => {
  img = {
    width: 16,
    height: 16,
    pixels: createImage(16, 16)
  };
  pxSize = canvasWidth / img.width;
}

const draw = () => {
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      const { r, g, b, a } = splitRGBA(img.pixels[x][y]);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a}`;
      ctx.fillRect(x * pxSize, y * pxSize, pxSize, pxSize);
    }
  }
}

const createImage = (width, height) => {
  let pixels = [];
  for (let y = 0; y < height; y++) {
    let newRow = [];
    pixels.push(newRow);
    for (let x = 0; x < width; x++) {
      newRow.push(COLOUR_WHITE);
    }
  }
  return pixels;
}

const createColour = (r, g, b, a) => {
  // Limit values for safety
  r = r & 0xFF;
  g = g & 0xFF;
  b = b & 0xFF;
  a = a & 0xFF;
  return (r << 24) + (g << 16) + (b << 8) + (a);
}

const splitRGBA = (rgba) => {
  const r = (rgba >> 24) & 0xFF;
  const g = (rgba >> 16) & 0xFF;
  const b = (rgba >> 8)  & 0xFF;
  const a = (rgba)       & 0xFF;
  return { r, g, b, a };
}
