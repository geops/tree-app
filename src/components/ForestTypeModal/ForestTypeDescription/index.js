import React from 'react';
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

function ForestTypeDescription() {
  const activeProfile = 'so'; // useSelector((state) => state.activeProfile);
  const code = useSelector((state) => state.forestTypeDescription);
  const data = true; // getForestTypeData(code, activeProfile);
  const { t } = useTranslation();

  return data ? (
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
  const data = useSelector((state) =>
    getForestTypeData(state.forestTypeDescription, state.activeProfile),
  );
  const { i18n, t } = useTranslation();

  return data ? (
    <>
      {data.code} - {data[i18n.language]} {data.la && <i>{data.la}</i>}
    </>
  ) : (
    t('forestTypeModal.noDataHeader')
  );
};

export default ForestTypeDescription;
