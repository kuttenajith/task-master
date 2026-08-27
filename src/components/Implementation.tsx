import type { FC } from 'react';
import { useCallback, useState } from 'react';

import { locationsData } from '../data/locations';
import { useFloorplanUiState } from '../hooks/useFloorplanUiState';
import type { FloorplanFile, LocationNode } from '../types/location';

import { FloorplanControls } from './FloorplanControls';
import { FloorplanViewer } from './FloorplanViewer';
import { LocationTree } from './LocationTree';
import styles from './Implementation.module.scss';

interface SelectedFloor {
  id: string;
  name: string;
  floorplan: FloorplanFile;
}

export const Implementation: FC = () => {
  const { palette, ui, toggleRotated, setColor, toggleShape, isShapeActive } = useFloorplanUiState();
  const [selected, setSelected] = useState<SelectedFloor | null>(null);

  const handleSelectLeaf = useCallback((node: LocationNode) => {
    if (!node.floorplan) return;
    setSelected({ id: node.id, name: node.name, floorplan: node.floorplan });
  }, []);

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Locations</h2>
        <LocationTree nodes={locationsData} selectedId={selected?.id ?? null} onSelectLeaf={handleSelectLeaf} />
        <FloorplanControls
          rotated={ui.rotated}
          color={ui.color}
          palette={palette}
          isShapeActive={isShapeActive}
          onToggleRotate={toggleRotated}
          onSelectColor={setColor}
          onToggleShape={toggleShape}
        />
      </aside>

      <section className={styles.main}>
        {selected ? (
          <FloorplanViewer
            key={selected.floorplan}
            floorplan={selected.floorplan}
            title={selected.name}
            color={ui.color}
            rotated={ui.rotated}
            activeShapes={ui.activeShapes}
          />
        ) : (
          <div className={styles.empty} data-testid="empty-state">
            <h2>Select a building</h2>
            <p>Expand the tree and click Building A–D to load its floor plan SVG.</p>
          </div>
        )}
      </section>
    </div>
  );
};
