import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './Diagram.module.css';
import { getStyle } from './utils';

function Site({ altitude, aspect, slope }) {
  const { t } = useTranslation();
  return (
    <svg viewBox="0 0 400 400" style={{ margin: '20px 200px 0px' }}>
      <path
        className={getStyle(aspect, '15')}
        d="M303.1 312.4L282 265.6c6-2.9 13.1-4.5 21.2-4.5v51.3z"
      />
      <path
        className={getStyle(aspect, '14')}
        d="M303.1 312.4l-36.4-36.7a57.4 57.4 0 0115.2-10.1l21.2 46.8z"
      />
      <path
        className={getStyle(aspect, '13')}
        d="M303.1 312.4l-47.4-20.6a53.4 53.4 0 0111-16l36.4 36.6z"
      />
      <path
        className={getStyle(aspect, '12')}
        d="M303.1 312.4h-52c0-6.2 1.5-14.4 4.6-20.6l47.4 20.6z"
      />
      <path
        className={getStyle(aspect, '11')}
        d="M303.1 312.4l-47.7 20.1a61.2 61.2 0 01-4.2-20h52z"
      />
      <path
        className={getStyle(aspect, '10')}
        d="M303.1 312.4l-36.7 36.8c-4-4.6-9-10.2-11-16.7l47.7-20z"
      />
      <path
        className={getStyle(aspect, '9')}
        d="M303.1 312.4L282.5 360a48.7 48.7 0 01-16.1-10.7l36.7-36.8z"
      />
      <path
        className={getStyle(aspect, '8')}
        d="M303.1 364.1c-7.9 0-14.6-1.2-20.6-4.2l20.6-47.5v51.7z"
      />
      <path
        className={getStyle(aspect, '7')}
        d="M303.1 312.4l20.3 47.5a46.4 46.4 0 01-20.3 4.2v-51.7z"
      />
      <path
        className={getStyle(aspect, '6')}
        d="M339.8 348.6a43.6 43.6 0 01-16.4 11.3l-20.3-47.5 36.7 36.2z"
      />
      <path
        className={getStyle(aspect, '5')}
        d="M339.8 348.6l-36.7-36.2 47.4 19.8c-2.5 6.7-6 11.6-10.7 16.4z"
      />
      <path
        className={getStyle(aspect, '4')}
        d="M354.5 312.4a53.1 53.1 0 01-4 19.8l-47.4-19.8h51.4z"
      />
      <path
        className={getStyle(aspect, '3')}
        d="M354.5 312.4h-51.4l46.9-20.6c3.2 6.6 4.4 13.1 4.5 20.6z"
      />
      <path
        className={getStyle(aspect, '2')}
        d="M303.1 312.4l36.4-36.1a40.3 40.3 0 0110.5 15.5L303 312.4z"
      />
      <path
        className={getStyle(aspect, '1')}
        d="M303.1 312.4l19.5-47.4a49 49 0 0117 11.3L303 312.4z"
      />
      <path
        className={getStyle(aspect, '0')}
        d="M303.1 312.4v-51.3c7.1 0 13.5 1 19.5 4L303 312.3z"
      />
      <text x="247" y="226" className={styles.header}>
        {t('forestTypeDiagram.aspect.label')}
      </text>
      <text x="297" y="252">
        {t('forestTypeDiagram.aspect.N')}
      </text>
      <text x="297" y="385">
        {t('forestTypeDiagram.aspect.S')}
      </text>
      <text x="368" y="317">
        {t('forestTypeDiagram.aspect.E')}
      </text>
      <text x="228" y="316">
        {t('forestTypeDiagram.aspect.W')}
      </text>
      <path
        className={styles.line}
        d="M355 313a52 52 0 11-104 0 52 52 0 01104 0z"
      />
      <path
        className={styles.thinLine}
        d="M348 312h13m-116 0h13m77-31l10-10m-83 83l10-10m31 13v14m0-117v14m-31 13l-10-10m83 82l-10-9"
      />
      <path
        className={getStyle(slope, '5')}
        d="M250 68v107l45-96c-13-6-26-11-45-11z"
      />
      <path
        className={getStyle(slope, '4')}
        d="M250 175l65-83c-5-5-12-9-20-13l-45 96z"
      />
      <path
        className={getStyle(slope, '3')}
        d="M332 108l-82 67 65-83c7 5 12 10 17 16z"
      />
      <path
        className={getStyle(slope, '2')}
        d="M345 129l-95 46 82-67c4 5 9 12 13 21z"
      />
      <path
        className={getStyle(slope, '1')}
        d="M353 151l-103 24 95-46c4 6 6 14 8 22z"
      />
      <path
        className={getStyle(slope, '0')}
        d="M250 175l103-24c2 7 3 17 3 24H250z"
      />
      <text x="244" y="34" className={styles.header}>
        {t('forestTypeDiagram.slope')}
      </text>
      <text x="282" y="66">
        100%
      </text>
      <text x="317" y="84">
        75%
      </text>
      <text x="339" y="104">
        50%
      </text>
      <text x="354" y="128">
        25%
      </text>
      <text x="362" y="152">
        10%
      </text>
      <path className={styles.line} d="M250 175V68c58 1 106 49 106 107H250z" />
      <path
        className={styles.thinLine}
        d="M311 97l8-10M297 73l-5 12M327 113l11-9M352 126l-13 6M360 149l-13 3"
      />
      <path
        d="M69.7 120.3h26.5v5.6H69.7z"
        className={getStyle(altitude, '0.41')}
      />
      <path
        d="M69.7 125.8h26.5v5.5H69.7z"
        className={getStyle(altitude, '0.40')}
      />
      <path
        d="M69.7 131.3h26.5v5.6H69.7z"
        className={getStyle(altitude, '0.39')}
      />
      <path
        d="M69.7 136.9h26.5v5.5H69.7z"
        className={getStyle(altitude, '0.38')}
      />
      <path
        d="M69.7 142.4h26.5v5.4H69.7z"
        className={getStyle(altitude, '0.37')}
      />
      <path
        d="M69.7 147.8h26.5v5.4H69.7z"
        className={getStyle(altitude, '0.36')}
      />
      <path
        d="M69.7 153.3h26.5v5.6H69.7z"
        className={getStyle(altitude, '0.35')}
      />
      <path
        d="M69.7 158.8h26.5v5.6H69.7z"
        className={getStyle(altitude, '0.34')}
      />
      <path
        d="M69.7 164.4h26.5v5.5H69.7z"
        className={getStyle(altitude, '0.33')}
      />
      <path
        d="M69.7 169.9h26.5v5.5H69.7z"
        className={getStyle(altitude, '0.32')}
      />
      <path
        d="M69.7 175.4h26.5v5.6H69.7z"
        className={getStyle(altitude, '0.31')}
      />
      <path
        d="M69.7 181h26.5v5.6H69.7z"
        className={getStyle(altitude, '0.30')}
      />
      <path
        d="M69.7 186.6h26.5v5.6H69.7z"
        className={getStyle(altitude, '0.29')}
      />
      <path
        d="M69.7 192.2h26.5v5.6H69.7z"
        className={getStyle(altitude, '0.28')}
      />
      <path
        d="M69.7 197.8h26.5v5.5H69.7z"
        className={getStyle(altitude, '0.27')}
      />
      <path
        d="M69.7 203.3h26.5v5.5H69.7z"
        className={getStyle(altitude, '0.26')}
      />
      <path
        d="M69.7 208.8h26.5v5.6H69.7z"
        className={getStyle(altitude, '0.25')}
      />
      <path
        d="M69.7 214.4h26.5v5.6H69.7z"
        className={getStyle(altitude, '0.24')}
      />
      <path
        d="M69.7 220h26.5v5.7H69.7z"
        className={getStyle(altitude, '0.23')}
      />
      <path
        d="M69.7 225.6h26.5v5.7H69.7z"
        className={getStyle(altitude, '0.22')}
      />
      <path
        d="M69.7 231.3h26.5v5.5H69.7z"
        className={getStyle(altitude, '0.21')}
      />
      <path
        d="M69.7 236.8h26.5v5.5H69.7z"
        className={getStyle(altitude, '0.20')}
      />
      <path
        d="M69.7 242.2h26.5v5.5H69.7z"
        className={getStyle(altitude, '0.19')}
      />
      <path
        d="M69.7 247.8h26.5v5.5H69.7z"
        className={getStyle(altitude, '0.18')}
      />
      <path
        d="M69.7 253.3h26.5v5.5H69.7z"
        className={getStyle(altitude, '0.17')}
      />
      <path
        d="M69.7 258.9h26.5v5.8H69.7z"
        className={getStyle(altitude, '0.16')}
      />
      <path
        d="M69.7 264.6h26.5v5.5H69.7z"
        className={getStyle(altitude, '0.15')}
      />
      <path
        d="M69.7 270.1h26.5v5.5H69.7z"
        className={getStyle(altitude, '0.14')}
      />
      <path
        d="M69.7 275.6h26.5v5.5H69.7z"
        className={getStyle(altitude, '0.13')}
      />
      <path
        d="M69.7 281.1h26.5v5.5H69.7z"
        className={getStyle(altitude, '0.12')}
      />
      <path
        d="M69.7 286.7h26.5v5.7H69.7z"
        className={getStyle(altitude, '0.11')}
      />
      <path
        d="M69.7 292.3h26.5v5.7H69.7z"
        className={getStyle(altitude, '0.10')}
      />
      <path
        d="M69.7 298h26.5v5.5H69.7z"
        className={getStyle(altitude, '0.9')}
      />
      <path
        d="M69.7 303.5h26.5v5.5H69.7z"
        className={getStyle(altitude, '0.8')}
      />
      <path
        d="M69.7 308.9h26.5v5.5H69.7z"
        className={getStyle(altitude, '0.7')}
      />
      <path
        d="M69.7 314.5h26.5v5.5H69.7z"
        className={getStyle(altitude, '0.6')}
      />
      <path
        d="M69.7 320h26.5v5.7H69.7z"
        className={getStyle(altitude, '0.5')}
      />
      <path
        d="M69.7 325.7h26.5v5.7H69.7z"
        className={getStyle(altitude, '0.4')}
      />
      <path
        d="M69.7 331.3h26.5v5.5H69.7z"
        className={getStyle(altitude, '0.3')}
      />
      <path
        d="M69.7 336.8h26.5v5.5H69.7z"
        className={getStyle(altitude, '0.2')}
      />
      <path
        d="M69.7 342.3h26.5v5.4H69.7z"
        className={getStyle(altitude, '0.1')}
      />
      <path
        d="M69.7 347.7h26.5v5.4H69.7z"
        className={getStyle(altitude, '0.0')}
      />

      <path
        d="M96.2 120.3h26.5v5.6H96.2z"
        className={getStyle(altitude, '1.41')}
      />
      <path
        d="M96.2 125.8h26.5v5.5H96.2z"
        className={getStyle(altitude, '1.40')}
      />
      <path
        d="M96.2 131.3h26.5v5.6H96.2z"
        className={getStyle(altitude, '1.39')}
      />
      <path
        d="M96.2 136.9h26.5v5.5H96.2z"
        className={getStyle(altitude, '1.38')}
      />
      <path
        d="M96.2 142.4h26.5v5.4H96.2z"
        className={getStyle(altitude, '1.37')}
      />
      <path
        d="M96.2 147.8h26.5v5.4H96.2z"
        className={getStyle(altitude, '1.36')}
      />
      <path
        d="M96.2 153.3h26.5v5.6H96.2z"
        className={getStyle(altitude, '1.35')}
      />
      <path
        d="M96.2 158.8h26.5v5.6H96.2z"
        className={getStyle(altitude, '1.34')}
      />
      <path
        d="M96.2 164.4h26.5v5.5H96.2z"
        className={getStyle(altitude, '1.33')}
      />
      <path
        d="M96.2 169.9h26.5v5.5H96.2z"
        className={getStyle(altitude, '1.32')}
      />
      <path
        d="M96.2 175.4h26.5v5.6H96.2z"
        className={getStyle(altitude, '1.31')}
      />
      <path
        d="M96.2 181h26.5v5.6H96.2z"
        className={getStyle(altitude, '1.30')}
      />
      <path
        d="M96.2 186.6h26.5v5.6H96.2z"
        className={getStyle(altitude, '1.29')}
      />
      <path
        d="M96.2 192.2h26.5v5.6H96.2z"
        className={getStyle(altitude, '1.28')}
      />
      <path
        d="M96.2 197.8h26.5v5.5H96.2z"
        className={getStyle(altitude, '1.27')}
      />
      <path
        d="M96.2 203.3h26.5v5.5H96.2z"
        className={getStyle(altitude, '1.26')}
      />
      <path
        d="M96.2 208.8h26.5v5.6H96.2z"
        className={getStyle(altitude, '1.25')}
      />
      <path
        d="M96.2 214.4h26.5v5.6H96.2z"
        className={getStyle(altitude, '1.24')}
      />
      <path
        d="M96.2 220h26.5v5.7H96.2z"
        className={getStyle(altitude, '1.23')}
      />
      <path
        d="M96.2 225.6h26.5v5.7H96.2z"
        className={getStyle(altitude, '1.22')}
      />
      <path
        d="M96.2 231.3h26.5v5.5H96.2z"
        className={getStyle(altitude, '1.21')}
      />
      <path
        d="M96.2 236.8h26.5v5.5H96.2z"
        className={getStyle(altitude, '1.20')}
      />
      <path
        d="M96.2 242.2h26.5v5.5H96.2z"
        className={getStyle(altitude, '1.19')}
      />
      <path
        d="M96.2 247.8h26.5v5.5H96.2z"
        className={getStyle(altitude, '1.18')}
      />
      <path
        d="M96.2 253.3h26.5v5.5H96.2z"
        className={getStyle(altitude, '1.17')}
      />
      <path
        d="M96.2 258.9h26.5v5.8H96.2z"
        className={getStyle(altitude, '1.16')}
      />
      <path
        d="M96.2 264.6h26.5v5.5H96.2z"
        className={getStyle(altitude, '1.15')}
      />
      <path
        d="M96.2 270.1h26.5v5.5H96.2z"
        className={getStyle(altitude, '1.14')}
      />
      <path
        d="M96.2 275.6h26.5v5.5H96.2z"
        className={getStyle(altitude, '1.13')}
      />
      <path
        d="M96.2 281.1h26.5v5.5H96.2z"
        className={getStyle(altitude, '1.12')}
      />
      <path
        d="M96.2 286.7h26.5v5.7H96.2z"
        className={getStyle(altitude, '1.11')}
      />
      <path
        d="M96.2 292.3h26.5v5.7H96.2z"
        className={getStyle(altitude, '1.10')}
      />
      <path
        d="M96.2 298h26.5v5.5H96.2z"
        className={getStyle(altitude, '1.9')}
      />
      <path
        d="M96.2 303.5h26.5v5.5H96.2z"
        className={getStyle(altitude, '1.8')}
      />
      <path
        d="M96.2 308.9h26.5v5.5H96.2z"
        className={getStyle(altitude, '1.7')}
      />
      <path
        d="M96.2 314.5h26.5v5.5H96.2z"
        className={getStyle(altitude, '1.6')}
      />
      <path
        d="M96.2 320h26.5v5.7H96.2z"
        className={getStyle(altitude, '1.5')}
      />
      <path
        d="M96.2 325.7h26.5v5.7H96.2z"
        className={getStyle(altitude, '1.4')}
      />
      <path
        d="M96.2 331.3h26.5v5.5H96.2z"
        className={getStyle(altitude, '1.3')}
      />
      <path
        d="M96.2 336.8h26.5v5.5H96.2z"
        className={getStyle(altitude, '1.2')}
      />
      <path
        d="M96.2 342.3h26.5v5.4H96.2z"
        className={getStyle(altitude, '1.1')}
      />
      <path
        d="M96.2 347.7h26.5v5.4H96.2z"
        className={getStyle(altitude, '1.0')}
      />

      <path
        d="M122.7 120.3H149v5.6h-26.3z"
        className={getStyle(altitude, '2.41')}
      />
      <path
        d="M122.7 125.8H149v5.5h-26.3z"
        className={getStyle(altitude, '2.40')}
      />
      <path
        d="M122.7 131.3H149v5.6h-26.3z"
        className={getStyle(altitude, '2.39')}
      />
      <path
        d="M122.7 136.9H149v5.5h-26.3z"
        className={getStyle(altitude, '2.38')}
      />
      <path
        d="M122.7 142.4H149v5.4h-26.3z"
        className={getStyle(altitude, '2.37')}
      />
      <path
        d="M122.7 147.8H149v5.4h-26.3z"
        className={getStyle(altitude, '2.36')}
      />
      <path
        d="M122.7 153.3H149v5.6h-26.3z"
        className={getStyle(altitude, '2.35')}
      />
      <path
        d="M122.7 158.8H149v5.6h-26.3z"
        className={getStyle(altitude, '2.34')}
      />
      <path
        d="M122.7 164.4H149v5.5h-26.3z"
        className={getStyle(altitude, '2.33')}
      />
      <path
        d="M122.7 169.9H149v5.5h-26.3z"
        className={getStyle(altitude, '2.32')}
      />
      <path
        d="M122.7 175.4H149v5.6h-26.3z"
        className={getStyle(altitude, '2.31')}
      />
      <path
        d="M122.7 181H149v5.6h-26.3z"
        className={getStyle(altitude, '2.30')}
      />
      <path
        d="M122.7 186.6H149v5.6h-26.3z"
        className={getStyle(altitude, '2.29')}
      />
      <path
        d="M122.7 192.2H149v5.6h-26.3z"
        className={getStyle(altitude, '2.28')}
      />
      <path
        d="M122.7 197.8H149v5.5h-26.3z"
        className={getStyle(altitude, '2.27')}
      />
      <path
        d="M122.7 203.3H149v5.5h-26.3z"
        className={getStyle(altitude, '2.26')}
      />
      <path
        d="M122.7 208.8H149v5.6h-26.3z"
        className={getStyle(altitude, '2.25')}
      />
      <path
        d="M122.7 214.4H149v5.6h-26.3z"
        className={getStyle(altitude, '2.24')}
      />
      <path
        d="M122.7 220H149v5.7h-26.3z"
        className={getStyle(altitude, '2.23')}
      />
      <path
        d="M122.7 225.6H149v5.7h-26.3z"
        className={getStyle(altitude, '2.22')}
      />
      <path
        d="M122.7 231.3H149v5.5h-26.3z"
        className={getStyle(altitude, '2.21')}
      />
      <path
        d="M122.7 236.8H149v5.5h-26.3z"
        className={getStyle(altitude, '2.20')}
      />
      <path
        d="M122.7 242.2H149v5.5h-26.3z"
        className={getStyle(altitude, '2.19')}
      />
      <path
        d="M122.7 247.8H149v5.5h-26.3z"
        className={getStyle(altitude, '2.18')}
      />
      <path
        d="M122.7 253.3H149v5.5h-26.3z"
        className={getStyle(altitude, '2.17')}
      />
      <path
        d="M122.7 258.8H149v5.8h-26.3z"
        className={getStyle(altitude, '2.16')}
      />
      <path
        d="M122.7 264.6H149v5.5h-26.3z"
        className={getStyle(altitude, '2.15')}
      />
      <path
        d="M122.7 270.1H149v5.5h-26.3z"
        className={getStyle(altitude, '2.14')}
      />
      <path
        d="M122.7 275.6H149v5.5h-26.3z"
        className={getStyle(altitude, '2.13')}
      />
      <path
        d="M122.7 281.1H149v5.5h-26.3z"
        className={getStyle(altitude, '2.12')}
      />
      <path
        d="M122.7 286.7H149v5.7h-26.3z"
        className={getStyle(altitude, '2.11')}
      />
      <path
        d="M122.7 292.3H149v5.7h-26.3z"
        className={getStyle(altitude, '2.10')}
      />
      <path
        d="M122.7 298H149v5.5h-26.3z"
        className={getStyle(altitude, '2.9')}
      />
      <path
        d="M122.7 303.5H149v5.5h-26.3z"
        className={getStyle(altitude, '2.8')}
      />
      <path
        d="M122.7 308.9H149v5.5h-26.3z"
        className={getStyle(altitude, '2.7')}
      />
      <path
        d="M122.7 314.5H149v5.5h-26.3z"
        className={getStyle(altitude, '2.6')}
      />
      <path
        d="M122.7 320H149v5.7h-26.3z"
        className={getStyle(altitude, '2.5')}
      />
      <path
        d="M122.7 325.7H149v5.7h-26.3z"
        className={getStyle(altitude, '2.4')}
      />
      <path
        d="M122.7 331.3H149v5.5h-26.3z"
        className={getStyle(altitude, '2.3')}
      />
      <path
        d="M122.7 336.8H149v5.5h-26.3z"
        className={getStyle(altitude, '2.2')}
      />
      <path
        d="M122.7 342.3H149v5.4h-26.3z"
        className={getStyle(altitude, '2.1')}
      />
      <path
        d="M122.7 347.7H149v5.4h-26.3z"
        className={getStyle(altitude, '2.0')}
      />
      <path
        className={styles.line}
        d="M123 120v233M70 120h79v233H70zM96 120v233M70 131h79M70 142h79M70 164h79M70 175h79M70 198h79M70 209h79M70 231h79M70 242h79M70 265h79M70 276h79M70 298h79M70 309h79M70 331h79M70 342h79"
      />
      <text x="16" y="34" className={styles.header}>
        {t('forestTypeDiagram.altitude.label')}
      </text>
      <text x="-1" y="76">
        {t('forestTypeDiagram.meter')}
      </text>
      <text x="25" y="96">
        {t('forestTypeDiagram.aboveSeaLevel')}
      </text>
      <text x="74" y="76">
        {t('forestTypeDiagram.altitude.situation')}
      </text>
      <text x="81" y="109">
        {t('forestTypeDiagram.altitude.aspect')}
      </text>
      <path
        className={styles.line}
        d="M149 320H63M149 287H63M149 253H63M149 220H63M149 187H63M149 153H63"
      />
      <text x="25" y="122">
        2300
      </text>
      <text x="25" y="156">
        2000
      </text>
      <text x="25" y="189">
        1700
      </text>
      <text x="25" y="222">
        1400
      </text>
      <text x="26" y="256">
        1100
      </text>
      <text x="33" y="289">
        800
      </text>
      <text x="33" y="323">
        500
      </text>
      <text x="33" y="356">
        200
      </text>
      <path className={styles.line} d="M63 120h6M63 353h6" />
    </svg>
  );
}

Site.propTypes = {
  altitude: PropTypes.arrayOf(PropTypes.number).isRequired,
  aspect: PropTypes.arrayOf(PropTypes.number).isRequired,
  slope: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Site;
