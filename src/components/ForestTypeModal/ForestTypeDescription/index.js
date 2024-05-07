import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { info } from '@geops/tree-lib';

import ChForestTypesDescription from './ch/ForestTypesDescription';
import LuForestTypeDescription from './lu/ForestTypeDescription';
import BlForestTypeDescription from './bl/ForestTypeDescription';
import SoForestTypesDescription from './so/ForestTypesDescription';

function getForestTypeData(code, profile) {
  try {
    return code && info('forestType', code, profile);
  } catch (error) {
    return null;
  }
}

const useShowForestTypeDescription = (data, activeProfile) => {
  const showForestTypeDescription = useMemo(() => {
    if (activeProfile === 'so') {
      return !!(data?.code && data?.hasPdf);
    } 
    return !!data;
  }, [data, activeProfile]);
  return showForestTypeDescription;
};

function ForestTypeDescription() {
  const activeProfile = useSelector((state) => state.activeProfile);
  const code = useSelector((state) => state.forestTypeDescription);
  const data = getForestTypeData(code, activeProfile);
  const { t } = useTranslation();
  const showForestTypeDescription = useShowForestTypeDescription(data, activeProfile);

  return showForestTypeDescription ? (
    <>
      {activeProfile === 'ch' && <ChForestTypesDescription data={data} />}
      {activeProfile === 'lu' && <LuForestTypeDescription data={data} />}
      {activeProfile === 'bl' && <BlForestTypeDescription data={data} />}
      {activeProfile === 'so' && <SoForestTypesDescription code={code} />}
    </>
  ) : (
    t('forestTypeModal.noDataMessage')
  );
}

ForestTypeDescription.Header = function ForestTypeDescriptionHeader() {
  const code = useSelector((state) => state.forestTypeDescription);
  const activeProfile = useSelector((state) => state.activeProfile);
  const data = getForestTypeData(code, activeProfile);
  const showForestTypeDescription = useShowForestTypeDescription(data, activeProfile);
  const { i18n, t } = useTranslation();

  return showForestTypeDescription ? (
    <>
      {data.code} {data[i18n.language] && `- ${data[i18n.language]}`}{' '}
      {data.la && <i>{data.la}</i>}
    </>
  ) : (
    t('forestTypeModal.noDataHeader')
  );
};

export default ForestTypeDescription;
