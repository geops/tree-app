import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ExportButton from '../ExportButton';
import styles from './TabFooter.module.css';

function TabFooter(props) {
  const { t } = useTranslation();
  const { onExport } = props;

  if (!onExport) return null;

  return (
    <div className={styles.tabFooter}>
      {onExport && (
        <ExportButton onClick={onExport} className={`${styles.exportButton}`}>
          {t('export.exportRecommendation')}
        </ExportButton>
      )}
    </div>
  );
}

TabFooter.propTypes = {
  onExport: PropTypes.func,
};

TabFooter.defaultProps = {
  onExport: null,
};

export default TabFooter;
