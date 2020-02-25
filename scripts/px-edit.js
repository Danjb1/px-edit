import * as Utils from './utils.js';

let canvas;
let ctx;

// Size of the canvas element, in pixels
let canvasElemWidth = 512;
let canvasElemHeight = 512;

// Size of the image that backs the canvas, in pixels
let canvasWidth = 1024;
let canvasHeight = 1024;

// Image rendered onto the canvas
let img;

// Size of one rendered pixel
let pxSize;

// The currently-selected colour
let currentColour = Utils.COLOUR_BLACK;

// Mouse position, relative to the canvas, in pixels
let mouseX = -1;
let mouseY = -1;

let mouseInCanvas = false;
let mouseDown = false;

/**
 * Main method, runs when the app loads.
 */
const main = () => {
  canvas = document.getElementById('px-canvas');
  if (canvas.getContext) {
    ctx = canvas.getContext('2d');
  }
  init();
  draw();
}

/**
 * Initialises the app.
 */
const init = () => {

  // Create initial image
  img = {
    width: 16,
    height: 16,
    pixels: Utils.createImage(16, 16)
  };

  // Calculate the pixel size
  pxSize = canvasWidth / img.width;

  // Add listeners
  canvas.addEventListener('mouseenter', (event) => mouseEnteredCanvas(event));
  canvas.addEventListener('mouseleave', (event) => mouseLeftCanvas(event));
  canvas.addEventListener('mousemove', (event) => mouseMovedInCanvas(event));
  canvas.addEventListener('mousedown', (event) => mouseDownInCanvas(event));
  canvas.addEventListener('mouseup', (event) => mouseUpInCanvas(event));
}

/**
 * Draws the image to the canvas.
 */
const draw = () => {

  // Find pixel under the mouse
  const hoverX = canvasToPixel_X(mouseX);
  const hoverY = canvasToPixel_Y(mouseY);

  // Draw pixels
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {

      let col = img.pixels[x][y];

      if (x == hoverX && y == hoverY) {
        // Mouse is over this pixel
        col = currentColour;
      }

      const { r, g, b, a } = Utils.splitRGBA(col);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a}`;
      ctx.fillRect(x * pxSize, y * pxSize, pxSize, pxSize);
    }
  }

}

/**
 * Called whenever the mouse enters the canvas.
 *
 * @param {MouseEvent} event 
 */
const mouseEnteredCanvas = (event) => {
  mouseInCanvas = true;
}

/**
 * Called whenever the mouse leaves the canvas.
 *
 * @param {MouseEvent} event 
 */
const mouseLeftCanvas = (event) => {
  mouseInCanvas = false;
}

/**
 * Called whenever the mouse moves over the canvas.
 *
 * @param {MouseEvent} event 
 */
const mouseMovedInCanvas = (event) => {

  // Find position relative to canvas element
  const bounds = event.target.getBoundingClientRect();
  mouseX = event.clientX - bounds.left;
  mouseY = event.clientY - bounds.top;

  if (mouseDown) {
    paintPixelUnderMouse();
  } else {
    draw();
  }
}

/**
 * Called whenever the mouse is down in the canvas.
 *
 * @param {MouseEvent} event 
 */
const mouseDownInCanvas = (event) => {
  mouseDown = true;
  paintPixelUnderMouse();
}

/**
 * Paints the pixel under the mouse.
 */
const paintPixelUnderMouse = () => {

  // Find pixel under the mouse
  const x = canvasToPixel_X(mouseX);
  const y = canvasToPixel_Y(mouseY);

  // Check bounds
  if (x < 0
      || y < 0
      || x >= img.width
      || y >= img.height) {
    return;
  }

  // Paint the pixel
  paint(x, y);
}

/**
 * Paints the pixel at the given co-ordinates.
 *
 * @param {number} x
 * @param {number} y
 */
const paint = (x, y) => {

  // Do nothing if the pixel hasn't changed
  const prevCol = img.pixels[x][y];
  if (prevCol === currentColour) {
    return;
  }

  img.pixels[x][y] = currentColour;
  draw();
}

/**
 * Called whenever the mouse is released the canvas.
 *
 * @param {MouseEvent} event 
 */
const mouseUpInCanvas = (event) => {
  mouseDown = false;
}

/**
 * Gets the x co-ordinate of the pixel at the given position within the canvas.
 *
 * @param {number} x Position relative to the canvas element.
 */
const canvasToPixel_X = (x) => {
  return Math.floor((x / canvasElemWidth) * img.width);
}

/**
 * Gets the y co-ordinate of the pixel at the given position within the canvas.
 *
 * @param {number} y Position relative to the canvas element.
 */
const canvasToPixel_Y = (y) => {
  return Math.floor((y / canvasElemHeight) * img.height);
}

main();
