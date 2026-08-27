declare module '*.webm' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  import type { FC, SVGProps } from 'react';
  export const ReactComponent: FC<SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module 'nearest-color' {
  type ColorMap = Record<string, string>;
  type NearestColorResult = { name: string; value: string; rgb: { r: number; g: number; b: number } };
  type NearestColor = {
    (hex: string): NearestColorResult;
    from: (colors: ColorMap) => (hex: string) => NearestColorResult;
  };
  const nearestColor: NearestColor;
  export default nearestColor;
}
