/* eslint-disable no-console */
import React, { useCallback, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styles from './ExportButton.module.css';
import Button from './Button';

function ExportButton({ children, onClick, className }) {
  const { t } = useTranslation();
  const [exporting, setExporting] = useState(false);

  const label = useMemo(() => children || t('export.export'), [children, t]);
  const exportDocx = useCallback(() => {
    setExporting(true);
    // exportFunction needs to return a promise (e.g. Packer.toBlob() from docxjs)
    onClick()
      .then(() => {
        setExporting(false);
      })
      .catch((err) => {
        setExporting(false);
        console.error('Could not export document', err);
      });
  }, [onClick]);

  return (
    <Button
      onClick={exportDocx}
      disabled={exporting}
      active
      className={`${styles.exportButton} ${className}`}
    >
      {exporting ? t('export.exporting') : label}
    </Button>
  );
}

ExportButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  className: PropTypes.string,
};

ExportButton.defaultProps = {
  children: undefined,
  className: '',
};

export default ExportButton;
