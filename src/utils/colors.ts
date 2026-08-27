import nearestColor from 'nearest-color';

import { cssColors } from '../constants/colors';

const colorMatcher = nearestColor.from(cssColors);

export const hexColorToGeneralName = (hexColor: string): string => {
  const nearest = colorMatcher(hexColor);
  return nearest.name;
};

export const getRandomHexColor = (): string => {
  const red = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, '0');
  const green = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, '0');
  const blue = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, '0');
  return `#${red}${green}${blue}`;
};
