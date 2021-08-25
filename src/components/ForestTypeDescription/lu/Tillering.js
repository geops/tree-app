/* eslint-disable react/prop-types */
import React, { useState, useMemo } from 'react';
import { Form, Checkbox } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import tillingStyles from './Tillering.module.css';
import styles from '../Diagram.module.css';

const testTillingData = {
  NW: {
    Bu: [40, 80],
    Ta: [0, 10],
    Fi: [0, 10],
    VBe: [0, 5],
    WFö: [10, 20],
    WLi: [0, 5],
    TEi: [0, 10],
    WAN: [90, 100],
  },
  WW: {
    Bu: [0, 80],
    Ta: [0, 10],
    Fi: [0, 10],
    VBe: null,
    WFö: [0, 10],
    WLi: [0, 5],
    TEi: [0, 5],
    WAN: [0, 5],
  },
};

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

      <text y={barY + 12} alignmentBaseline="middle">
        {name}
      </text>
    </g>
  );
};

const BAR_WIDTH_100 = getBarWidth(100);

function Tillering({ data = testTillingData }) {
  const { t } = useTranslation();
  const [chartMode, setChartMode] = useState('NW');
  const keys = useMemo(
    () => (data[chartMode] ? Object.keys(data[chartMode]) : []),
    [data, chartMode],
  );

  if (!keys.length) {
    return null;
  }

  return (
    <div className={tillingStyles.barchart}>
      <h2>{`${t('forestTypeDiagram.tillering')} (${
        chartMode === 'NW'
          ? `${t('forestType.naturalForest')}`
          : `${t('forestType.commercialForest')}`
      })`}</h2>
      {Object.keys(data).length === 2 && (
        <Form className={tillingStyles.radioButtons}>
          <Form.Field>
            <Checkbox
              radio
              label={`${t('forestType.naturalForest')}`}
              checked={chartMode === 'NW'}
              onChange={() => setChartMode('NW')}
              className={tillingStyles.checkbox}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              radio
              label={`${t('forestType.commercialForest')}`}
              checked={chartMode === 'WW'}
              onChange={() => setChartMode('WW')}
              className={tillingStyles.checkbox}
            />
          </Form.Field>
        </Form>
      )}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="420"
        height={keys.length * 40}
        ariaLabelledby="title"
        alignmentBaseline="middle"
      >
        {keys.map((treeType, idx) =>
          renderBar(treeType, idx, data[chartMode][treeType]),
        )}
        <line
          x1="40"
          y1={keys.length * 28}
          x2={BAR_WIDTH_100 + 40}
          y2={keys.length * 28}
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
                y2={keys.length * 28 + 5}
                stroke="black"
                opacity={i > 0 ? 0.5 : 1}
                strokeDasharray={i > 0 && 4}
              />
              <text
                x={BAR_WIDTH_100 * factor + 32}
                y={keys.length * 28 + 12}
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
