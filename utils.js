// source https://www.30secondsofcode.org/js/s/rgb-hex-hsl-hsb-color-format-conversion/
const hslToRgb = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)].map(n=>Math.min(Math.round(n), 255));
};

const rgbToHex = (r, g, b) =>
  "#" + ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');

const hslToHex = (h, s, l) => {
  return rgbToHex(...hslToRgb(h, s, l));
}

export const hslaToHexa = (h, s, l, a=100) => {
  return hslToHex(h, s, l) + Math.floor(a * 255 / 100).toString(16)
}

// console.log(hslaToHexa(240, 50, 50, 50));