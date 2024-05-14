/**
 * Convert RGB color to HEX format
 * @param r - R value
 * @param g - G value
 * @param b - B value
 * @returns Hex presentation in uppercase without leading #, or "FFFFFF" if invalid input
 */
const rgbToHex = (r: number, g: number, b: number): string => {
  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
    return "FFFFFF";
  }

  let rr = r.toString(16);
  let gg = g.toString(16);
  let bb = b.toString(16);

  if (rr.length === 1) rr = "0" + rr;
  if (gg.length === 1) gg = "0" + gg;
  if (bb.length === 1) bb = "0" + bb;

  return `${rr}${gg}${bb}`.toUpperCase();
};

/**
 * Convert HEX format to RGB
 * @param hex - Hex representation of the color
 * @returns RGB values of the hex color, or white color if invalid input
 */
const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  if (hex[0] == "#") {
    hex = hex.substring(1);
  }
  let r = "0xFF",
    g = "0xFF",
    b = "0xFF";

  // 3 digits
  if (hex.length === 3) {
    r = "0x" + hex[0] + hex[0];
    g = "0x" + hex[1] + hex[1];
    b = "0x" + hex[2] + hex[2];

    // 6 digits
  } else if (hex.length === 6) {
    r = "0x" + hex[0] + hex[1];
    g = "0x" + hex[2] + hex[3];
    b = "0x" + hex[4] + hex[5];
  }

  let rr = parseInt(r, 16);
  let gg = parseInt(g, 16);
  let bb = parseInt(b, 16);

  if (isNaN(rr) || isNaN(gg) || isNaN(bb)) {
    rr = gg = bb = 255;
  }

  return { r: rr, g: gg, b: bb };
};

/**
 * Convert RGB color to HSL
 * @param r - R value
 * @param g - G value
 * @param b - B value
 * @returns
 */
const rgbToHsl = (
  r: number,
  g: number,
  b: number
): { h: number; s: number; l: number } => {
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  // Calculate hue
  // No difference
  if (delta === 0) h = 0;
  // Red is max
  else if (cmax === r) h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax === g) h = (b - r) / delta + 2;
  // Blue is max
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(0);
  l = +(l * 100).toFixed(0);

  return { h: h, s: s, l: l };
};

/**
 * Convert HSL color to RGB
 * @param h - H value
 * @param s - S value
 * @param l - L value
 * @returns
 */
const hslToRgb = (
  h: number,
  s: number,
  l: number
): { r: number; g: number; b: number } => {
  // Must be fractions of 1
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r: r, g: g, b: b };
};

/**
 * Convert HEX format to HSL
 * @param hex - Hex representation of the color
 * @returns HSL values of the hex color, or white color if invalid input
 */
const hexToHsl = (hex: string) => {
  const rgb = hexToRgb(hex);

  let rr = rgb.r / 255;
  let gg = rgb.g / 255;
  let bb = rgb.b / 255;

  // Then to HSL
  let cmin = Math.min(rr, gg, bb),
    cmax = Math.max(rr, gg, bb),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta === 0) h = 0;
  else if (cmax === rr) h = ((gg - bb) / delta) % 6;
  else if (cmax === gg) h = (bb - rr) / delta + 2;
  else h = (rr - gg) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return { h: h, s: s, l: l };
};

/**
 * Convert RGB color to CMYK format
 * @param r - R value
 * @param g - G value
 * @param b - B value
 * @returns CMYK presentation
 */
const rgbToCmyk = (
  r: number,
  g: number,
  b: number
): { c: number; m: number; y: number; k: number } => {
  var c = 1 - r / 255;
  var m = 1 - g / 255;
  var y = 1 - b / 255;
  var k = Math.min(c, Math.min(m, y));

  c = (c - k) / (1 - k);
  m = (m - k) / (1 - k);
  y = (y - k) / (1 - k);

  var normalized = false;

  if (!normalized) {
    c = Math.round(c * 10000) / 100;
    m = Math.round(m * 10000) / 100;
    y = Math.round(y * 10000) / 100;
    k = Math.round(k * 10000) / 100;
  }

  c = Math.round(isNaN(c) ? 0 : c);
  m = Math.round(isNaN(m) ? 0 : m);
  y = Math.round(isNaN(y) ? 0 : y);
  k = Math.round(isNaN(k) ? 0 : k);

  return { c: c, m: m, y: y, k: k };
};

/**
 * Convert CMYK color to RGB format
 * @param c - C value
 * @param m - M value
 * @param y - Y value
 * @param k - K value
 * @returns RGB presentation
 */
const cmykToRgb = (
  c: number,
  m: number,
  y: number,
  k: number
): { r: number; g: number; b: number } => {
  c = c / 100;
  m = m / 100;
  y = y / 100;
  k = k / 100;

  c = c * (1 - k) + k;
  m = m * (1 - k) + k;
  y = y * (1 - k) + k;

  var r = 1 - c;
  var g = 1 - m;
  var b = 1 - y;

  r = Math.round(255 * r);
  g = Math.round(255 * g);
  b = Math.round(255 * b);

  return { r: r, g: g, b: b };
};

export default {
  rgbToHex,
  rgbToHsl,
  rgbToCmyk,
  hexToRgb,
  hexToHsl,
  hslToRgb,
  cmykToRgb,
};
