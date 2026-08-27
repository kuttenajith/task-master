import { act, renderHook } from '@testing-library/react';

import { useFloorplanUiState } from './useFloorplanUiState';

describe('useFloorplanUiState', () => {
  it('preserves color while toggling rotation and shape filters', () => {
    const { result } = renderHook(() => useFloorplanUiState());
    const initialColor = result.current.ui.color;

    act(() => {
      result.current.setColor('#112233');
    });
    act(() => {
      result.current.toggleRotated();
    });
    act(() => {
      result.current.toggleShape('star');
    });

    expect(result.current.ui.color).toBe('#112233');
    expect(result.current.ui.color).not.toBe(initialColor);
    expect(result.current.ui.rotated).toBe(true);
    expect(result.current.isShapeActive('star')).toBe(false);
    expect(result.current.isShapeActive('circle')).toBe(true);
  });

  it('does not allow clearing every shape filter', () => {
    const { result } = renderHook(() => useFloorplanUiState());

    act(() => {
      result.current.toggleShape('circle');
      result.current.toggleShape('rectangle');
      result.current.toggleShape('star');
    });

    const activeCount = ['circle', 'rectangle', 'star'].filter((shape) =>
      result.current.isShapeActive(shape as 'circle' | 'rectangle' | 'star')
    ).length;

    expect(activeCount).toBeGreaterThanOrEqual(1);
  });
});
