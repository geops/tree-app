/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import styles from '../Diagram.module.css';

const forestTypeMapping = [
  'Fi',
  'Ta',
  'WFö',
  'BFö',
  'Ei',
  'Lä',
  'Dg',
  'Bu',
  'Es',
  'BAh',
  'SAh',
  'SEi',
  'TEi',
  'WLi',
  'SLi',
  'Ki',
  'BUl',
  'FUl',
  'SEr',
  'GEr',
  'AEr',
  'HBi',
  'TKi',
  'VBe',
  'MBe',
  'Wei',
];

export const getRowWidth = (value) => value * 2.5;

const renderRow = (row, index) => {
  const barPadding = 1.6;
  const barHeight = 10 + barPadding;
  const barY = barPadding * 0.5 * index * 35;

  return (
    <g>
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
        <text alignmentBaseline="middle" textAnchor="end">
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
          <>
            <line
              x1={BAR_WIDTH_100 * factor + 40}
              y1="0"
              x2={BAR_WIDTH_100 * factor + 40}
              y2={height}
              stroke="black"
              opacity={i > 0 ? 0.3 : 1}
              strokeDasharray={i > 0 && i % 2 !== 0 && 4}
            />
            {i % 2 === 0 && (
              <text
                x={BAR_WIDTH_100 * factor + 32}
                y={height + 12}
                alignmentBaseline="middle"
                fontSize="10"
              >
                {`${i * 10}%`}
              </text>
            )}
          </>
        );
      })}
    </>
  );
}

function Tillering({ data }) {
  const rows = useMemo(
    () =>
      data[0]
        .map((naturalForest, index) => {
          const farmForest = data[1] && data[1][index];
          const type = forestTypeMapping[index];
          return { naturalForest, farmForest, type };
        })
        .filter(
          (r) =>
            (r.naturalForest && r.naturalForest.filter((t) => t).length) ||
            (r.farmForest && r.farmForest.filter((t) => t).length),
        ),
    [data],
  );

  if (rows.length === 0) {
    return null;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={rows.length * 34}
      viewBox={`0 0 310 ${rows.length * 34}`}
      x="0"
    >
      {rows.map((row, index) => renderRow(row, index))}
      <TilleringGrid height={rows.length * 28} />
      <text className={styles.label} x="40" y={rows.length * 34 - 3}>
        Naturwald
      </text>
      <rect
        width="20"
        height="20"
        x="10"
        y={rows.length * 33 - 10}
        className={`${styles.often} ${styles.line}`}
      />
      <text className={styles.label} x="180" y={rows.length * 34 - 3}>
        Wirtschaftswald
      </text>
      <rect
        width="20"
        height="20"
        x="150"
        y={rows.length * 33 - 10}
        className={`${styles.oftenSecondary} ${styles.line}`}
      />
    </svg>
  );
}

export default Tillering;
