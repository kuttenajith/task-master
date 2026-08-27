import type { FC } from 'react';
import { useCallback, useState } from 'react';

import type { LocationNode } from '../types/location';

import styles from './LocationTree.module.scss';

export interface LocationTreeProps {
  nodes: LocationNode[];
  selectedId: string | null;
  onSelectLeaf: (node: LocationNode) => void;
}

interface TreeNodeProps {
  node: LocationNode;
  depth: number;
  selectedId: string | null;
  onSelectLeaf: (node: LocationNode) => void;
}

const TreeNode: FC<TreeNodeProps> = ({ node, depth, selectedId, onSelectLeaf }) => {
  const hasChildren = Boolean(node.children?.length);
  const isLeaf = Boolean(node.floorplan);
  const [expanded, setExpanded] = useState(depth < 1);

  const handleClick = useCallback(() => {
    if (hasChildren) {
      setExpanded((prev) => !prev);
      return;
    }
    if (isLeaf) {
      onSelectLeaf(node);
    }
  }, [hasChildren, isLeaf, node, onSelectLeaf]);

  const isSelected = selectedId === node.id;

  return (
    <li className={styles.node} style={{ ['--depth' as string]: depth }}>
      <button
        type="button"
        className={`${styles.row} ${isSelected ? styles.rowSelected : ''} ${isLeaf ? styles.rowLeaf : ''}`}
        onClick={handleClick}
        aria-expanded={hasChildren ? expanded : undefined}
      >
        <span className={styles.chevron} aria-hidden>
          {hasChildren ? (expanded ? '▾' : '▸') : '•'}
        </span>
        <span className={styles.label}>{node.name}</span>
      </button>
      {hasChildren && expanded ? (
        <ul className={styles.children}>
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              selectedId={selectedId}
              onSelectLeaf={onSelectLeaf}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
};

export const LocationTree: FC<LocationTreeProps> = ({ nodes, selectedId, onSelectLeaf }) => (
  <nav className={styles.tree} aria-label="Locations">
    <ul className={styles.root}>
      {nodes.map((node) => (
        <TreeNode key={node.id} node={node} depth={0} selectedId={selectedId} onSelectLeaf={onSelectLeaf} />
      ))}
    </ul>
  </nav>
);
