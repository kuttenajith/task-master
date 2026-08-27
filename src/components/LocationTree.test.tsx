import { fireEvent, render, screen } from '@testing-library/react';

import { locationsData } from '../data/locations';

import { LocationTree } from './LocationTree';

describe('LocationTree', () => {
  it('expands hierarchy and selects a leaf building', () => {
    const onSelectLeaf = jest.fn();

    render(<LocationTree nodes={locationsData} selectedId={null} onSelectLeaf={onSelectLeaf} />);

    // Root nodes start expanded (depth < 1); Berlin is collapsed until clicked.
    fireEvent.click(screen.getByRole('button', { name: /Berlin/i }));
    fireEvent.click(screen.getByRole('button', { name: /Building A/i }));

    expect(onSelectLeaf).toHaveBeenCalledWith(
      expect.objectContaining({
        id: '1-1-1',
        name: 'Building A',
        floorplan: 'floor1.svg',
      })
    );
  });
});
