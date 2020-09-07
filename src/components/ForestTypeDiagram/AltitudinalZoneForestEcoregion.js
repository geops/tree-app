import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line import/no-unresolved
import { info } from 'lib/src';

import styles from './Diagram.module.css';
import { getStyle } from './utils';

function AltitudinalZoneForestEcoregion({ data }) {
  const { i18n, t } = useTranslation();
  return (
    <svg x="0px" y="0px" viewBox="0 0 800 400">
      <path
        className={getStyle(data, '8.1')}
        d="M749.818,250.625l0.084,84.298l-53.301,0.045l0.021,-67.703l53.196,-16.64Z"
      />
      <path
        className={getStyle(data, '8.2')}
        d="M696.596,221.03l23.575,2.656l29.852,14.41l-0.205,12.529l-53.196,16.64l-0.026,-46.235Z"
      />
      <path
        className={getStyle(data, '8.3')}
        d="M696.596,221.03l23.567,2.655l-23.567,-11.429l-0,8.774Z"
      />
      <path
        className={getStyle(data, '7.1')}
        d="M696.601,251.186l0,83.782l-57.973,0.049l0.045,-67.204l57.928,-16.627Z"
      />
      <path
        className={getStyle(data, '7.3')}
        d="M638.628,259.475l0.045,8.337l57.928,-16.626l-0,-30.174l-57.973,38.463Z"
      />
      <path
        className={getStyle(data, '7.4')}
        d="M638.631,214.437l-0,45.037l57.965,-38.444l-57.965,-6.593Z"
      />
      <path
        className={getStyle(data, '7.5')}
        d="M638.631,214.437l57.965,6.593l-0,-8.774l-57.879,-28.059l-0.086,30.24Z"
      />
      <path
        className={getStyle(data, '6.0')}
        d="M638.628,259.475l0,75.542l-2.669,-0l-50.569,-39.031l0.043,-28.055l53.195,-8.456Z"
      />
      <path
        className={getStyle(data, '6.1')}
        d="M585.39,208.398l0.043,59.533l53.198,-8.457l-0,-45.037l-53.241,-6.039Z"
      />
      <path
        className={getStyle(data, '6.2')}
        d="M585.39,208.398l53.327,6.049l0,-30.25l-11.784,-5.65l-41.543,-6.552l0,36.403Z"
      />
      <path
        className={getStyle(data, '6.3')}
        d="M585.39,171.995l41.543,6.552l-41.543,-20.203l0,13.651Z"
      />
      <path
        className={getStyle(data, '5.0')}
        d="M585.39,295.986l0,-87.588l-30.707,-3.483l-41.881,5.493l0,87.406l37.267,-29.09l35.321,27.262Z"
      />
      <path
        className={getStyle(data, '5.1')}
        d="M512.802,210.408l41.881,-5.493l30.707,3.483l0,-36.403l-31.015,-4.893l-41.573,7.839l-0,35.467Z"
      />
      <path
        className={getStyle(data, '5.2')}
        d="M512.802,174.941l41.573,-7.839l31.015,4.893l0,-13.651l-37.882,-18.366l-34.706,27.123l-0,7.84Z"
      />
      <path
        className={getStyle(data, '4.0')}
        d="M465.499,299.863l14.354,0.625l32.949,-49.678l0,47.004l-47.228,37.104l-0.075,-35.055Z"
      />
      <path
        className={getStyle(data, '4.1')}
        d="M465.451,210.408l0.048,89.455l14.354,0.625l32.949,-49.678l0,-40.402l-47.351,0Z"
      />
      <path
        className={getStyle(data, '4.2')}
        d="M511.757,252.386l-46.29,0l0.032,47.477l14.354,0.625l31.904,-48.102Z"
      />
      <rect
        className={getStyle(data, '4.3')}
        x="465.451"
        y="210.408"
        width="47.351"
        height="11.341"
      />
      <path
        className={getStyle(data, 'forestEcoregion.2b.90')}
        d="M465.451,210.408l47.351,0l-0,-35.467l-47.351,8.536l-0,26.931Z"
      />
      <path
        className={getStyle(data, 'forestEcoregion.2b.100')}
        d="M499.761,177.291l13.041,-2.35l-0,-7.84l-13.041,10.19Z"
      />
      <path
        className={getStyle(data, '3.0')}
        d="M417.839,334.918l47.735,0l-0.123,-57.779l-8.349,9.829l-8.315,17.608l-30.948,9.158l-0,21.184Z"
      />
      <path
        className={getStyle(data, '3.1')}
        d="M417.839,313.734l30.948,-9.158l8.315,-17.608l-39.278,15.655l0.015,11.111Z"
      />
      <path
        className={getStyle(data, '3.2')}
        d="M417.824,302.623l-0.064,-37.378l0.89,-0.079l46.817,-12.78l-0.016,24.795l-8.349,9.787l-20.911,8.334l-18.367,7.321Z"
      />
      <path
        className={getStyle(data, '3.3')}
        d="M417.899,236.389l-0.145,28.855l47.713,-12.858l-0.016,-30.637l-47.552,14.64Z"
      />
      <path
        className={getStyle(data, '3.4')}
        d="M417.949,210.408l-0.05,25.981l47.552,-14.64l-0,-11.341l-47.502,0Z"
      />
      <path
        className={getStyle(data, '3.5')}
        d="M417.949,191.889l0,18.519l47.502,0l-0,-26.931l-47.502,8.412Z"
      />
      <path
        className={getStyle(data, '2.0')}
        d="M417.839,313.734l-0,21.184l-106.044,0l-0.009,-21.204l106.053,0.02Z"
      />
      <path
        className={getStyle(data, '2.1')}
        d="M417.824,302.623l0.015,11.111l-106.052,-0.02l-0.077,-27.997l106.114,16.906Z"
      />
      <path
        className={getStyle(data, '2.2')}
        d="M417.76,265.245l0.064,37.378l-106.114,-16.906l-0.097,-36.81l106.147,16.338Z"
      />
      <path
        className={getStyle(data, '2.3')}
        d="M311.518,222.096l0.095,26.811l106.141,16.337l0.145,-28.855l-106.381,-14.293Z"
      />
      <path
        className={getStyle(data, '2.4')}
        d="M311.518,222.096l106.381,14.293l0.086,-25.981l-104.602,0l-17.861,17.29l15.996,-5.602Z"
      />
      <path
        className={getStyle(data, '2.5')}
        d="M313.383,210.408l104.566,0l0,-18.519l-104.566,18.519Z"
      />
      <path
        className={getStyle(data, '1.0')}
        d="M311.795,313.714l-0,21.204l-117.383,0l-0.001,-10.692l10.991,-10.512l106.393,0Z"
      />
      <path
        className={getStyle(data, '1.1')}
        d="M311.71,285.717l0.085,27.997l-106.393,0l13.104,-12.394l93.204,-15.603Z"
      />
      <path
        className={getStyle(data, '1.2')}
        d="M311.71,285.717l-93.204,15.603l41.07,-39.474l52.037,-12.939l0.097,36.81Z"
      />
      <path
        className={getStyle(data, '1.3')}
        d="M259.576,261.846l52.037,-12.939l-0.095,-26.811l-15.996,5.602l-35.946,34.148Z"
      />
      <path
        className={getStyle(data, '0.0')}
        d="M194.412,324.228l-0,10.69l-111.987,0l0.06,-21.277l104.749,0.053l7.178,10.534Z"
      />
      <path
        className={getStyle(data, '0.1')}
        d="M88.3,298.694l-5.814,14.947l104.749,0.053l-20.695,-30.575l-78.24,15.575Z"
      />
      <path
        className={getStyle(data, '0.4')}
        d="M114.052,232.497l13.024,-7.801l-6.282,-9.531l-6.742,17.332Z"
      />
      <path
        className={getStyle(data, '0.3')}
        d="M101.707,264.562l43.836,-12.688l-18.467,-27.178l-13.024,7.801l-12.345,32.065Z"
      />
      <path
        className={getStyle(data, '0.2')}
        d="M101.707,264.562l43.836,-12.688l20.997,31.245l-78.24,15.575l13.407,-34.132Z"
      />
      <text x="41.5px" y="31.567px">
        {t('forestTypeDiagram.altitudinalZoneForestEcoregion')}
      </text>
      <text x="12.426px" y="108.131px">
        {t('forestTypeDiagram.meter')}
      </text>
      <text x="40.895px" y="126.241px">
        {t('forestTypeDiagram.aboveSeaLevel')}
      </text>
      <text x="40.091px" y="175.302px">
        2000
      </text>
      <text x="40.091px" y="215.57px">
        1600
      </text>
      <text x="48.603px" y="280.903px">
        800
      </text>
      <text x="135.08px" y="114.989px">
        J
      </text>
      <text x="246.621px" y="114.989px">
        M
      </text>
      <text x="360.295px" y="114.989px">
        1
      </text>
      <text x="461.123px" y="114.989px">
        2
      </text>
      <text x="544.888px" y="114.989px">
        3
      </text>
      <text x="607.807px" y="114.989px">
        4
      </text>
      <text x="691.455px" y="114.989px">
        5
      </text>
      <text x="432.806px" y="129.774px">
        2a
      </text>
      <text x="480.554px" y="129.774px">
        2b
      </text>
      <text x="658.798px" y="129.774px">
        5a
      </text>
      <text x="714.755px" y="129.774px">
        5b
      </text>
      <text x="108.566px" y="68px">
        {info('forestEcoregion', 'J')[i18n.language]}
      </text>
      <text x="194.148px" y="68px">
        {info('forestEcoregion', 'M')[i18n.language]}
      </text>
      <text x="293.787px" y="68px">
        {t('forestTypeDiagram.forestEcoregion.1')}
      </text>
      <text x="406.322px" y="68px">
        {t('forestTypeDiagram.forestEcoregion.2')}
      </text>
      <text x="490.45px" y="68px">
        {t('forestTypeDiagram.forestEcoregion.3')}
      </text>
      <text x="575.771px" y="52.576px">
        {t('forestTypeDiagram.forestEcoregion.4')}
      </text>
      <text x="626.548px" y="63.379px">
        {t('forestTypeDiagram.forestEcoregion.5')}
      </text>
      <text x="85.083px" y="362.948px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.100')}
      </text>
      <text x="85.083px" y="385.907px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.90')}
      </text>
      <text x="267.53px" y="362.948px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.80')}
      </text>
      <text x="267.53px" y="385.907px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.60')}
      </text>
      <text x="469.189px" y="362.948px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.50')}
      </text>
      <text x="469.189px" y="385.907px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.40')}
      </text>
      <text x="665.273px" y="362.948px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.20')}
      </text>
      <text x="122.797px" y="362.948px">
        {info('altitudinalZone', '100')[i18n.language]}
      </text>
      <text x="122.797px" y="385.907px">
        {info('altitudinalZone', '90')[i18n.language]}
      </text>
      <text x="303.184px" y="362.948px">
        {info('altitudinalZone', '80')[i18n.language]}
      </text>
      <text x="303.184px" y="385.907px">
        {info('altitudinalZone', '60')[i18n.language]}
      </text>
      <text x="504.226px" y="362.948px">
        {info('altitudinalZone', '50')[i18n.language]}
      </text>
      <text x="504.226px" y="385.907px">
        {info('altitudinalZone', '40')[i18n.language]}
      </text>
      <text x="688.795px" y="362.948px">
        {info('altitudinalZone', '20')[i18n.language]}
      </text>
      <text x="546.998px" y="164.417px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.100')}
      </text>
      <text x="512.869px" y="199.447px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.90')}
      </text>
      <text x="629.865px" y="199.447px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.90')}
      </text>
      <text x="579.185px" y="237.329px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.80')}
      </text>
      <text x="409.781px" y="224.796px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.80')}
      </text>
      <text x="126.716px" y="222.787px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.80')}
      </text>
      <text x="305.309px" y="239.137px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.60')}
      </text>
      <text x="684.825px" y="241.191px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.60')} /
      </text>
      <text x="113.584px" y="250.856px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.60')}
      </text>
      <text x="130.843px" y="272.949px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.50')}
      </text>
      <text x="305.724px" y="270.098px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.50')}
      </text>
      <text x="703.935px" y="253.543px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.50')}
      </text>
      <text x="134.053px" y="305.727px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.40')}
      </text>
      <text x="306.984px" y="303.583px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.40')}
      </text>
      <text x="139.124px" y="327.669px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.20')}
      </text>
      <text x="696.012px" y="303.583px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.20')}
      </text>
      <text x="312.444px" y="327.789px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.20')}
      </text>
      <text x="464.81px" y="319.205px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.20')}
      </text>
      <path className={styles.line} d="M82.521,95.409l-0.035,217.02" />
      <path
        className={styles.line}
        d="M82.486,335.311l-0,-21.67l38.308,-98.476l73.618,109.063l118.97,-113.82l186.2,-32.976l47.926,-37.454l202.358,98.104l0.036,96.841l-113.94,0.096l-85.893,-66.295l-84.495,66.194l-383.149,0"
      />
      <path className={styles.line} d="M113.927,232.572l13.149,-7.876" />
      <path className={styles.line} d="M101.569,264.576l43.974,-12.702" />
      <path className={styles.line} d="M88.213,298.712l78.327,-15.593" />
      <path className={styles.line} d="M82.486,313.641l104.749,0.053" />
      <path
        className={styles.line}
        d="M499.583,177.433l54.792,-10.331l72.558,11.445"
      />
      <path
        className={styles.line}
        d="M205.356,313.694l212.483,0.04l30.948,-9.158l8.315,-17.608l8.349,-9.787l-0.033,22.679l14.435,0.628l32.949,-49.678l0,47.004"
      />
      <path
        className={styles.line}
        d="M295.522,227.698l15.996,-5.602l106.381,14.293l47.552,-14.64l-0,55.431"
      />
      <path
        className={styles.line}
        d="M259.675,261.615l51.938,-12.708l106.147,16.338l47.56,-12.859"
      />
      <path
        className={styles.line}
        d="M218.506,301.32l93.204,-15.603l106.114,16.906l39.278,-15.655"
      />
      <path
        className={styles.line}
        d="M720.224,223.692l-165.541,-18.777l-41.881,5.493l-199.422,0"
      />
      <path
        className={styles.line}
        d="M585.39,296.095l0.043,-28.164l53.198,-8.457l0.043,8.339l57.927,-16.627l0.021,16.078l53.196,-16.639"
      />
      <path className={styles.line} d="M696.596,221.03l-57.968,38.445" />
      <path className={styles.line} d="M77.409,170.118l672.246,-0" />
      <path className={styles.line} d="M77.509,210.392l672.246,-0" />
      <path className={styles.line} d="M77.32,275.895l672.246,0" />
      <path className={styles.line} d="M194.411,95.475l0,227.101" />
      <path className={styles.line} d="M311.565,95.421l0,115.339" />
      <path className={styles.line} d="M417.949,95.29l0,95.782" />
      <path className={styles.line} d="M465.451,120.136l-0,62.318" />
      <path className={styles.line} d="M512.802,95.469l-0,70.568" />
      <path className={styles.line} d="M585.39,95.217l0,62.29" />
      <path className={styles.line} d="M638.631,95.479l-0,87.544" />
      <path className={styles.line} d="M696.596,119.856l-0,90.767" />
      <path className={styles.line} d="M749.902,95.395l0,142.701" />
    </svg>
  );
}

AltitudinalZoneForestEcoregion.propTypes = {
  data: PropTypes.arrayOf().isRequired,
};

export default AltitudinalZoneForestEcoregion;
