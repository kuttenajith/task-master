import type { FC, SVGProps } from 'react';
import { useEffect, useRef } from 'react';

import { ReactComponent as Floor1 } from '../assets/floor1.svg';
import { ReactComponent as Floor2 } from '../assets/floor2.svg';
import { ReactComponent as Floor3 } from '../assets/floor3.svg';
import { ReactComponent as FloorPlan } from '../assets/floor_plan.svg';
import { LOCATION_IDS } from '../constants/floorplan';
import { LOCATION_SHAPE_BY_ID } from '../constants/shapes';
import type { FloorplanFile, ShapeType } from '../types/location';

import styles from './FloorplanViewer.module.scss';

const FLOORPLAN_COMPONENT: Record<FloorplanFile, FC<SVGProps<SVGSVGElement>>> = {
  'floor1.svg': Floor1,
  'floor2.svg': Floor2,
  'floor3.svg': Floor3,
  'floor_plan.svg': FloorPlan,
};

export interface FloorplanViewerProps {
  floorplan: FloorplanFile;
  color: string;
  rotated: boolean;
  activeShapes: Set<ShapeType>;
  title: string;
}

export const FloorplanViewer: FC<FloorplanViewerProps> = ({ floorplan, color, rotated, activeShapes, title }) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const Svg = FLOORPLAN_COMPONENT[floorplan];

  useEffect(() => {
    const root = hostRef.current;
    if (!root) return;

    LOCATION_IDS.forEach((id) => {
      const el = root.querySelector<SVGElement>(`#${CSS.escape(id)}`);
      if (!el) return;

      const shape = LOCATION_SHAPE_BY_ID[id];
      const visible = activeShapes.has(shape);
      el.style.fill = color;
      el.style.opacity = visible ? '1' : '0.12';
      el.style.pointerEvents = visible ? 'auto' : 'none';
      el.setAttribute('data-shape', shape);
    });
  }, [floorplan, color, activeShapes]);

  return (
    <div className={styles.viewer}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.hint}>Locations update live with color, rotation, and shape filters.</p>
      </header>
      <div
        ref={hostRef}
        className={`${styles.canvas} ${rotated ? styles.rotated : ''}`}
        data-testid="floorplan-canvas"
      >
        <Svg className={styles.svg} role="img" aria-label={`${title} floor plan`} />
      </div>
    </div>
  );
};
