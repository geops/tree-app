import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { info } from '@geops/tree-lib';

import ChForestTypeDescription from './ch/ChForestTypesDescription';
import LuForestTypeDescription from './lu/LuForestTypeDescription';

function ForestTypeDescription() {
  const { t } = useTranslation();
  const activeProfile = useSelector((state) => state.activeProfile);
  const forestTypeInfo = useSelector((state) => state.forestTypeInfo);
  const data = useMemo(() => {
    let result;
    try {
      result = info('forestType', forestTypeInfo.code, activeProfile);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      result = undefined;
    }
    return result;
  }, [activeProfile, forestTypeInfo]);

  return (
    <>
      {data ? (
        <>
          {activeProfile === 'ch' && <ChForestTypeDescription data={data} />}
          {activeProfile === 'lu' && <LuForestTypeDescription data={data} />}
        </>
      ) : (
        <>{t('forestTypeModal.noDataMessage')}</>
      )}
    </>
  );
}

export default ForestTypeDescription;
