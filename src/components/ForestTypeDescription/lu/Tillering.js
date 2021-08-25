/* eslint-disable react/prop-types */
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../Button';
import tillingStyles from './Tillering.module.css';
import styles from '../Diagram.module.css';

// const testTillingData = {
//   NW: {
//     Bu: [40, 80],
//     Ta: [0, 10],
//     Fi: [0, 10],
//     VBe: [0, 5],
//     WFö: [10, 20],
//     WLi: [0, 5],
//     TEi: [0, 10],
//     WAN: [90, 100],
//   },
//   WW: {
//     Bu: [0, 80],
//     Ta: [0, 10],
//     Fi: [0, 10],
//     VBe: null,
//     WFö: [0, 10],
//     WLi: [0, 5],
//     TEi: [0, 5],
//     WAN: [0, 5],
//   },
// };

const isArrayPlottable = (array) =>
  array?.length && !array.every((val) => val === null);

const treeMapping = [
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

const testTillingData = [
  [
    [0, 20],
    [0, 10],
    [0, 10],
    null,
    null,
    null,
    null,
    [80, 100],
    null,
    null,
    null,
    null,
    [0, 5],
    [0, 5],
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  // [null, null, null, null, null, null, null, null,null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [
    [0, 20],
    [0, 10],
    [0, 10],
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    [50, 70],
    [0, 5],
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  // null,
];

const getBarWidth = (value) => value * 2.5;

const renderBar = (name, index, incidence, chartMode) => {
  const barPadding = 1.6;
  const barHeight = 20 + barPadding;
  const barY = barPadding * 0.5 * index * 35;

  return (
    <g>
      <rect
        y={barY}
        x="40"
        width={incidence ? getBarWidth(incidence[1]) : 0}
        height={barHeight - barPadding}
        className={styles.medium}
      />
      {incidence && incidence[0] !== 0 && (
        <rect
          y={barY}
          x="40"
          width={getBarWidth(incidence[0])}
          height={barHeight - barPadding}
          className={styles.often}
        />
      )}
      <svg y={barY + 12} x="35" style={{ overflow: 'visible' }}>
        <text alignmentBaseline="middle" textAnchor="end">
          {name}
        </text>
      </svg>
    </g>
  );
};

const BAR_WIDTH_100 = getBarWidth(100);

function Tillering({ data = testTillingData }) {
  const { t } = useTranslation();
  const [chartMode, setChartMode] = useState(isArrayPlottable(data[0]) ? 0 : 1);
  const barItems = useMemo(
    () =>
      data[chartMode]?.reduce(
        (accumulated, currentValue, index) =>
          currentValue?.length !== 2
            ? accumulated
            : [
                ...accumulated,
                {
                  treeType: treeMapping[index],
                  value: currentValue,
                },
              ],
        [],
      ),
    [data, chartMode],
  );

  if (!data.length && data.every((arr) => !isArrayPlottable(arr))) {
    return null;
  }

  return (
    <div className={tillingStyles.barchart}>
      {data.length === 2 && data.every((arr) => isArrayPlottable(arr)) && (
        <Button.Group className={tillingStyles.modeswitcher}>
          <Button
            active={chartMode !== 1}
            content={t('forestType.naturalForest')}
            onClick={() => setChartMode(0)}
            className={tillingStyles.modebutton}
          />
          <Button
            active={chartMode !== 0}
            content={t('forestType.commercialForest')}
            onClick={() => setChartMode(1)}
          />
        </Button.Group>
      )}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height={barItems.length * 35}
        viewBox={`0 0 310 ${barItems.length * 35}`}
        x="0"
      >
        {barItems.map((item, idx) => renderBar(item.treeType, idx, item.value))}
        <line
          x1="40"
          y1={barItems.length * 28}
          x2={BAR_WIDTH_100 + 40}
          y2={barItems.length * 28}
          stroke="black"
        />
        {[...Array(11).keys()].map((i) => {
          const factor = i / 10;
          const percentage = i * 10;
          return (
            <>
              <line
                x1={BAR_WIDTH_100 * factor + 40}
                y1="0"
                x2={BAR_WIDTH_100 * factor + 40}
                y2={barItems.length * 28 + 5}
                stroke="black"
                opacity={i > 0 ? 0.3 : 1}
                strokeDasharray={i > 0 && 4}
              />
              <text
                x={BAR_WIDTH_100 * factor + 32}
                y={barItems.length * 28 + 12}
                alignmentBaseline="middle"
                fontSize="10"
              >
                {`${percentage}%`}
              </text>
            </>
          );
        })}
      </svg>
    </div>
  );
}

export default Tillering;
