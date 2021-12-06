/* eslint-disable no-console */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button } from 'semantic-ui-react';

function ExportButton({ exportFunction }) {
  const { t } = useTranslation();
  const [exporting, setExporting] = useState(false);

  const exportDocx = useCallback(() => {
    setExporting(true);
    // exportFunction needs to return a promise (e.g. Packer.toBlob() from docxjs)
    exportFunction()
      .then(() => {
        setExporting(false);
      })
      .catch((error) => {
        setExporting(false);
        console.error('Could not export document', error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exportFunction]);

  return (
    <Button onClick={exportDocx} disabled={exporting}>
      {exporting ? t('export.exporting') : t('export.export')}
    </Button>
  );
}

ExportButton.propTypes = {
  exportFunction: PropTypes.func.isRequired,
};

export default ExportButton;
