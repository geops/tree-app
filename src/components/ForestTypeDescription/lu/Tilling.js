/* eslint-disable react/prop-types */
import React, { useState, useMemo } from 'react';
import { Form, Checkbox } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import tillingStyles from './Tilling.module.css';
import styles from '../Diagram.module.css';

const testTillingData = {
  Bu: { WW: [0, 80], NW: [40, 80] },
  Ta: { WW: [0, 10], NW: [0, 10] },
  Fi: { WW: [0, 10], NW: [0, 10] },
  VBe: { WW: null, NW: [0, 5] },
  WFö: { WW: [0, 10], NW: [10, 20] },
  WLi: { WW: [0, 5], NW: [0, 5] },
  TEi: { WW: [0, 5], NW: [0, 10] },
  WAN: { WW: [0, 5], NW: [90, 100] },
};

const getBarWidth = (value) => value * 2.5;

const renderBar = (name, index, incidencesObj, chartMode) => {
  const barPadding = 1.6;
  const barHeight = 20 + barPadding;
  const barY = barPadding * 0.5 * index * 35;

  return (
    <g className="bar-group">
      <>
        <rect
          y={barY}
          x="40"
          width={
            incidencesObj[chartMode]
              ? getBarWidth(incidencesObj[chartMode][1])
              : 0
          }
          height={barHeight - barPadding}
          className={styles.medium}
        />
        {incidencesObj[chartMode] && incidencesObj[chartMode][0] !== 0 && (
          <rect
            y={barY}
            x="40"
            width={getBarWidth(incidencesObj[chartMode][0])}
            height={barHeight - barPadding}
            className={styles.often}
          />
        )}

        <text y={barY + 12} alignmentBaseline="middle">
          {name}
        </text>
      </>
    </g>
  );
};

const BAR_WIDTH_100 = getBarWidth(100);

function Tilling({ data = testTillingData }) {
  const { t } = useTranslation();
  const [chartMode, setChartMode] = useState('NW');
  const keys = useMemo(() => Object.keys(data), [data]);

  if (!keys.length) {
    return null;
  }

  return (
    <div className={tillingStyles.barchart}>
      <h2>{t('forestTypeDiagram.tillering')}</h2>
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="420"
        height={keys.length * 40}
        ariaLabelledby="title"
        alignmentBaseline="middle"
      >
        {keys.map((treeType, idx) =>
          renderBar(treeType, idx, data[treeType], chartMode),
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

export default Tilling;
