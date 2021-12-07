/* eslint-disable no-console */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button } from 'semantic-ui-react';
import styles from './ExportButton.module.css';

function ExportButton({ onClick }) {
  const { t } = useTranslation();
  const [exporting, setExporting] = useState(false);

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
      className={styles.exportButton}
    >
      {exporting ? t('export.exporting') : t('export.export')}
    </Button>
  );
}

ExportButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ExportButton;
