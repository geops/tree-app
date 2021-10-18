import React from 'react';
import { useTranslation } from 'react-i18next';

function ForestTypeComparison() {
  const { t } = useTranslation();

  return <p>{t('forestTypeModal.noComparisonMessage')}</p>;
}

export default ForestTypeComparison;
