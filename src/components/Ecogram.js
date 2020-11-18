import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import EcogramPopup from './EcogramPopup';
import styles from './Ecogram.module.css';

function Ecogram({ data, selectForestType }) {
  const [popup, setPopup] = useState({ target: null, forestTypes: [] });
  const { t } = useTranslation();

  return (
    <svg x="0px" y="0px" viewBox="0 0 1050 1050" className={styles.svg}>
      <EcogramPopup
        forestTypes={popup.forestTypes}
        onClose={() => setPopup({ forestTypes: [] })}
        selectForestType={selectForestType}
        target={popup.target}
        x={popup.x}
      />
      <g transform="translate(49,1)">
        <line x1="200" y1="0" x2="200" y2="1000" className={styles.grid} />
        <line x1="500" y1="0" x2="500" y2="1000" className={styles.grid} />
        <line x1="800" y1="0" x2="800" y2="1000" className={styles.grid} />
        <line x1="0" y1="200" x2="1000" y2="200" className={styles.grid} />
        <line x1="0" y1="492" x2="1000" y2="492" className={styles.grid} />
        <line x1="0" y1="800" x2="1000" y2="800" className={styles.grid} />
        {data
          .sort((a, b) => a.z - b.z)
          .map(({ a, x, y, w, h, f, r, ox, oy }) => (
            <>
              <rect
                x={x}
                y={y}
                rx="5"
                ry="5"
                width={w}
                height={h}
                className={`${styles.box} ${a && styles.active}`}
                onClick={({ target }) =>
                  setPopup({ target, forestTypes: f, x: x + w / 2 })
                }
              />
              {r || ox || oy ? (
                [...new Array(r)].map((_, i) => (
                  <text
                    x={x + w / 2 + ox * 10}
                    y={y + h / 2 - (20 * r || 0) + 35 * (i + 1) - 35 * oy}
                    className={styles.boxText}
                  >
                    {f
                      .slice(
                        Math.floor(f.length / r) * i,
                        i + 1 === r
                          ? f.length
                          : Math.floor(f.length / r) * (i + 1),
                      )
                      .join(' ')}
                  </text>
                ))
              ) : (
                <text
                  x={x + w / 2}
                  y={y + h / 2 + 10}
                  className={styles.boxText}
                >
                  {f.join(' ')}
                </text>
              )}
            </>
          ))}
        <rect x={0} y={0} width={1000} height={1000} className={styles.frame} />
      </g>
      <text
        x="100"
        y="30"
        transform="rotate(270,100,100)"
        className={styles.label}
      >
        {t('ecogram.dry')}
      </text>
      <text
        x="-720"
        y="30"
        transform="rotate(270,100,100)"
        className={styles.label}
      >
        {t('ecogram.wet')}
      </text>
      <text x="150" y="1040" className={styles.label}>
        {t('ecogram.acid')}
      </text>
      <text x="940" y="1040" className={styles.label}>
        {t('ecogram.alkaline')}
      </text>
    </svg>
  );
}

Ecogram.propTypes = {
  data: PropTypes.arrayOf().isRequired,
  selectForestType: PropTypes.func.isRequired,
};

export default Ecogram;
