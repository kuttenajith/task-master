import type { ShapeType } from '../types/location';
import { LOCATION_IDS } from '../constants/floorplan';

/** Map SVG element ids to shape categories used by the filter control. */
export const LOCATION_SHAPE_BY_ID: Record<(typeof LOCATION_IDS)[number], ShapeType> = {
  rect1408: 'rectangle',
  rect1410: 'rectangle',
  rect1412: 'rectangle',
  path1529: 'star',
  path1585: 'circle',
  path15851: 'circle',
};

export const ALL_SHAPE_TYPES: ShapeType[] = ['circle', 'rectangle', 'star'];

export const isKnownLocationId = (id: string): id is (typeof LOCATION_IDS)[number] =>
  (LOCATION_IDS as readonly string[]).includes(id);
