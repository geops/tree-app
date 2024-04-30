/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import DefaultTabFooter from './DefaultTabFooter';
import SoTabFooter from './so';

function TabFooter(props) {
  const activeProfile = useSelector((state) => state.activeProfile);
  if (activeProfile === 'so') {
    return <SoTabFooter {...props} />;
  }
  return <DefaultTabFooter {...props} />;
}

TabFooter.propTypes = {
  onExport: PropTypes.func,
  cantonalForestTypeCode: PropTypes.string,
  cantonalForestTypeAltitudinalZone: PropTypes.string,
};

TabFooter.defaultProps = {
  onExport: null,
  cantonalForestTypeCode: null,
  cantonalForestTypeAltitudinalZone: null,
};

export default TabFooter;
