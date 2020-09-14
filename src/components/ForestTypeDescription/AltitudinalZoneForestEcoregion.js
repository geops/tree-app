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
      <path
        id="Me-HY"
        d="M776.613,318.476l-15.234,-17.146l-0,27.769l15.234,-10.623Z"
        className={getStyle(data, '9.0')}
      />
      <path
        id="Me-CB"
        d="M784.501,296.659l-0,32.44l-23.122,-0.126l15.234,-10.741l-15.234,-16.902l-0,-58.344l23.122,53.673Z"
        className={getStyle(data, '9.1')}
      />
      <path
        id="_5b-HY"
        d="M761.379,329.099l-0,-27.769l-62.143,16.974l0,10.795l62.143,0Z"
        className={getStyle(data, '8.0')}
      />
      <path
        id="_5b-CB"
        d="M761.379,242.87l-62.143,21.556l0,54.087l62.143,-17.183l-0,-58.46Z"
        className={getStyle(data, '8.2')}
      />
      <path
        id="_5b-OM-UM"
        d="M754.218,183.204l-55.132,-4.728l0,86.22l62.293,-21.826l-7.161,-59.666Z"
        className={getStyle(data, '8.2')}
      />
      <path
        id="_5b-SA"
        d="M699.086,162.327l53.966,10.321l1.175,10.66l-54.991,-4.832l-0.15,-16.149Z"
        className={getStyle(data, '8.3')}
      />
      <path
        id="_5a-HY"
        d="M635.969,329.099l63.267,-32.44l0,32.44l-63.267,0Z"
        className={getStyle(data, '7.0')}
      />
      <path
        id="_5a-C"
        d="M635.969,312.305l18.994,6.777l-18.994,10.016l-0,-16.793Z"
        className={getStyle(data, '7.1')}
      />
      <path
        id="_5a-CB"
        d="M699.236,296.659l0,-53.789l-62.963,21.577l-0.304,47.858l18.994,6.777l44.273,-22.423Z"
        className={getStyle(data, '7.2')}
      />
      <path
        id="_5a-OM-UM"
        d="M699.086,178.505l-44.123,16.991l-18.996,47.374l0.002,21.644l63.117,-21.528l0,-64.481Z"
        className={getStyle(data, '7.3')}
      />
      <path
        id="_5a-HM"
        d="M635.969,173.167l54.409,-0l8.708,5.309l-43.929,16.869l-19.19,47.525l0.002,-69.703Z"
        className={getStyle(data, '7.4')}
      />
      <path
        id="_5a-SA"
        d="M635.967,148.569l63.269,13.758l-0.15,16.149l-8.774,-5.309l-54.343,-0l-0.002,-24.598Z"
        className={getStyle(data, '7.5')}
      />
      <path
        id="_5a-OSA"
        d="M635.967,116.297l35.008,8.714l28.261,37.316l-63.269,-13.758l0,-32.272Z"
        className={getStyle(data, '7.6')}
      />
      <path
        id="_4-C"
        d="M635.969,329.099l-0,-86.229l-57.405,10.956l-0.109,42.833l57.514,32.44Z"
        className={getStyle(data, '6.0')}
      />
      <path
        id="_4-HM"
        d="M635.967,173.167l-57.403,-0l0,80.505l57.405,-10.802l-0.002,-69.703Z"
        className={getStyle(data, '6.1')}
      />
      <path
        id="_4-SA"
        d="M635.969,148.61l-57.405,-12.541l0,37.098l57.405,-0l0,-24.557Z"
        className={getStyle(data, '6.2')}
      />
      <path
        id="_4-OSA"
        d="M635.969,116.372l-57.405,-13.987l0,33.684l57.405,12.594l0,-32.291Z"
        className={getStyle(data, '6.3')}
      />
      <path
        id="_3-HM"
        d="M578.452,243.295l-80.609,-0l0,-64.53l42.281,-5.598l38.331,-0l-0.003,70.128Z"
        className={getStyle(data, '5.0')}
      />
      <path
        id="_3-SA"
        d="M578.455,136.08l-38.33,-8.376l-42.282,10.441l0,40.331l42.282,-5.309l38.33,-0l-0,-37.087Z"
        className={getStyle(data, '5.1')}
      />
      <path
        id="_3-OSA"
        d="M578.455,102.335l-38.341,-9.416l-42.271,16.731l0,28.612l42.282,-10.521l38.33,8.337l-0,-33.743Z"
        className={getStyle(data, '5.2')}
      />
      <path
        id="_2b-C"
        d="M497.867,296.976l-0.024,-64.622l-38.581,64.234l-16.287,-0l-0.144,26.835l55.036,-26.447Z"
        className={getStyle(data, '4.0')}
      />
      <path
        id="_2b-HM"
        d="M497.843,178.476l-54.867,0l-0.145,118.112l16.336,-0l38.676,-64.234l0,-53.878Z"
        className={getStyle(data, '4.1')}
      />
      <path
        id="_2b-SA"
        d="M497.843,178.565l0,-40.322l-54.917,13.377l-0,26.856l54.917,0.089Z"
        className={getStyle(data, '4.4')}
      />
      <path
        id="_2b-OSA"
        d="M497.843,109.667l-54.917,21.687l-0.095,20.266l55.012,-13.377l0,-28.576Z"
        className={getStyle(data, '4.5')}
      />
      <path
        id="_2a-C"
        d="M442.975,264.701l-0.144,58.722l-55.609,-0l-0,-10.574l32.861,-11.594l22.892,-36.554Z"
        className={getStyle(data, '3.0')}
      />
      <path
        id="_2a-SM"
        d="M387.399,312.537l-0,-26.699l45.389,-4.672l-12.349,20.024l-33.04,11.347Z"
        className={getStyle(data, '3.1')}
      />
      <path
        id="_2a-UM"
        d="M387.399,285.837l0.334,-26.365l55.067,-16.353l0.333,21.025l-10.345,17.021l-45.389,4.672Z"
        className={getStyle(data, '3.2')}
      />
      <path
        id="_2a-OM"
        d="M442.831,199.862l-55.609,6.001l0.177,53.695l55.431,-16.439l0.001,-43.257Z"
        className={getStyle(data, '3.3')}
      />
      <path
        id="_2a-HM"
        d="M443.095,178.476l-55.696,0l-0.177,27.387l55.608,-6.002l0.265,-21.385Z"
        className={getStyle(data, '3.4')}
      />
      <path
        id="_2a-SA"
        d="M442.926,151.62l-55.704,11.045l-0,15.811l55.704,0l-0,-26.856Z"
        className={getStyle(data, '3.5')}
      />
      <path
        id="_2a-OSA"
        d="M442.926,131.459l-55.704,22.048l-0,9.299l55.753,-11.151l-0.049,-20.196Z"
        className={getStyle(data, '3.6')}
      />
      <path
        id="_1-C"
        d="M279.755,323.423l-0,-10.574l107.644,0.096l-0.196,10.478l-107.448,-0Z"
        className={getStyle(data, '2.0')}
      />
      <path
        id="_1-SM"
        d="M387.399,285.837l-0,26.7l-107.134,-0l0,-37.046l107.134,10.346Z"
        className={getStyle(data, '2.1')}
      />
      <path
        id="_1-UM"
        d="M387.733,259.472l-0.334,26.365l-107.134,-10.346l0,-32.373l107.468,16.354Z"
        className={getStyle(data, '2.2')}
      />
      <path
        id="_1-OM"
        d="M387.189,205.863l-107.434,-6.002l-0,43.257l107.467,16.44l-0.033,-53.695Z"
        className={getStyle(data, '2.3')}
      />
      <path
        id="_1-HM"
        d="M279.755,183.785l-0,16.076l107.467,6.002l-0,-27.387l-107.467,5.309Z"
        className={getStyle(data, '2.4')}
      />
      <path
        id="_1-SA"
        d="M387.222,162.76l-0,15.716l-107.093,5.309l107.093,-21.025Z"
        className={getStyle(data, '2.5')}
      />
      <path
        id="_1-OSA"
        d="M387.189,153.481l-45.824,18.077l45.857,-8.798l-0.033,-9.279Z"
        className={getStyle(data, '2.6')}
      />
      <path
        id="M-C"
        d="M279.755,323.423l-0,-10.478l-114.545,-0.095l-0.417,10.573l114.962,-0Z"
        className={getStyle(data, '1.0')}
      />
      <path
        id="M-SM"
        d="M280.266,312.537l-114.143,0.334l24.364,-27.367l89.779,-10.012l-0,37.045Z"
        className={getStyle(data, '1.1')}
      />
      <path
        id="M-UM"
        d="M280.266,275.491l-89.779,10.013l23.361,-26.366l66.418,-16.019l-0,32.372Z"
        className={getStyle(data, '1.2')}
      />
      <path
        id="M-OM"
        d="M279.755,199.861l-19.05,6.002l-47.524,53.695l66.574,-16.553l-0,-43.144Z"
        className={getStyle(data, '1.3')}
      />
      <path
        id="M-HM"
        d="M279.755,183.785l-19.05,22.078l19.05,-6.002l-0,-16.076Z"
        className={getStyle(data, '1.4')}
      />
      <path
        id="J-C"
        d="M38.113,323.423l126.68,-0l-0.025,-10.478l-126.655,5.703l-0,4.775Z"
        className={getStyle(data, '0.0')}
      />
      <path
        id="J-SM"
        d="M52.649,285.504l93.117,-10.68l20.358,38.046l-127.158,5.34l13.683,-32.706Z"
        className={getStyle(data, '0.1')}
      />
      <path
        id="J-UM"
        d="M68.001,248.458l62.079,-5.34l15.686,31.705l-93.117,10.68l15.352,-37.045Z"
        className={getStyle(data, '0.2')}
      />
      <path
        id="J-OM"
        d="M129.245,243.118l-62.275,5.273l21.996,-53.583l12.949,-5.054l27.33,53.364Z"
        className={getStyle(data, '0.3')}
      />
      <path
        id="J-HM"
        d="M88.966,194.808l12.949,-5.054l-5.842,-11.881l-7.107,16.935Z"
        className={getStyle(data, '0.4')}
      />
      <path d="M33.995,296.745l750.33,0" className={styles.greyLine} />
      <path d="M33.995,243.027l750.33,0" className={styles.greyLine} />
      <path d="M33.995,189.31l750.327,-0" className={styles.greyLine} />
      <path d="M33.995,135.591l750.33,-0" className={styles.greyLine} />
      <path d="M33.995,81.873l750.33,-0" className={styles.greyLine} />
      <path
        d="M33.995,307.489l750.327,0"
        className={`${styles.thinLine} ${styles.greyLine}`}
      />
      <path
        d="M33.995,253.771l750.327,-0"
        className={`${styles.thinLine} ${styles.greyLine}`}
      />
      <path
        d="M33.995,200.053l750.324,0"
        className={`${styles.thinLine} ${styles.greyLine}`}
      />
      <path
        d="M33.995,146.335l750.327,0"
        className={`${styles.thinLine} ${styles.greyLine}`}
      />
      <path
        d="M33.995,92.617l750.327,-0"
        className={`${styles.thinLine} ${styles.greyLine}`}
      />
      <path
        d="M33.995,318.233l750.327,-0"
        className={`${styles.thinLine} ${styles.greyLine}`}
      />
      <path
        d="M33.995,264.514l750.327,-0"
        className={`${styles.thinLine} ${styles.greyLine}`}
      />
      <path
        d="M33.995,210.796l750.324,0"
        className={`${styles.thinLine} ${styles.greyLine}`}
      />
      <path
        d="M33.995,157.078l750.327,-0"
        className={`${styles.thinLine} ${styles.greyLine}`}
      />
      <path
        d="M33.995,103.359l750.327,0"
        className={`${styles.thinLine} ${styles.greyLine}`}
      />
      <path
        d="M33.995,328.977l750.327,-0"
        className={`${styles.thinLine} ${styles.greyLine}`}
      />
      <path
        d="M33.995,275.257l750.327,0"
        className={`${styles.thinLine} ${styles.greyLine}`}
      />
      <path
        d="M33.995,221.54l750.324,-0"
        className={`${styles.thinLine} ${styles.greyLine}`}
      />
      <path
        d="M33.995,167.822l750.327,-0"
        className={`${styles.thinLine} ${styles.greyLine}`}
      />
      <path
        d="M33.995,114.103l750.327,0"
        className={`${styles.thinLine} ${styles.greyLine}`}
      />
      <path
        d="M33.995,286l750.327,0"
        className={`${styles.thinLine} ${styles.greyLine}`}
      />
      <path
        d="M33.995,232.283l750.324,0"
        className={`${styles.thinLine} ${styles.greyLine}`}
      />
      <path
        d="M33.995,178.565l750.327,-0"
        className={`${styles.thinLine} ${styles.greyLine}`}
      />
      <path
        d="M33.995,124.846l750.327,0"
        className={`${styles.thinLine} ${styles.greyLine}`}
      />
      <path d="M164.768,65.757l0,2.843" className={styles.greyLine} />
      <path
        d="M164.768,74.193l0,254.514"
        className={`${styles.greyLine} ${styles.dashedLine}`}
      />
      <path d="M164.768,331.505l0,2.842" className={styles.greyLine} />
      <path d="M279.755,65.757l-0,2.843" className={styles.greyLine} />
      <path
        d="M279.755,74.193l-0,254.514"
        className={`${styles.greyLine} ${styles.dashedLine}`}
      />
      <path d="M279.755,331.505l-0,2.842" className={styles.greyLine} />
      <path d="M387.189,65.757l-0,2.843" className={styles.greyLine} />
      <path
        d="M387.189,74.193l-0,254.514"
        className={`${styles.greyLine} ${styles.dashedLine}`}
      />
      <path d="M387.189,331.505l-0,2.842" className={styles.greyLine} />
      <path d="M497.629,65.757l-0,2.843" className={styles.greyLine} />
      <path
        d="M497.629,74.193l-0,254.514"
        className={`${styles.greyLine} ${styles.dashedLine}`}
      />
      <path d="M497.629,331.505l-0,2.842" className={styles.greyLine} />
      <path d="M578.485,65.757l0,2.843" className={styles.greyLine} />
      <path
        d="M578.485,74.193l0,254.514"
        className={`${styles.greyLine} ${styles.dashedLine}`}
      />
      <path d="M578.485,331.505l0,2.842" className={styles.greyLine} />
      <path d="M635.969,65.757l0,2.843" className={styles.greyLine} />
      <path
        d="M635.969,74.193l0,254.514"
        className={`${styles.greyLine} ${styles.dashedLine}`}
      />
      <path d="M635.969,331.505l0,2.842" className={styles.greyLine} />
      <path d="M698.98,65.757l-0,2.843" className={styles.greyLine} />
      <path
        d="M698.98,74.193l-0,254.514"
        className={`${styles.greyLine} ${styles.dashedLine}`}
      />
      <path d="M698.98,331.505l-0,2.842" className={styles.greyLine} />
      <path d="M761.293,65.757l-0,2.843" className={styles.greyLine} />
      <path
        d="M761.293,74.193l-0,254.514"
        className={`${styles.greyLine} ${styles.dashedLine}`}
      />
      <path d="M761.293,331.505l-0,2.842" className={styles.greyLine} />
      <path d="M38.024,65.757l-0,268.589" className={styles.line} />
      <path d="M442.83,65.757l-0,2.843" className={styles.greyLine} />
      <path
        d="M442.83,74.193l-0,254.514"
        className={`${styles.greyLine} ${styles.dashedLine}`}
      />
      <path d="M442.83,331.505l-0,2.842" className={styles.greyLine} />
      <path d="M164.768,65.757l0,247.021" className={styles.greyLine} />
      <path d="M279.755,65.757l-0,118.42" className={styles.greyLine} />
      <path d="M387.189,65.757l-0,88.166" className={styles.greyLine} />
      <path d="M497.629,65.757l-0,44.218" className={styles.greyLine} />
      <path d="M578.485,65.757l0,37.243" className={styles.greyLine} />
      <path d="M635.969,65.757l0,51.416" className={styles.greyLine} />
      <path d="M698.98,90.19l-0,71.913" className={styles.greyLine} />
      <path d="M761.293,65.757l-0,177.375" className={styles.greyLine} />
      <path d="M38.024,65.757l-0,268.589" className={styles.line} />
      <path d="M442.83,88.718l-0,42.911" className={styles.greyLine} />
      <path d="M784.729,65.757l-0,268.589" className={styles.greyLine} />
      <path d="M784.729,65.757l-0,268.589" className={styles.greyLine} />
      <g opacity="0.8">
        <path d="M38.432,317.67l57.642,-139.798" className={styles.line} />
      </g>
      <g opacity="0.8">
        <path d="M96.073,177.873l68.72,135.373" className={styles.line} />
      </g>
      <g opacity="0.8">
        <path d="M165.001,313.247l114.963,-129.293" className={styles.line} />
      </g>
      <g opacity="0.8">
        <path d="M280.129,183.733l162.846,-32.078" className={styles.line} />
      </g>
      <g opacity="0.8">
        <path d="M341.365,171.558l198.759,-78.637" className={styles.line} />
      </g>
      <g opacity="0.8">
        <path
          d="M540.114,92.919l130.609,31.947l28.516,37.574l53.785,10.162l8.355,70.27"
          className={styles.line}
        />
      </g>
      <g opacity="0.8">
        <path d="M88.966,194.808l12.949,-5.054" className={styles.line} />
      </g>
      <g opacity="0.8">
        <path d="M66.97,248.391l61.133,-5.064" className={styles.line} />
      </g>
      <g opacity="0.8">
        <path d="M51.78,285.708l92.449,-10.502" className={styles.line} />
      </g>
      <g opacity="0.8">
        <path
          d="M442.976,323.492l54.867,-26.721l-0,-53.476l80.643,-0l-0,53.429l57.484,32.375"
          className={styles.line}
        />
      </g>
      <g opacity="0.8">
        <path d="M635.969,329.098l148.949,-0.125" className={styles.line} />
      </g>
      <g opacity="0.8">
        <path d="M38.113,323.423l404.863,-0" className={styles.line} />
      </g>
      <path d="M38.454,318.648l126.235,-5.401" className={styles.line} />
      <path d="M165.21,313.039l221.993,-0.189" className={styles.line} />
      <path
        d="M387.202,312.849l32.876,-11.703l22.589,-36.516"
        className={styles.line}
      />
      <path
        d="M189.345,285.977l90.463,-10.607l107.423,10.983l44.267,-4.909"
        className={styles.line}
      />
      <path
        d="M213.181,259.269l66.523,-16.264l107.528,16.553l55.863,-16.462"
        className={styles.line}
      />
      <path
        d="M260.705,205.616l19.048,-5.755l107.437,6.002l55.64,-6.002"
        className={styles.line}
      />
      <path
        d="M280.117,183.785l107.209,-5.392l110.679,0.269l42.366,-5.495l149.777,-0l8.936,5.337l55.134,4.772"
        className={styles.line}
      />
      <path d="M442.831,199.862l0,96.726" className={styles.line} />
      <path
        d="M442.831,296.588l16.49,-0l38.522,-64.234l0,11.102"
        className={styles.line}
      />
      <path d="M540.125,127.704l159.111,34.623" className={styles.line} />
      <path d="M442.926,151.62l97.199,-23.879" className={styles.line} />
      <path
        d="M578.564,253.711l57.404,-10.841l0.036,69.59l18.959,6.622"
        className={styles.line}
      />
      <path
        d="M635.967,242.87l18.862,-47.561l44.257,-16.804"
        className={styles.line}
      />
      <path
        d="M636.273,264.401l62.629,-21.207l0,21.371l62.354,-21.579l23.245,53.916"
        className={styles.line}
      />
      <path
        d="M761.383,328.988l15.23,-10.694l-15.444,-16.957l-62.248,16.949l0.002,-21.627l-62.954,32.44"
        className={styles.line}
      />
      <path
        d="M1,81.736l6.169,-0l-0,-1.277l-4.539,0c2.539,-2.539 4.372,-5.568 4.372,-7.617c-0,-1.614 -1.146,-2.957 -2.959,-2.957c-0.724,0 -1.75,0.217 -2.757,0.704l0.187,1.479c0.67,-0.536 1.577,-0.906 2.25,-0.906c1.16,-0 1.732,0.906 1.732,1.966c0,1.563 -1.479,3.899 -4.455,7.315l-0,1.293Z"
        className={styles.bgLine}
      />
      <path
        d="M9.472,81.382c0.69,0.303 1.547,0.473 2.303,0.473c2.506,0 3.782,-1.616 3.782,-4.055c0,-2.319 -1.496,-3.496 -3.226,-3.496c-0.439,0 -0.959,0.07 -1.329,0.187l-0,-3.279l3.985,-0l0,-1.21l-5.398,-0l0,5.899c0.809,-0.251 1.346,-0.387 1.933,-0.387c1.582,-0 2.489,0.876 2.489,2.472c0,1.533 -0.943,2.656 -2.436,2.656c-0.673,0 -1.53,-0.319 -2.033,-0.62l-0.07,1.36Z"
        className={styles.bgLine}
      />
      <path
        d="M18.617,75.868c0,-3.295 0.59,-4.775 1.933,-4.775c1.343,0 1.933,1.48 1.933,4.775c-0,3.296 -0.59,4.776 -1.933,4.776c-1.343,-0 -1.933,-1.48 -1.933,-4.776Zm-1.48,0c0,3.916 1.21,5.985 3.413,5.985c2.203,0 3.412,-2.069 3.412,-5.985c0,-3.916 -1.209,-5.985 -3.412,-5.985c-2.203,0 -3.413,2.069 -3.413,5.985Z"
        className={styles.bgLine}
      />
      <path
        d="M26.686,75.868c0,-3.295 0.59,-4.775 1.933,-4.775c1.343,0 1.933,1.48 1.933,4.775c-0,3.296 -0.59,4.776 -1.933,4.776c-1.343,-0 -1.933,-1.48 -1.933,-4.776Zm-1.48,0c0,3.916 1.21,5.985 3.413,5.985c2.203,0 3.412,-2.069 3.412,-5.985c0,-3.916 -1.209,-5.985 -3.412,-5.985c-2.203,0 -3.413,2.069 -3.413,5.985Z"
        className={styles.bgLine}
      />
      <path
        d="M9.471,296.148c0.69,0.303 1.547,0.473 2.303,0.473c2.506,0 3.783,-1.616 3.783,-4.055c-0,-2.319 -1.497,-3.496 -3.227,-3.496c-0.439,0 -0.959,0.07 -1.329,0.187l0,-3.279l3.986,-0l-0,-1.21l-5.399,-0l0,5.899c0.81,-0.251 1.346,-0.387 1.933,-0.387c1.583,-0 2.489,0.876 2.489,2.472c0,1.533 -0.942,2.656 -2.436,2.656c-0.673,0 -1.53,-0.319 -2.033,-0.62l-0.07,1.36Z"
        className={styles.bgLine}
      />
      <path
        d="M18.616,290.635c0,-3.296 0.59,-4.776 1.933,-4.776c1.343,0 1.933,1.48 1.933,4.776c0,3.295 -0.59,4.775 -1.933,4.775c-1.343,-0 -1.933,-1.48 -1.933,-4.775Zm-1.479,-0c-0,3.915 1.209,5.985 3.412,5.985c2.203,-0 3.413,-2.07 3.413,-5.985c-0,-3.916 -1.21,-5.985 -3.413,-5.985c-2.203,-0 -3.412,2.069 -3.412,5.985Z"
        className={styles.bgLine}
      />
      <path
        d="M26.685,290.635c-0,-3.296 0.59,-4.776 1.933,-4.776c1.343,0 1.933,1.48 1.933,4.776c-0,3.295 -0.59,4.775 -1.933,4.775c-1.343,-0 -1.933,-1.48 -1.933,-4.775Zm-1.48,-0c0,3.915 1.21,5.985 3.413,5.985c2.203,-0 3.412,-2.07 3.412,-5.985c0,-3.916 -1.209,-5.985 -3.412,-5.985c-2.203,-0 -3.413,2.069 -3.413,5.985Z"
        className={styles.bgLine}
      />
      <path
        d="M3.774,242.946l1.477,0l0,-11.733l-1.343,-0l-2.403,2.286l0.773,1.093l1.496,-1.683l0,10.037Z"
        className={styles.bgLine}
      />
      <path
        d="M10.548,237.079c0,-3.296 0.59,-4.775 1.933,-4.775c1.344,-0 1.933,1.479 1.933,4.775c0,3.296 -0.589,4.775 -1.933,4.775c-1.343,0 -1.933,-1.479 -1.933,-4.775Zm-1.479,-0c-0,3.916 1.21,5.985 3.412,5.985c2.203,0 3.413,-2.069 3.413,-5.985c-0,-3.916 -1.21,-5.985 -3.413,-5.985c-2.202,-0 -3.412,2.069 -3.412,5.985Z"
        className={styles.bgLine}
      />
      <path
        d="M18.617,237.079c0,-3.296 0.59,-4.775 1.933,-4.775c1.343,-0 1.933,1.479 1.933,4.775c-0,3.296 -0.59,4.775 -1.933,4.775c-1.343,0 -1.933,-1.479 -1.933,-4.775Zm-1.48,-0c0,3.916 1.21,5.985 3.413,5.985c2.203,0 3.412,-2.069 3.412,-5.985c0,-3.916 -1.209,-5.985 -3.412,-5.985c-2.203,-0 -3.413,2.069 -3.413,5.985Z"
        className={styles.bgLine}
      />
      <path
        d="M26.686,237.079c0,-3.296 0.59,-4.775 1.933,-4.775c1.343,-0 1.933,1.479 1.933,4.775c-0,3.296 -0.59,4.775 -1.933,4.775c-1.343,0 -1.933,-1.479 -1.933,-4.775Zm-1.48,-0c0,3.916 1.21,5.985 3.413,5.985c2.203,0 3.412,-2.069 3.412,-5.985c0,-3.916 -1.209,-5.985 -3.412,-5.985c-2.203,-0 -3.413,2.069 -3.413,5.985Z"
        className={styles.bgLine}
      />
      <path
        d="M3.774,189.432l1.477,-0l0,-11.734l-1.343,-0l-2.403,2.286l0.773,1.093l1.496,-1.683l0,10.038Z"
        className={styles.bgLine}
      />
      <path
        d="M9.472,189.078c0.69,0.303 1.547,0.473 2.303,0.473c2.506,-0 3.782,-1.616 3.782,-4.055c0,-2.32 -1.496,-3.496 -3.226,-3.496c-0.439,-0 -0.959,0.069 -1.329,0.186l-0,-3.279l3.985,0l0,-1.21l-5.398,0l0,5.899c0.809,-0.25 1.346,-0.384 1.933,-0.384c1.582,0 2.489,0.874 2.489,2.47c0,1.532 -0.943,2.656 -2.436,2.656c-0.673,0 -1.53,-0.32 -2.033,-0.62l-0.07,1.36Z"
        className={styles.bgLine}
      />
      <path
        d="M18.617,183.564c0,-3.295 0.59,-4.775 1.933,-4.775c1.343,-0 1.933,1.48 1.933,4.775c-0,3.296 -0.59,4.775 -1.933,4.775c-1.343,0 -1.933,-1.479 -1.933,-4.775Zm-1.48,0c0,3.916 1.21,5.985 3.413,5.985c2.203,0 3.412,-2.069 3.412,-5.985c0,-3.916 -1.209,-5.985 -3.412,-5.985c-2.203,0 -3.413,2.069 -3.413,5.985Z"
        className={styles.bgLine}
      />
      <path
        d="M26.686,183.564c0,-3.295 0.59,-4.775 1.933,-4.775c1.343,-0 1.933,1.48 1.933,4.775c-0,3.296 -0.59,4.775 -1.933,4.775c-1.343,0 -1.933,-1.479 -1.933,-4.775Zm-1.48,0c0,3.916 1.21,5.985 3.413,5.985c2.203,0 3.412,-2.069 3.412,-5.985c0,-3.916 -1.209,-5.985 -3.412,-5.985c-2.203,0 -3.413,2.069 -3.413,5.985Z"
        className={styles.bgLine}
      />
      <path
        d="M1,135.876l6.169,0l-0,-1.276l-4.539,-0c2.539,-2.539 4.372,-5.568 4.372,-7.618c-0,-1.613 -1.146,-2.956 -2.959,-2.956c-0.724,-0 -1.75,0.217 -2.757,0.703l0.187,1.48c0.67,-0.537 1.577,-0.907 2.25,-0.907c1.16,0 1.732,0.907 1.732,1.967c0,1.563 -1.479,3.899 -4.455,7.314l-0,1.293Z"
        className={styles.bgLine}
      />
      <path
        d="M10.548,130.009c0,-3.296 0.59,-4.776 1.933,-4.776c1.344,0 1.933,1.48 1.933,4.776c0,3.295 -0.589,4.775 -1.933,4.775c-1.343,-0 -1.933,-1.48 -1.933,-4.775Zm-1.479,-0c-0,3.915 1.21,5.985 3.412,5.985c2.203,-0 3.413,-2.07 3.413,-5.985c-0,-3.916 -1.21,-5.986 -3.413,-5.986c-2.202,0 -3.412,2.07 -3.412,5.986Z"
        className={styles.bgLine}
      />
      <path
        d="M18.617,130.009c0,-3.296 0.59,-4.776 1.933,-4.776c1.343,0 1.933,1.48 1.933,4.776c-0,3.295 -0.59,4.775 -1.933,4.775c-1.343,-0 -1.933,-1.48 -1.933,-4.775Zm-1.48,-0c0,3.915 1.21,5.985 3.413,5.985c2.203,-0 3.412,-2.07 3.412,-5.985c0,-3.916 -1.209,-5.986 -3.412,-5.986c-2.203,0 -3.413,2.07 -3.413,5.986Z"
        className={styles.bgLine}
      />
      <path
        d="M26.686,130.009c0,-3.296 0.59,-4.776 1.933,-4.776c1.343,0 1.933,1.48 1.933,4.776c-0,3.295 -0.59,4.775 -1.933,4.775c-1.343,-0 -1.933,-1.48 -1.933,-4.775Zm-1.48,-0c0,3.915 1.21,5.985 3.413,5.985c2.203,-0 3.412,-2.07 3.412,-5.985c0,-3.916 -1.209,-5.986 -3.412,-5.986c-2.203,0 -3.413,2.07 -3.413,5.986Z"
        className={styles.bgLine}
      />
      <path
        d="M99.81,87.187c0.387,0.05 0.84,0.122 1.227,0.122c1.766,0 2.555,-1.371 2.555,-3.295l0,-8.925l-1.479,-0l-0,8.841c-0,1.263 -0.47,1.922 -1.48,1.922c-0.283,-0 -0.57,-0.103 -0.823,-0.173l0,1.508Z"
        className={styles.bgLine}
      />
      <path
        d="M215.207,87.187l1.413,-0l0,-10.435l0.033,-0l3.193,10.435l1.077,-0l3.329,-10.435l0.033,-0l0,10.435l1.41,-0l0,-12.098l-2.217,-0l-3.009,9.62l-0.033,-0l-2.943,-9.62l-2.286,-0l0,12.098Z"
        className={styles.bgLine}
      />
      <path
        d="M335.72,87.187l1.476,-0l0,-12.098l-1.343,-0l-2.403,2.358l0.773,1.127l1.497,-1.733l-0,10.346Z"
        className={styles.bgLine}
      />
      <path
        d="M439.544,87.187l6.172,-0l-0,-1.318l-4.542,-0c2.539,-2.618 4.372,-5.735 4.372,-7.852c-0,-1.663 -1.146,-3.051 -2.959,-3.051c-0.721,0 -1.75,0.226 -2.759,0.729l0.186,1.527c0.676,-0.556 1.58,-0.937 2.256,-0.937c1.157,-0 1.73,0.937 1.73,2.027c-0,1.613 -1.48,4.022 -4.456,7.54l0,1.335Z"
        className={styles.bgLine}
      />
      <path
        d="M534.008,86.857c0.639,0.259 1.646,0.451 2.503,0.451c2.556,-0 3.816,-1.577 3.816,-3.485c-0,-1.524 -0.824,-2.789 -2.267,-2.979l-0,-0.036c1.243,-0.258 2.166,-1.179 2.166,-2.842c0,-2.028 -1.443,-2.998 -3.276,-2.998c-0.909,-0 -1.816,0.139 -2.572,0.503l0.136,1.421c0.67,-0.417 1.527,-0.678 2.15,-0.678c1.226,-0 2.086,0.781 2.086,1.977c-0,1.246 -0.91,2.133 -2.74,2.133l-0.609,0l0,1.246l1.096,0c1.427,0 2.286,0.832 2.286,2.064c0,1.471 -1.126,2.425 -2.406,2.425c-0.653,0 -1.463,-0.259 -2.236,-0.692l-0.133,1.49Z"
        className={styles.bgLine}
      />
      <path
        d="M608.429,87.187l1.413,-0l-0,-2.74l1.277,0l-0,-1.248l-1.277,-0l-0,-8.11l-1.799,-0l-4.22,7.904l0,1.454l4.606,0l0,2.74Zm0,-3.988l-3.362,-0l3.329,-6.583l0.033,-0l0,6.583Z"
        className={styles.bgLine}
      />
      <path
        d="M696.181,86.823c0.687,0.312 1.546,0.484 2.302,0.484c2.506,-0 3.783,-1.663 3.783,-4.175c-0,-2.391 -1.496,-3.607 -3.226,-3.607c-0.44,0 -0.96,0.07 -1.327,0.192l0,-3.382l3.98,0l-0,-1.246l-5.393,0l0,6.083c0.807,-0.259 1.341,-0.398 1.93,-0.398c1.583,0 2.492,0.901 2.492,2.548c0,1.576 -0.945,2.736 -2.442,2.736c-0.67,0 -1.526,-0.325 -2.033,-0.639l-0.066,1.404Z"
        className={styles.bgLine}
      />
      <path
        d="M411.268,103.666l6.172,-0l-0,-1.318l-4.542,-0c2.539,-2.618 4.372,-5.735 4.372,-7.852c-0,-1.663 -1.146,-3.051 -2.959,-3.051c-0.721,0 -1.75,0.228 -2.759,0.729l0.186,1.527c0.676,-0.556 1.58,-0.937 2.256,-0.937c1.157,-0 1.73,0.937 1.73,2.027c-0,1.613 -1.48,4.022 -4.456,7.54l0,1.335Z"
        className={styles.bgLine}
      />
      <path
        d="M420.227,96.803c0.489,-0.556 1.329,-0.918 2.203,-0.918c0.589,-0 1.143,0.153 1.429,0.553c0.27,0.381 0.32,0.762 0.32,1.422l-0,0.397l-0.826,0c-2.94,0 -4.033,1.266 -4.033,2.982c0,1.699 1.06,2.55 2.47,2.55c1.313,0 2.019,-0.642 2.406,-1.318l0.03,-0l0.086,1.196l1.277,-0c-0.031,-0.312 -0.067,-0.832 -0.067,-1.352l0,-4.611c0,-1.249 -0.367,-1.786 -0.74,-2.167c-0.267,-0.278 -1.026,-0.831 -2.286,-0.831c-0.84,-0 -1.713,0.258 -2.419,0.726l0.15,1.371Zm3.952,3.638c-0,1.215 -0.773,2.236 -2.002,2.236c-0.974,-0 -1.444,-0.607 -1.444,-1.541c0,-1.024 0.79,-1.839 2.453,-1.839c0.387,0 0.74,0 0.993,0.037l-0,1.107Z"
        className={styles.bgLine}
      />
      <path
        d="M465.549,103.666l6.171,-0l0,-1.318l-4.541,-0c2.539,-2.618 4.372,-5.735 4.372,-7.852c-0,-1.663 -1.146,-3.051 -2.959,-3.051c-0.721,0 -1.75,0.228 -2.759,0.729l0.186,1.527c0.676,-0.556 1.58,-0.937 2.255,-0.937c1.157,-0 1.73,0.937 1.73,2.027c0,1.613 -1.479,4.022 -4.455,7.54l-0,1.335Z"
        className={styles.bgLine}
      />
      <path
        d="M475.298,99.247c0,-2.22 0.59,-3.363 1.883,-3.363c1.296,0 1.883,1.143 1.883,3.363c0,2.216 -0.587,3.362 -1.883,3.362c-1.293,0 -1.883,-1.146 -1.883,-3.362Zm-1.413,2.789c0,0.54 -0.047,1.09 -0.066,1.63l1.362,-0l0.051,-1.299l0.033,0c0.37,0.693 1.009,1.421 2.253,1.421c1.766,0 2.959,-1.493 2.959,-4.541c-0,-3.051 -1.193,-4.542 -2.959,-4.542c-0.974,-0 -1.616,0.398 -2.184,1.335l-0.036,-0l0,-5.373l-1.413,-0l0,11.369Z"
        className={styles.bgLine}
      />
      <path
        d="M663.315,103.302c0.687,0.312 1.547,0.484 2.303,0.484c2.506,-0 3.782,-1.663 3.782,-4.175c0,-2.391 -1.496,-3.607 -3.226,-3.607c-0.439,0 -0.959,0.07 -1.326,0.192l-0,-3.382l3.98,0l-0,-1.246l-5.393,0l-0,6.083c0.806,-0.259 1.34,-0.398 1.93,-0.398c1.582,0 2.492,0.901 2.492,2.548c-0,1.577 -0.946,2.736 -2.442,2.736c-0.67,0 -1.527,-0.325 -2.033,-0.639l-0.067,1.404Z"
        className={styles.bgLine}
      />
      <path
        d="M671.871,96.803c0.489,-0.556 1.329,-0.918 2.202,-0.918c0.59,-0 1.143,0.153 1.43,0.553c0.27,0.381 0.32,0.762 0.32,1.422l-0,0.397l-0.826,0c-2.94,0 -4.033,1.266 -4.033,2.982c0,1.699 1.06,2.55 2.47,2.55c1.312,0 2.019,-0.642 2.405,-1.318l0.031,-0l0.086,1.196l1.277,-0c-0.031,-0.312 -0.067,-0.832 -0.067,-1.352l0,-4.611c0,-1.249 -0.367,-1.786 -0.74,-2.167c-0.267,-0.278 -1.026,-0.831 -2.286,-0.831c-0.84,-0 -1.713,0.258 -2.419,0.726l0.15,1.371Zm3.952,3.638c-0,1.215 -0.773,2.236 -2.003,2.236c-0.973,-0 -1.443,-0.607 -1.443,-1.541c-0,-1.024 0.79,-1.839 2.453,-1.839c0.386,0 0.74,0 0.993,0.037l-0,1.107Z"
        className={styles.bgLine}
      />
      <path
        d="M725.267,103.304c0.687,0.312 1.546,0.484 2.303,0.484c2.506,-0 3.782,-1.663 3.782,-4.175c0,-2.391 -1.496,-3.607 -3.226,-3.607c-0.439,0 -0.959,0.07 -1.327,0.192l0,-3.382l3.98,0l0,-1.246l-5.392,0l-0,6.083c0.806,-0.259 1.34,-0.398 1.93,-0.398c1.582,-0 2.492,0.901 2.492,2.548c-0,1.576 -0.946,2.736 -2.442,2.736c-0.67,0 -1.527,-0.325 -2.033,-0.639l-0.067,1.404Z"
        className={styles.bgLine}
      />
      <path
        d="M734.613,99.248c-0,-2.219 0.589,-3.362 1.883,-3.362c1.296,-0 1.883,1.143 1.883,3.362c-0,2.217 -0.587,3.363 -1.883,3.363c-1.294,-0 -1.883,-1.146 -1.883,-3.363Zm-1.413,2.79c-0,0.539 -0.047,1.093 -0.064,1.63l1.36,-0l0.05,-1.299l0.033,-0c0.37,0.692 1.01,1.421 2.253,1.421c1.766,-0 2.959,-1.494 2.959,-4.542c0,-3.051 -1.193,-4.541 -2.959,-4.541c-0.973,-0 -1.616,0.397 -2.183,1.335l-0.036,-0l-0,-5.374l-1.413,0l-0,11.37Z"
        className={styles.bgLine}
      />
      <path
        d="M13.115,36.46l1.413,0l-0,-5.459c-0,-1.594 0.57,-2.253 1.613,-2.253c0.84,0 1.313,0.52 1.313,1.646l-0,6.066l1.41,0l-0,-5.459c-0,-1.594 0.57,-2.253 1.613,-2.253c0.843,0 1.313,0.52 1.313,1.646l-0,6.066l1.41,0l-0,-6.135c-0,-1.941 -1.007,-2.826 -2.487,-2.826c-0.976,0 -1.63,0.52 -2.083,1.385c-0.439,-0.898 -1.11,-1.385 -2.019,-1.385c-0.94,0 -1.663,0.434 -2.116,1.441l-0.037,-0l-0.05,-1.321l-1.362,-0c0.019,0.626 0.069,1.265 0.069,1.908l0,6.933Z"
        className={styles.bgLine}
      />
      <path
        d="M5.568,45.973l1.343,0l-0,-1.732l-1.343,-0l-0,1.732Zm2.689,0l1.346,0l-0,-1.732l-1.346,-0l-0,1.732Zm2.353,1.819l-1.41,0l-0,5.32c-0,1.597 -0.709,2.392 -1.816,2.392c-0.91,0 -1.413,-0.606 -1.413,-2.01l-0,-5.702l-1.413,0l-0,6.135c-0,1.942 1.01,2.826 2.506,2.826c0.993,0 1.713,-0.434 2.169,-1.438l0.033,0l0.051,1.318l1.362,0c-0.016,-0.625 -0.069,-1.265 -0.069,-1.907l-0,-6.934Z"
        className={styles.bgLine}
      />
      <rect
        x="12.846"
        y="54.691"
        width="1.616"
        height="1.941"
        className={styles.bgLine}
      />
      <path
        d="M16.964,56.632l1.413,0l0,-10.435l0.034,0l3.192,10.435l1.077,0l3.329,-10.435l0.033,0l0,10.435l1.41,0l0,-12.098l-2.216,-0l-3.01,9.62l-0.033,0l-2.942,-9.62l-2.287,-0l0,12.098Z"
        className={styles.bgLine}
      />
      <rect
        x="29.959"
        y="54.691"
        width="1.616"
        height="1.941"
        className={styles.bgLine}
      />
      <path
        d="M762.298,87.187l1.413,-0l0,-10.435l0.033,-0l3.193,10.435l1.077,-0l3.329,-10.435l0.033,-0l0,10.435l1.41,-0l0,-12.098l-2.217,-0l-3.009,9.62l-0.033,-0l-2.943,-9.62l-2.286,-0l0,12.098Z"
        className={styles.bgLine}
      />
      <path
        d="M781.008,83.201l0,-0.782c0,-2.6 -1.076,-4.194 -3.009,-4.194c-2.133,0 -3.309,1.769 -3.309,4.542c-0,2.773 1.176,4.541 3.443,4.541c0.859,0 1.73,-0.192 2.403,-0.52l-0.067,-1.318c-0.487,0.364 -1.26,0.729 -1.966,0.729c-1.564,-0 -2.337,-0.954 -2.337,-2.998l4.842,-0Zm-4.842,-1.11c0.034,-2.064 0.843,-2.756 1.75,-2.756c1.126,-0 1.68,0.918 1.68,2.756l-3.43,-0Z"
        className={styles.bgLine}
      />
      <text x="0.378px" y="81.736px" className={styles.label}>
        2500
      </text>
      <text x="8.446px" y="296.502px" className={styles.label}>
        500
      </text>
      <text x="0.378px" y="242.946px" className={styles.label}>
        1000
      </text>
      <text x="0.378px" y="189.432px" className={styles.label}>
        1500
      </text>
      <text x="0.378px" y="135.876px" className={styles.label}>
        2000
      </text>
      <text x="99.423px" y="87.187px" className={styles.label}>
        J
      </text>
      <text x="213.913px" y="87.187px" className={styles.label}>
        M
      </text>
      <text x="332.324px" y="87.187px" className={styles.label}>
        1
      </text>
      <text x="438.922px" y="87.187px" className={styles.label}>
        2
      </text>
      <text x="533.386px" y="87.187px" className={styles.label}>
        3
      </text>
      <text x="603.436px" y="87.187px" className={styles.label}>
        4
      </text>
      <text x="695.156px" y="87.187px" className={styles.label}>
        5
      </text>
      <text x="410.646px" y="103.666px" className={styles.label}>
        2a
      </text>
      <text x="464.927px" y="103.666px" className={styles.label}>
        2b
      </text>
      <text x="662.29px" y="103.666px" className={styles.label}>
        5a
      </text>
      <text x="724.242px" y="103.668px" className={styles.label}>
        5b
      </text>
      <text x="103px" y="36.454px" className={styles.labelMiddle}>
        {info('forestEcoregion', 'J')[i18n.language]}
      </text>
      <text x="222px" y="37.234px" className={styles.labelMiddle}>
        {info('forestEcoregion', 'M')[i18n.language]}
      </text>
      <text y="19.677px" className={styles.labelMiddle}>
        <Trans i18nKey="forestTypeDiagram.forestEcoregion.1">
          <tspan x="335px">Northern</tspan>
          <tspan x="335px" dy="20">
            Pre-
          </tspan>
          <tspan x="335px" dy="20">
            Alps
          </tspan>
        </Trans>
      </text>
      <text y="19.677px" className={styles.labelMiddle}>
        <Trans i18nKey="forestTypeDiagram.forestEcoregion.2">
          <tspan x="440px">Northern</tspan>
          <tspan x="440px" dy="20">
            intermediate
          </tspan>
          <tspan x="440px" dy="20">
            Alps
          </tspan>
        </Trans>
      </text>
      <text y="19.677px" className={styles.labelMiddle}>
        <Trans i18nKey="forestTypeDiagram.forestEcoregion.3">
          <tspan x="530px">Continental</tspan>
          <tspan x="530px" dy="20">
            high
          </tspan>
          <tspan x="530px" dy="20">
            Alps
          </tspan>
        </Trans>
      </text>
      <text y="19.677px" className={styles.labelMiddle}>
        <Trans i18nKey="forestTypeDiagram.forestEcoregion.4">
          <tspan x="610px">Southern</tspan>
          <tspan x="610px" dy="20">
            intermediate
          </tspan>
          <tspan x="610px" dy="20">
            Alps
          </tspan>
        </Trans>
      </text>
      <text y="19.677px" className={styles.labelMiddle}>
        <Trans i18nKey="forestTypeDiagram.forestEcoregion.5">
          <tspan x="695px">Southern</tspan>
          <tspan x="695px" dy="20">
            Pre-
          </tspan>
          <tspan x="695px" dy="20">
            Alps
          </tspan>
        </Trans>
      </text>
      <text y="31.898px" className={styles.labelMiddle}>
        <Trans i18nKey="forestTypeDiagram.forestEcoregion.Me">
          <tspan x="768px">Mendris-</tspan>
          <tspan x="768px" dy="20">
            iotto
          </tspan>
        </Trans>
      </text>
      <text x="12.09px" y="36.46px" className={styles.label}>
        m
      </text>
      <text x="3.534px" y="56.635px" className={styles.label}>
        {t('forestTypeDiagram.aboveSeaLevel')}
      </text>
      <text x="761.004px" y="87.187px" className={styles.label}>
        Me
      </text>
      <text x="439.64px" y="315.366px" className={styles.label}>
        C
      </text>
      <text x="604.949px" y="280.754px" className={styles.label}>
        C
      </text>
      <text x="689.655px" y="279.801px" className={styles.label}>
        CB
      </text>
      <text x="671.349px" y="324.379px" className={styles.label}>
        HY
      </text>
      <text x="528.195px" y="120px" className={styles.label}>
        OSA
      </text>
      <text x="533.877px" y="161.666px" className={styles.label}>
        SA
      </text>
      <text x="379.511px" y="196.192px" className={styles.label}>
        HM
      </text>
      <text x="529.977px" y="212.657px" className={styles.label}>
        HM
      </text>
      <text x="700.951px" y="211.583px" className={styles.label}>
        OM /
      </text>
      <text x="717.543px" y="231.757px" className={styles.label}>
        UM
      </text>
      <text x="109.039px" y="182.118px" className={styles.label}>
        HM
      </text>
      <text x="84.816px" y="218.03px" className={styles.label}>
        OM
      </text>
      <text x="69.468px" y="267.634px" className={styles.label}>
        UM
      </text>
      <text x="54.591px" y="301.951px" className={styles.label}>
        SM
      </text>
      <text x="268.851px" y="218.03px" className={styles.label}>
        OM
      </text>
      <text x="268.212px" y="268.899px" className={styles.label}>
        UM
      </text>
      <text x="269.456px" y="303.217px" className={styles.label}>
        SM
      </text>
    </svg>
  );
}

AltitudinalZoneForestEcoregion.propTypes = {
  data: PropTypes.arrayOf().isRequired,
};

export default AltitudinalZoneForestEcoregion;
