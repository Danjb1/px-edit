// Colour constants
export const COLOUR_BLACK = 0x000000FF;
export const COLOUR_WHITE = 0xFFFFFFFF;

/**
 * Creates a blank image.
 *
 * @param {number} width
 * @param {number} height
 */
export const createImage = (width, height) => {
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

/**
 * Creates a colour value from separate RGBA values.
 *
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @param {number} a
 */
export const createColour = (r, g, b, a) => {
  // Limit values for safety
  r = r & 0xFF;
  g = g & 0xFF;
  b = b & 0xFF;
  a = a & 0xFF;
  return (r << 24) + (g << 16) + (b << 8) + (a);
}

/**
 * Splits a colour value into separate RGBA values.
 *
 * @param {number} rgba
 */
export const splitRGBA = (rgba) => {
  const r = (rgba >> 24) & 0xFF;
  const g = (rgba >> 16) & 0xFF;
  const b = (rgba >> 8)  & 0xFF;
  const a = (rgba)       & 0xFF;
  return { r, g, b, a };
}
