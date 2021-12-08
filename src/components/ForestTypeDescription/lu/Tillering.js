/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import styles from '../Diagram.module.css';
import { getTilleringTreeTypes } from './utils';

export const getRowWidth = (value) => value * 2.5;

const renderRow = (row, index) => {
  const barPadding = 1.6;
  const barHeight = 10 + barPadding;
  const barY = barPadding * 0.5 * index * 35;

  return (
    <g key={row.type}>
      <rect
        y={barY}
        x="40"
        width={getRowWidth(row.naturalForest[1])}
        height={barHeight - barPadding}
        className={styles.medium}
      />
      <rect
        y={barY}
        x="40"
        width={getRowWidth(row.naturalForest[0])}
        height={barHeight - barPadding}
        className={styles.often}
      />
      {row.farmForest && (
        <rect
          y={barY + 10}
          x="40"
          width={getRowWidth(row.farmForest[1])}
          height={barHeight - barPadding}
          className={styles.mediumSecondary}
        />
      )}
      {row.farmForest && (
        <rect
          y={barY + 10}
          x="40"
          width={getRowWidth(row.farmForest[0])}
          height={barHeight - barPadding}
          className={styles.oftenSecondary}
        />
      )}
      <svg y={barY + 12} x="35" style={{ overflow: 'visible' }}>
        <text
          alignmentBaseline="middle"
          textAnchor="end"
          fontFamily="Lato,'Helvetica Neue',Arial,Helvetica,sans-serif"
        >
          {row.type}
        </text>
      </svg>
    </g>
  );
};

const BAR_WIDTH_100 = getRowWidth(100);

export function TilleringGrid({ height }) {
  return (
    <>
      <line
        x1="40"
        y1={height - 5}
        x2={BAR_WIDTH_100 + 40}
        y2={height - 5}
        stroke="black"
      />
      {[...Array(11).keys()].map((i) => {
        const factor = i / 10;
        return (
          <g key={i}>
            <line
              x1={BAR_WIDTH_100 * factor + 40}
              y1="0"
              x2={BAR_WIDTH_100 * factor + 40}
              y2={height}
              stroke="black"
              opacity={i > 0 ? 0.3 : 1}
              strokeDasharray={i > 0 && i % 2 !== 0 ? 4 : undefined}
            />
            {i % 2 === 0 && (
              <text
                x={BAR_WIDTH_100 * factor + 32}
                y={height + 12}
                alignmentBaseline="middle"
                fontSize="10"
                fontFamily="Lato,'Helvetica Neue',Arial,Helvetica,sans-serif"
              >
                {`${i * 10}%`}
              </text>
            )}
          </g>
        );
      })}
    </>
  );
}

function Tillering({ data }) {
  const rows = useMemo(() => getTilleringTreeTypes(data), [data]);

  if (rows.length === 0) {
    return null;
  }

  const gridHeight = rows.length * 28;
  const legendHeight = 40;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={gridHeight + legendHeight}
      viewBox={`0 0 310 ${gridHeight + legendHeight}`}
      x="0"
    >
      {rows.map((row, index) => renderRow(row, index))}
      <TilleringGrid height={gridHeight} />
      <text
        className={styles.label}
        x="40"
        y={gridHeight + legendHeight}
        fontFamily="Lato,'Helvetica Neue',Arial,Helvetica,sans-serif"
      >
        Naturwald
      </text>
      <rect
        width="20"
        height="10"
        x="10"
        y={gridHeight + legendHeight - 10}
        className={`${styles.often} ${styles.line}`}
      />
      <text
        className={styles.label}
        x="180"
        y={gridHeight + legendHeight}
        fontFamily="Lato,'Helvetica Neue',Arial,Helvetica,sans-serif"
      >
        Wirtschaftswald
      </text>
      <rect
        width="20"
        height="10"
        x="150"
        y={gridHeight + legendHeight - 10}
        className={`${styles.oftenSecondary} ${styles.line}`}
      />
    </svg>
  );
}

export default Tillering;
