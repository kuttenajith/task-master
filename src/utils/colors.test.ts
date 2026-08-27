import { getRandomHexColor, hexColorToGeneralName } from './colors';
import { createColorPalette } from './palette';

describe('color utils', () => {
  it('returns a hex color string', () => {
    expect(getRandomHexColor()).toMatch(/^#[0-9a-f]{6}$/);
  });

  it('maps hex values to a named color', () => {
    expect(hexColorToGeneralName('#ff0000')).toBe('red');
  });

  it('builds a palette of the requested size', () => {
    const palette = createColorPalette(10);
    expect(palette).toHaveLength(10);
    expect(new Set(palette.map((item) => item.hex)).size).toBeGreaterThan(1);
  });
});
