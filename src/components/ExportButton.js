import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from 'semantic-ui-react';

function ExportButton({ exportFunction }) {
  const { t, i18n } = useTranslation();
  const { location, projectionMode, projectionResult, latinActive, future } =
    useSelector((state) => ({
      location: state.location,
      projectionMode: state.projectionMode,
      projectionResult: state.projectionResult,
      latinActive: state.latinActive,
      future: state.future,
    }));

  const exportDocX = useCallback(() => {
    exportFunction(
      location,
      projectionResult,
      projectionMode,
      future,
      latinActive,
      i18n,
      t,
    );
  }, [
    projectionResult,
    location,
    i18n,
    t,
    latinActive,
    projectionMode,
    exportFunction,
    future,
  ]);

  return <Button onClick={exportDocX}>{t('export.export')}</Button>;
}

ExportButton.propTypes = {
  exportFunction: PropTypes.func.isRequired,
};

export default ExportButton;
