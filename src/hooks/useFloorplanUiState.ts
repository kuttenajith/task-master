import { useCallback, useMemo, useState } from 'react';

import { ALL_SHAPE_TYPES } from '../constants/shapes';
import type { FloorplanUiState, ShapeType } from '../types/location';
import { createColorPalette } from '../utils/palette';

const createDefaultUiState = (palette: { hex: string }[]): FloorplanUiState => ({
  rotated: false,
  color: palette[0]?.hex ?? '#3366ff',
  activeShapes: new Set(ALL_SHAPE_TYPES),
});

/**
 * Shared floor-plan UI preferences (color, rotation, shape filters).
 * Kept outside the tree so switching buildings preserves controls.
 */
export const useFloorplanUiState = () => {
  const palette = useMemo(() => createColorPalette(10), []);
  const [ui, setUi] = useState<FloorplanUiState>(() => createDefaultUiState(palette));

  const toggleRotated = useCallback(() => {
    setUi((prev) => ({ ...prev, rotated: !prev.rotated }));
  }, []);

  const setColor = useCallback((color: string) => {
    setUi((prev) => ({ ...prev, color }));
  }, []);

  const toggleShape = useCallback((shape: ShapeType) => {
    setUi((prev) => {
      const next = new Set(prev.activeShapes);
      if (next.has(shape)) {
        // Keep at least one filter active for clearer UX
        if (next.size === 1) return prev;
        next.delete(shape);
      } else {
        next.add(shape);
      }
      return { ...prev, activeShapes: next };
    });
  }, []);

  const isShapeActive = useCallback((shape: ShapeType) => ui.activeShapes.has(shape), [ui.activeShapes]);

  return {
    palette,
    ui,
    toggleRotated,
    setColor,
    toggleShape,
    isShapeActive,
  };
};
