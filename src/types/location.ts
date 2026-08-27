export type FloorplanFile = 'floor1.svg' | 'floor2.svg' | 'floor3.svg' | 'floor_plan.svg';

export type ShapeType = 'circle' | 'rectangle' | 'star';

export interface LocationNode {
  id: string;
  name: string;
  children?: LocationNode[];
  floorplan?: FloorplanFile;
}

export interface FloorplanUiState {
  rotated: boolean;
  color: string;
  /** Empty set = show all shapes */
  activeShapes: Set<ShapeType>;
}
