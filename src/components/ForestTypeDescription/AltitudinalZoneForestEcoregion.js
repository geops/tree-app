import PropTypes from 'prop-types';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
// eslint-disable-next-line import/no-unresolved
import { info } from 'lib/src';

import styles from './Diagram.module.css';
import { getStyle } from './utils';

function AltitudinalZoneForestEcoregion({ data }) {
  const { i18n, t } = useTranslation();
  return (
    <svg x="0px" y="0px" viewBox="0 0 800 400" style={{ marginTop: '20px' }}>
      <path
        className={getStyle(data, '8.1')}
        d="M799.773,244.881l0.093,93.222l-58.943,0.049l0.023,-74.869l58.827,-18.402Z"
      />
      <path
        className={getStyle(data, '8.2')}
        d="M740.917,212.153l26.071,2.938l33.012,15.935l-0.227,13.855l-58.827,18.402l-0.029,-51.13Z"
      />
      <path
        className={getStyle(data, '8.3')}
        d="M740.917,212.153l26.062,2.936l-26.062,-12.638l0,9.702Z"
      />
      <path
        className={getStyle(data, '7.1')}
        d="M740.923,245.502l-0,92.65l-64.11,0.055l0.05,-74.318l64.06,-18.387Z"
      />
      <path
        className={getStyle(data, '7.3')}
        d="M676.813,254.668l0.05,9.22l64.06,-18.386l-0,-33.369l-64.11,42.535Z"
      />
      <path
        className={getStyle(data, '7.4')}
        d="M676.816,204.862l0,49.805l64.101,-42.514l-64.101,-7.291Z"
      />
      <path
        className={getStyle(data, '7.5')}
        d="M676.816,204.862l64.101,7.291l0,-9.702l-64.005,-31.03l-0.096,33.441Z"
      />
      <path
        className={getStyle(data, '6.0')}
        d="M676.813,254.668l0,83.539l-2.951,-0l-55.923,-43.163l0.048,-31.025l58.826,-9.351Z"
      />
      <path
        className={getStyle(data, '6.1')}
        d="M617.939,198.184l0.048,65.835l58.829,-9.352l0,-49.805l-58.877,-6.678Z"
      />
      <path
        className={getStyle(data, '6.2')}
        d="M617.939,198.184l58.973,6.69l-0,-33.453l-13.032,-6.248l-45.941,-7.245l0,40.256Z"
      />
      <path
        className={getStyle(data, '6.3')}
        d="M617.939,157.928l45.941,7.245l-45.941,-22.341l0,15.096Z"
      />
      <path
        className={getStyle(data, '5.0')}
        d="M617.939,295.044l0,-96.86l-33.957,-3.851l-46.314,6.074l-0,96.658l41.212,-32.169l39.059,30.148Z"
      />
      <path
        className={getStyle(data, '5.1')}
        d="M537.668,200.407l46.314,-6.074l33.957,3.851l0,-40.256l-34.298,-5.411l-45.973,8.669l-0,39.221Z"
      />
      <path
        className={getStyle(data, '5.2')}
        d="M537.668,161.186l45.973,-8.669l34.298,5.411l0,-15.096l-41.892,-20.311l-38.379,29.995l-0,8.67Z"
      />
      <path
        className={getStyle(data, '4.0')}
        d="M485.357,299.331l15.874,0.692l36.437,-54.937l-0,51.979l-52.228,41.032l-0.083,-38.766Z"
      />
      <path
        className={getStyle(data, '4.1')}
        d="M485.304,200.407l0.053,98.924l15.874,0.692l36.437,-54.937l-0,-44.679l-52.364,-0Z"
      />
      <path
        className={getStyle(data, '4.2')}
        d="M536.512,246.829l-51.19,-0l0.035,52.502l15.874,0.692l35.281,-53.194Z"
      />
      <rect
        className={getStyle(data, '4.3')}
        x="485.304"
        y="200.407"
        width="52.363"
        height="12.542"
      />
      <path
        className={getStyle(data, 'forestEcoregion.2b.90')}
        d="M485.304,200.407l52.364,-0l-0,-39.221l-52.364,9.439l0,29.782Z"
      />
      <path
        className={getStyle(data, 'forestEcoregion.2b.100')}
        d="M523.246,163.784l14.422,-2.598l-0,-8.67l-14.422,11.268Z"
      />
      <path
        className={getStyle(data, '3.0')}
        d="M432.652,338.097l52.788,0l-0.136,-63.895l-9.233,10.869l-9.195,19.472l-34.224,10.128l0,23.426Z"
      />
      <path
        className={getStyle(data, '3.1')}
        d="M432.652,314.671l34.224,-10.128l9.195,-19.472l-43.435,17.313l0.016,12.287Z"
      />
      <path
        className={getStyle(data, '3.2')}
        d="M432.636,302.384l-0.071,-41.335l0.984,-0.088l51.773,-14.132l-0.018,27.419l-9.233,10.823l-23.124,9.217l-20.311,8.096Z"
      />
      <path
        className={getStyle(data, '3.3')}
        d="M432.718,229.138l-0.16,31.91l52.764,-14.219l-0.018,-33.881l-52.586,16.19Z"
      />
      <path
        className={getStyle(data, '3.4')}
        d="M432.774,200.407l-0.056,28.731l52.586,-16.19l0,-12.541l-52.53,-0Z"
      />
      <path
        className={getStyle(data, '3.5')}
        d="M432.774,179.928l-0,20.479l52.53,-0l0,-29.782l-52.53,9.303Z"
      />
      <path
        className={getStyle(data, '2.0')}
        d="M432.652,314.671l0,23.426l-117.269,0l-0.01,-23.448l117.279,0.022Z"
      />
      <path
        className={getStyle(data, '2.1')}
        d="M432.636,302.384l0.016,12.287l-117.278,-0.022l-0.085,-30.961l117.347,18.696Z"
      />
      <path
        className={getStyle(data, '2.2')}
        d="M432.565,261.049l0.071,41.335l-117.347,-18.696l-0.108,-40.707l117.384,18.068Z"
      />
      <path
        className={getStyle(data, '2.3')}
        d="M315.076,213.332l0.105,29.649l117.377,18.067l0.16,-31.91l-117.642,-15.806Z"
      />
      <path
        className={getStyle(data, '2.4')}
        d="M315.076,213.332l117.642,15.806l0.096,-28.731l-115.675,-0l-19.752,19.12l17.689,-6.195Z"
      />
      <path
        className={getStyle(data, '2.5')}
        d="M317.139,200.407l115.635,-0l-0,-20.479l-115.635,20.479Z"
      />
      <path
        className={getStyle(data, '1.0')}
        d="M315.383,314.649l-0,23.448l-129.809,0l-0.001,-11.824l12.154,-11.624l117.656,-0Z"
      />
      <path
        className={getStyle(data, '1.1')}
        d="M315.289,283.688l0.094,30.961l-117.656,-0l14.491,-13.706l103.071,-17.255Z"
      />
      <path
        className={getStyle(data, '1.2')}
        d="M315.289,283.688l-103.071,17.255l45.418,-43.653l57.545,-14.309l0.108,40.707Z"
      />
      <path
        className={getStyle(data, '1.3')}
        d="M257.636,257.29l57.545,-14.309l-0.105,-29.649l-17.689,6.195l-39.751,37.763Z"
      />
      <path
        className={getStyle(data, '0.0')}
        d="M185.574,326.276l-0,11.821l-123.842,0l0.067,-23.529l115.837,0.058l7.938,11.65Z"
      />
      <path
        className={getStyle(data, '0.1')}
        d="M68.229,298.039l-6.429,16.529l115.837,0.058l-22.886,-33.811l-86.522,17.224Z"
      />
      <path
        className={getStyle(data, '0.4')}
        d="M96.707,224.834l14.403,-8.627l-6.947,-10.539l-7.456,19.166Z"
      />
      <path
        className={getStyle(data, '0.3')}
        d="M83.055,260.294l48.477,-14.032l-20.422,-30.055l-14.403,8.627l-13.652,35.46Z"
      />
      <path
        className={getStyle(data, '0.2')}
        d="M83.055,260.294l48.477,-14.032l23.219,34.553l-86.522,17.224l14.826,-37.745Z"
      />
      <text x="30.216px" y="22.621px" className={styles.header}>
        {t('forestTypeDiagram.altitudinalZoneForestEcoregion')}
      </text>
      <text x="4.736px" y="87.303px">
        {t('forestTypeDiagram.meter')}
      </text>
      <text x="15.806px" y="107.33px">
        {t('forestTypeDiagram.aboveSeaLevel')}
      </text>
      <text x="14.917px" y="161.585px" className={styles.label}>
        2000
      </text>
      <text x="14.917px" y="206.115px" className={styles.label}>
        1600
      </text>
      <text x="24.33px" y="278.364px" className={styles.label}>
        800
      </text>
      <text x="119.961px" y="94.887px" className={styles.label}>
        J
      </text>
      <text x="243.31px" y="94.887px" className={styles.label}>
        M
      </text>
      <text x="369.017px" y="94.887px" className={styles.label}>
        1
      </text>
      <text x="480.518px" y="94.887px" className={styles.label}>
        2
      </text>
      <text x="573.15px" y="94.887px" className={styles.label}>
        3
      </text>
      <text x="642.729px" y="94.887px" className={styles.label}>
        4
      </text>
      <text x="735.232px" y="94.887px" className={styles.label}>
        5
      </text>
      <text x="449.203px" y="111.237px" className={styles.label}>
        2a
      </text>
      <text x="502.006px" y="111.237px" className={styles.label}>
        2b
      </text>
      <text x="699.118px" y="111.237px" className={styles.label}>
        5a
      </text>
      <text x="760.999px" y="111.237px" className={styles.label}>
        5b
      </text>
      <text x="122.64px" y="52.924px" className={styles.labelMiddle}>
        {info('forestEcoregion', 'J')[i18n.language]}
      </text>
      <text x="252.282px" y="53.924px" className={styles.labelMiddle}>
        {info('forestEcoregion', 'M')[i18n.language]}
      </text>
      <text y="31.924px" className={styles.labelMiddle}>
        <Trans i18nKey="forestTypeDiagram.forestEcoregion.1">
          <tspan x="375px">Northern</tspan>
          <tspan x="375px" dy="20">
            Pre-Alps
          </tspan>
        </Trans>
      </text>
      <text y="31.924px" className={styles.labelMiddle}>
        <Trans i18nKey="forestTypeDiagram.forestEcoregion.2">
          <tspan x="485px">Northern</tspan>
          <tspan x="485px" dy="20">
            intermediate
          </tspan>
          <tspan x="485px" dy="20">
            Alps
          </tspan>
        </Trans>
      </text>
      <text y="31.846px" className={styles.labelMiddle}>
        <Trans i18nKey="forestTypeDiagram.forestEcoregion.3">
          <tspan x="575px">Continental</tspan>
          <tspan x="575px" dy="20">
            Alps
          </tspan>
        </Trans>
      </text>
      <text y="32.062px" className={styles.labelMiddle}>
        <Trans i18nKey="forestTypeDiagram.forestEcoregion.4">
          <tspan x="650px">Southern</tspan>
          <tspan x="650px" dy="20">
            intermediate
          </tspan>
          <tspan x="650px" dy="20">
            Alps
          </tspan>
        </Trans>
      </text>
      <text y="32.062px" className={styles.labelMiddle}>
        <Trans i18nKey="forestTypeDiagram.forestEcoregion.5">
          <tspan x="738px">Southern</tspan>
          <tspan x="738" dy="20">
            Pre-Alps
          </tspan>
        </Trans>
      </text>
      <text x="64.672px" y="369.094px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.100')}
      </text>
      <text x="64.672px" y="394.484px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.90')}
      </text>
      <text x="266.432px" y="369.094px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.80')}
      </text>
      <text x="266.432px" y="394.484px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.60')}
      </text>
      <text x="489.438px" y="369.094px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.50')}
      </text>
      <text x="489.438px" y="394.484px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.40')}
      </text>
      <text x="706.279px" y="369.094px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.20')}
      </text>
      <text x="106.378px" y="369.094px">
        {info('altitudinalZone', '100')[i18n.language]}
      </text>
      <text x="106.378px" y="394.484px">
        {info('altitudinalZone', '90')[i18n.language]}
      </text>
      <text x="305.86px" y="369.094px">
        {info('altitudinalZone', '80')[i18n.language]}
      </text>
      <text x="305.86px" y="394.484px">
        {info('altitudinalZone', '60')[i18n.language]}
      </text>
      <text x="528.184px" y="369.094px">
        {info('altitudinalZone', '50')[i18n.language]}
      </text>
      <text x="528.184px" y="394.484px">
        {info('altitudinalZone', '40')[i18n.language]}
      </text>
      <text x="732.291px" y="369.094px">
        {info('altitudinalZone', '20')[i18n.language]}
      </text>
      <text x="575.483px" y="149.548px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.100')}
      </text>
      <text x="537.742px" y="188.286px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.90')}
      </text>
      <text x="667.122px" y="188.286px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.90')}
      </text>
      <text x="611.078px" y="230.178px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.80')}
      </text>
      <text x="423.741px" y="216.318px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.80')}
      </text>
      <text x="110.712px" y="214.096px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.80')}
      </text>
      <text x="308.21px" y="232.177px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.60')}
      </text>
      <text x="727.9px" y="234.449px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.60')} /
      </text>
      <text x="96.19px" y="245.137px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.60')}
      </text>
      <text x="115.276px" y="269.568px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.50')}
      </text>
      <text x="308.669px" y="266.416px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.50')}
      </text>
      <text x="749.033px" y="248.108px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.50')}
      </text>
      <text x="118.825px" y="305.816px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.40')}
      </text>
      <text x="310.062px" y="303.445px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.40')}
      </text>
      <text x="124.433px" y="330.081px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.20')}
      </text>
      <text x="740.272px" y="303.445px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.20')}
      </text>
      <text x="316.1px" y="330.214px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.20')}
      </text>
      <text x="484.595px" y="320.721px">
        {t('forestTypeDiagram.altitudinalZoneAbbr.20')}
      </text>
      <path className={styles.line} d="M61.838,73.235l-0.038,239.993" />
      <path
        className={styles.line}
        d="M61.8,338.532l-0,-23.964l42.363,-108.9l81.411,120.608l131.564,-125.869l205.91,-36.467l52.999,-41.419l223.779,108.489l0.04,107.093l-126.001,0.106l-94.985,-73.313l-93.44,73.201l-423.708,0"
      />
      <path className={styles.line} d="M96.569,224.917l14.541,-8.71" />
      <path className={styles.line} d="M82.903,260.309l48.629,-14.047" />
      <path className={styles.line} d="M68.133,298.059l86.618,-17.244" />
      <path className={styles.line} d="M61.8,314.568l115.837,0.058" />
      <path
        className={styles.line}
        d="M523.049,163.941l60.592,-11.424l80.239,12.656"
      />
      <path
        className={styles.line}
        d="M197.676,314.626l234.976,0.045l34.224,-10.128l9.195,-19.472l9.233,-10.823l-0.036,25.08l15.963,0.695l36.437,-54.937l-0,51.979"
      />
      <path
        className={styles.line}
        d="M297.387,219.527l17.689,-6.195l117.642,15.806l52.586,-16.19l0,61.299"
      />
      <path
        className={styles.line}
        d="M257.745,257.035l57.436,-14.054l117.384,18.068l52.594,-14.22"
      />
      <path
        className={styles.line}
        d="M212.218,300.943l103.071,-17.255l117.347,18.696l43.435,-17.313"
      />
      <path
        className={styles.line}
        d="M767.047,215.097l-183.065,-20.764l-46.314,6.074l-220.533,-0"
      />
      <path
        className={styles.line}
        d="M617.939,295.165l0.048,-31.146l58.829,-9.352l0.048,9.222l64.059,-18.387l0.023,17.78l58.827,-18.401"
      />
      <path className={styles.line} d="M740.917,212.153l-64.104,42.515" />
      <path className={styles.line} d="M56.185,155.852l743.408,0" />
      <path className={styles.line} d="M56.296,200.389l743.408,0" />
      <path className={styles.line} d="M56.087,272.826l743.408,0" />
      <path className={styles.line} d="M185.573,73.308l-0,251.141" />
      <path className={styles.line} d="M315.128,73.248l0,127.548" />
      <path className={styles.line} d="M432.774,73.103l-0,105.921" />
      <path className={styles.line} d="M485.304,100.579l0,68.915" />
      <path className={styles.line} d="M537.668,73.301l-0,78.038" />
      <path className={styles.line} d="M617.939,73.022l0,68.884" />
      <path className={styles.line} d="M676.816,73.312l0,96.811" />
      <path className={styles.line} d="M740.917,100.269l0,100.376" />
      <path className={styles.line} d="M799.866,73.219l0,157.807" />
    </svg>
  );
}

AltitudinalZoneForestEcoregion.propTypes = {
  data: PropTypes.arrayOf().isRequired,
};

export default AltitudinalZoneForestEcoregion;
