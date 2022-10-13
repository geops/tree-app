import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Form, Popup } from 'semantic-ui-react';
import { info, utils } from '@geops/tree-lib';

import Dropdown from '../Dropdown';
import { setForestTypeComparison } from '../../store/actions';

import ChForestTypeComparison from './ch';
import LuForestTypeComparison from './lu';

import styles from './ForestTypeComparison.module.css';

const { sortForestTypes } = utils();
const getValidForestTypes = (codes, activeProfile) =>
  codes.reduce((forestTypes, code) => {
    try {
      const nextFt = info('forestType', code, activeProfile);
      return [...forestTypes, nextFt];
    } catch {
      return forestTypes;
    }
  }, []);

function ForestTypeComparison() {
  const dispatch = useDispatch();
  const activeProfile = useSelector((state) => state.activeProfile);
  const codes = useSelector((state) => state.forestTypeComparison) || [];
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { i18n, t } = useTranslation();

  const data = getValidForestTypes(codes, activeProfile);

  useEffect(() => {
    const validForestTypes = getValidForestTypes(codes, activeProfile);
    dispatch(setForestTypeComparison(validForestTypes.map((ft) => ft.code)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProfile, dispatch]);

  const options = useMemo(
    () =>
      info('forestType', null, activeProfile)
        .sort(sortForestTypes)
        .map((ft) => ({
          text: `${ft.code} - ${ft[i18n.language]}`,
          value: ft.code,
        })),
    [activeProfile, i18n.language],
  );

  return (
    <>
      <Form>
        <Popup
          trigger={
            <Dropdown
              label={t('forestTypeModal.compare')}
              multiple
              options={options}
              onChange={(e, { value }) =>
                dispatch(setForestTypeComparison(value))
              }
              value={codes}
              open={dropdownOpen && codes.length < 4}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onBlur={() => setDropdownOpen(false)}
            />
          }
          content={t('forestTypeModal.maximumForestTypes')}
          hideOnScroll
          disabled={codes.length < 4}
          position="bottom right"
          className={styles.maximumForestTypesPopup}
        />
      </Form>
      <br />
      {activeProfile === 'ch' && <ChForestTypeComparison />}
      {activeProfile === 'lu' && <LuForestTypeComparison data={data} />}
    </>
  );
}

ForestTypeComparison.Header = function ForestTypeComparisonHeader() {
  const { t } = useTranslation();
  return <>{t('forestTypeModal.compare')}</>;
};

export default ForestTypeComparison;
