import { getRandomHexColor, hexColorToGeneralName } from '../utils/colors';

/** Build a stable palette of N unique-enough random colors with friendly names. */
export const createColorPalette = (count = 10): { hex: string; name: string }[] => {
  const seen = new Set<string>();
  const palette: { hex: string; name: string }[] = [];

  let guard = 0;
  while (palette.length < count && guard < count * 20) {
    guard += 1;
    const hex = getRandomHexColor();
    const name = hexColorToGeneralName(hex);
    const key = `${hex}-${name}`;
    if (seen.has(key)) continue;
    seen.add(key);
    palette.push({ hex, name });
  }

  return palette;
};
