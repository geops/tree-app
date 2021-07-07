import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { info } from '@geops/tree-lib';

import ChForestTypeDescription from './ch/ChForestTypesDescription';
import LuForestTypeDescription from './lu/LuForestTypeDescription';

function ForestTypeDescription() {
  const { t } = useTranslation();
  const activeProfile = useSelector((state) => state.activeProfile);
  const forestTypeInfo = useSelector((state) => state.forestTypeInfo);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data = useMemo(
    () => info('forestType', forestTypeInfo.code, activeProfile),
    [activeProfile],
  );

  const forestTypeExists = useMemo(() => {
    let result;
    try {
      result = info('forestType', forestTypeInfo.code, activeProfile);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      result = undefined;
    }
    return !!result;
  }, [forestTypeInfo, activeProfile]);

  console.log(forestTypeInfo);

  if (!forestTypeExists) {
    return <>{t('forestTypeModal.noDataMessage')}</>;
  }

  return (
    <>
      {activeProfile === 'ch' && <ChForestTypeDescription data={data} />}
      {activeProfile === 'lu' && <LuForestTypeDescription data={data} />}
    </>
  );
}

export default ForestTypeDescription;
