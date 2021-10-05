import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';

function ForestTypeComparison({ data, compare }) {
  const { t } = useTranslation();

  return <p>{t('forestTypeModal.noComparisonMessage')}</p>;
}

ForestTypeComparison.propTypes = {
  data: PropTypes.shape().isRequired,
  compare: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ForestTypeComparison;
