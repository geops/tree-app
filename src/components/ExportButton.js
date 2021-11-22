import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Button from './Button';

function ExportButton({ sameAltitudinalZone, exportFunction }) {
  const { t, i18n } = useTranslation();
  const {
    location,
    projectionMode,
    projectionResult,
    latinActive,
    mapLocation,
    future,
  } = useSelector((state) => ({
    location: state.location,
    projectionMode: state.projectionMode,
    projectionResult: state.projectionResult,
    latinActive: state.latinActive,
    mapLocation: state.mapLocation,
    future: state.future,
  }));

  const exportDocX = useCallback(() => {
    exportFunction(
      location,
      mapLocation,
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
    mapLocation,
    exportFunction,
    future,
  ]);

  return <Button onClick={exportDocX}>{t('export.export')}</Button>;
}

ExportButton.propTypes = {
  sameAltitudinalZone: PropTypes.bool,
  exportFunction: PropTypes.func.isRequired,
};

ExportButton.defaultProps = {
  sameAltitudinalZone: false,
};

export default ExportButton;
