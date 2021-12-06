/* eslint-disable no-console */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from 'semantic-ui-react';

function ExportButton({ exportFunction }) {
  const { t, i18n } = useTranslation();
  const [exporting, setExporting] = useState(false);
  const {
    location,
    projectionMode,
    projectionResult,
    latinActive,
    future,
    activeProfile,
  } = useSelector((state) => ({
    location: state.location,
    projectionMode: state.projectionMode,
    projectionResult: state.projectionResult,
    latinActive: state.latinActive,
    future: state.future,
    activeProfile: state.activeProfile,
  }));

  const exportDocX = useCallback(() => {
    setExporting(true);
    // exportFunction needs to return a promise (e.g. Packer.toBlob() from docxjs)
    exportFunction(
      location,
      projectionResult,
      projectionMode,
      future,
      latinActive,
      activeProfile,
      i18n,
      t,
    )
      .then(() => {
        setExporting(false);
      })
      .catch((error) => {
        setExporting(false);
        console.error('Could not export document', error);
      });
  }, [
    projectionResult,
    location,
    i18n,
    t,
    latinActive,
    projectionMode,
    exportFunction,
    future,
    activeProfile,
  ]);

  return (
    <Button onClick={exportDocX} disabled={exporting}>
      {exporting ? t('export.exporting') : t('export.export')}
    </Button>
  );
}

ExportButton.propTypes = {
  exportFunction: PropTypes.func.isRequired,
};

export default ExportButton;
