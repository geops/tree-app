import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './Diagram.module.css';
import { getStyle } from './utils';

function Graininess({ graininess, rawMaterial }) {
  const { t } = useTranslation();
  return (
    <svg viewBox="0 0 400 400" className={styles.svg}>
      <rect
        className={getStyle(graininess, '2')}
        x="58.282"
        y="203.993"
        width="13.917"
        height="148.564"
      />
      <rect
        className={getStyle(graininess, '7')}
        x="87.101"
        y="203.993"
        width="29.803"
        height="148.564"
      />
      <rect
        className={getStyle(graininess, '8')}
        x="146.707"
        y="203.993"
        width="29.803"
        height="148.564"
      />
      <path
        className={getStyle(graininess, '3')}
        d="M206.313,204.31l-0,148.696l147.928,-0.45l-147.928,-148.246Z"
      />
      <path
        className={getStyle(graininess, '6')}
        d="M87.101,84.842l-0,119.149l59.606,0l-0,-59.415l-59.606,-59.734Z"
      />
      <path
        className={getStyle(graininess, '4')}
        d="M87.101,203.991l-0,-119.149l-28.819,-28.88l0,148.029l28.819,0Z"
      />
      <path
        className={getStyle(graininess, '9')}
        d="M146.707,144.576l59.288,59.415l-59.288,0l-0,-59.415Z"
      />
      <rect
        className={getStyle(graininess, '0')}
        x="72.199"
        y="203.993"
        width="14.902"
        height="148.564"
      />
      <rect
        className={getStyle(graininess, '1')}
        x="116.904"
        y="203.993"
        width="29.803"
        height="148.564"
      />
      <rect
        className={getStyle(graininess, '5')}
        x="176.51"
        y="203.993"
        width="29.803"
        height="148.564"
      />
      <text x="172.752px" y="393.468px" className={styles.label}>
        {t('forestTypeDiagram.graininess.clay')} [%]
      </text>
      <text
        x="16.938px"
        y="264.892px"
        className={styles.label}
        transform="matrix(-3.82857e-16,-1,1,-3.82857e-16,-247.954,281.83)"
      >
        {t('forestTypeDiagram.graininess.silt')} [%]
      </text>
      <text x="3.378px" y="22.147px" className={styles.header}>
        {t('forestTypeDiagram.graininess.label')}
      </text>
      <path
        d="M58.282,55.295l0,297.261l295.959,-0l-296.625,-297.261"
        className={styles.line}
      />
      <path d="M53.547,203.991l152.766,0" className={styles.thinLine} />
      <path d="M87.101,353.006l-0,-268.17" className={styles.thinLine} />
      <path d="M72.199,353.006l0,-149.016" className={styles.thinLine} />
      <path d="M116.904,353.006l-0,-149.016" className={styles.thinLine} />
      <path d="M146.707,353.006l-0,-208.483" className={styles.thinLine} />
      <path d="M176.509,353.006l0,-149.016" className={styles.thinLine} />
      <path d="M206.313,353.006l-0,-149.016" className={styles.thinLine} />
      <path d="M53.547,55.415l4.994,-0" className={styles.thinLine} />
      <text x="31.189px" y="204.017px" className={styles.label}>
        50
      </text>
      <text x="21.446px" y="57.502px" className={styles.label}>
        100
      </text>
      <text x="66.89px" y="372.076px" className={styles.label}>
        5
      </text>
      <text x="136.964px" y="372.076px" className={styles.label}>
        30
      </text>
      <text x="196.132px" y="372.076px" className={styles.label}>
        50
      </text>
      <text x="330.814px" y="371.445px" className={styles.label}>
        100
      </text>
      <rect
        x="202.004"
        y="39.658"
        width="30.14"
        height="29.789"
        className={getStyle(rawMaterial, '1')}
      />
      <rect
        x="202.004"
        y="82.067"
        width="30.14"
        height="30.14"
        className={getStyle(rawMaterial, '0')}
      />
      <text x="176.845px" y="22.14px" className={styles.header}>
        {t('forestTypeDiagram.rawMaterial.label')}
      </text>
      <text x="243.757px" y="62.494px" className={styles.label}>
        {t('forestTypeDiagram.rawMaterial.acid')}
      </text>
      <text x="243.757px" y="101.629px" className={styles.label}>
        {t('forestTypeDiagram.rawMaterial.alkaline')}
      </text>
      <text x="243.757px" y="140.764px" className={styles.label}>
        {t('forestTypeDiagram.rawMaterial.unkown')}
      </text>
      <rect
        x="201.692"
        y="39.532"
        width="30.183"
        height="30.183"
        className={styles.line}
      />
      <rect
        x="201.692"
        y="82.271"
        width="30.183"
        height="30.183"
        className={styles.line}
      />
    </svg>
  );
}

Graininess.propTypes = {
  graininess: PropTypes.arrayOf().isRequired,
  rawMaterial: PropTypes.arrayOf().isRequired,
};

export default Graininess;
