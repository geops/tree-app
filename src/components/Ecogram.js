import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import EcogramPopup from './EcogramPopup';
import styles from './Ecogram.module.css';

function Ecogram() {
  const [popup, setPopup] = useState({ target: null, forestTypes: [] });
  const { ecogram } = useSelector((state) => state.locationResult);
  const { t } = useTranslation();

  if (!ecogram) {
    return null;
  }

  return (
    <svg x="0px" y="0px" viewBox="0 0 1200 1200">
      <EcogramPopup
        forestTypes={popup.forestTypes}
        onClose={() => setPopup({ forestTypes: [] })}
        target={popup.target}
      />
      <g transform="translate(100,100)">
        <line x1="200" y1="0" x2="200" y2="1000" className={styles.grid} />
        <line x1="500" y1="0" x2="500" y2="1000" className={styles.grid} />
        <line x1="800" y1="0" x2="800" y2="1000" className={styles.grid} />
        <line x1="0" y1="200" x2="1000" y2="200" className={styles.grid} />
        <line x1="0" y1="500" x2="1000" y2="500" className={styles.grid} />
        <line x1="0" y1="800" x2="1000" y2="800" className={styles.grid} />
        {ecogram
          .sort((a, b) => a.z - b.z)
          .map(({ x, y, w, h, f, r }) => (
            <>
              <rect
                x={x}
                y={y}
                rx="5"
                ry="5"
                width={w}
                height={h}
                className={styles.box}
                onClick={({ target }) => setPopup({ target, forestTypes: f })}
              />
              {r ? (
                [...new Array(r)].map((_, i) => (
                  <text
                    x={x + w / 2}
                    y={y + h / 2 + 45 - (35 * r || 0) + 35 * (i + 1)}
                    className={styles.boxText}
                  >
                    {f
                      .slice(
                        Math.floor(f.length / r) * i,
                        Math.floor(f.length / r) * (i + 1),
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
        x="0"
        y="80"
        transform="rotate(270,100,100)"
        className={styles.label}
      >
        {t('ecogram.dry')}
      </text>
      <text
        x="-820"
        y="80"
        transform="rotate(270,100,100)"
        className={styles.label}
      >
        {t('ecogram.wet')}
      </text>
      <text x="180" y="1140" className={styles.label}>
        {t('ecogram.acid')}
      </text>
      <text x="1000" y="1140" className={styles.label}>
        {t('ecogram.alkaline')}
      </text>
    </svg>
  );
}

export default Ecogram;
