import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { setForestTypes } from '../store/actions';

function Ecogram() {
  const dispatch = useDispatch();
  const { ecogram } = useSelector(state => state.locateResult);
  const { t } = useTranslation();

  if (!ecogram) {
    return null;
  }

  return (
    <svg x="0px" y="0px" viewBox="0 0 1200 1200">
      <g transform="translate(100,100)">
        <line x1="200" y1="0" x2="200" y2="1000" stroke="#b0cdeb" />
        <line x1="500" y1="0" x2="500" y2="1000" stroke="#b0cdeb" />
        <line x1="800" y1="0" x2="800" y2="1000" stroke="#b0cdeb" />
        <line x1="0" y1="200" x2="1000" y2="200" stroke="#b0cdeb" />
        <line x1="0" y1="500" x2="1000" y2="500" stroke="#b0cdeb" />
        <line x1="0" y1="800" x2="1000" y2="800" stroke="#b0cdeb" />
        <rect
          x={0}
          y={0}
          width={1000}
          height={1000}
          fill="transparent"
          stroke="black"
          strokeWidth="2"
        />
        {ecogram
          .sort((a, b) => a.z - b.z)
          .map(({ x, y, w, h, f }) => (
            <>
              <rect
                x={x}
                y={y}
                width={w}
                height={h}
                fill="#b0cdeb"
                onClick={() => dispatch(setForestTypes(f))}
              />
              <text
                x={x + w / 2}
                y={y + h / 2 + 10}
                fontSize="2em"
                textAnchor="middle"
              >
                {f.join(' ')}
              </text>
            </>
          ))}
      </g>
      <text
        x="0"
        y="80"
        transform="rotate(270,100,100)"
        fontSize="2em"
        textAnchor="middle"
      >
        {t('ecogram.dry')}
      </text>
      <text
        x="-820"
        y="80"
        transform="rotate(270,100,100)"
        fontSize="2em"
        textAnchor="middle"
      >
        {t('ecogram.wet')}
      </text>
      <text x="180" y="1140" fontSize="2em" textAnchor="middle">
        {t('ecogram.acid')}
      </text>
      <text x="1000" y="1140" fontSize="2em" textAnchor="middle">
        {t('ecogram.alkaline')}
      </text>
    </svg>
  );
}

export default Ecogram;
