import type { FC } from 'react';

import { ALL_SHAPE_TYPES } from '../constants/shapes';
import type { ShapeType } from '../types/location';

import styles from './FloorplanControls.module.scss';

export interface FloorplanControlsProps {
  rotated: boolean;
  color: string;
  palette: { hex: string; name: string }[];
  isShapeActive: (shape: ShapeType) => boolean;
  onToggleRotate: () => void;
  onSelectColor: (hex: string) => void;
  onToggleShape: (shape: ShapeType) => void;
}

const SHAPE_LABEL: Record<ShapeType, string> = {
  circle: 'Circle',
  rectangle: 'Rectangle',
  star: 'Star',
};

export const FloorplanControls: FC<FloorplanControlsProps> = ({
  rotated,
  color,
  palette,
  isShapeActive,
  onToggleRotate,
  onSelectColor,
  onToggleShape,
}) => (
  <div className={styles.controls}>
    <div className={styles.group}>
      <span className={styles.groupLabel}>View</span>
      <button type="button" className={`${styles.button} ${rotated ? styles.buttonActive : ''}`} onClick={onToggleRotate}>
        {rotated ? 'Reset rotation' : 'Rotate 180°'}
      </button>
    </div>

    <div className={styles.group}>
      <span className={styles.groupLabel}>Color</span>
      <div className={styles.swatches} role="listbox" aria-label="Location colors">
        {palette.map((item) => (
          <button
            key={item.hex}
            type="button"
            role="option"
            aria-selected={color === item.hex}
            title={`${item.name} (${item.hex})`}
            className={`${styles.swatch} ${color === item.hex ? styles.swatchActive : ''}`}
            style={{ backgroundColor: item.hex }}
            onClick={() => onSelectColor(item.hex)}
          />
        ))}
      </div>
    </div>

    <div className={styles.group}>
      <span className={styles.groupLabel}>Shapes</span>
      <div className={styles.filters}>
        {ALL_SHAPE_TYPES.map((shape) => (
          <button
            key={shape}
            type="button"
            className={`${styles.chip} ${isShapeActive(shape) ? styles.chipActive : ''}`}
            aria-pressed={isShapeActive(shape)}
            onClick={() => onToggleShape(shape)}
          >
            {SHAPE_LABEL[shape]}
          </button>
        ))}
      </div>
    </div>
  </div>
);
