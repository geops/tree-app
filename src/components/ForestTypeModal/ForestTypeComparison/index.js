import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Form, Popup } from 'semantic-ui-react';
import { info, utils } from '@geops/tree-lib';

import Dropdown from '../../Dropdown';
import LuForestTypeComparison from './lu';
import BlForestTypeComparison from './bl';
import NoForestTypeComparison from './NoForestTypeComparison.js';
import { setForestTypeComparison } from '../../../store/actions';
import { getValidForestTypes } from '../../../utils/comparisonUtils';

import styles from './ForestTypeComparison.module.css';

const { sortForestTypes } = utils();
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
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProfile, dispatch]);

  const options = useMemo(() => {
    try {
      const infos = info('forestType', null, activeProfile);
      return infos.sort(sortForestTypes).map((ft) => ({
        text: `${ft.code}${ft[i18n.language] ? ` - ${ft[i18n.language]}` : ''}`,
        value: ft.code,
      }));
    } catch (error) {
      return [];
    }
  }, [activeProfile, i18n.language]);

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
          on={['click']}
        />
      </Form>
      <br />
      {/^(ch|vd)$/.test(activeProfile) && <NoForestTypeComparison />}
      {activeProfile === 'lu' && <LuForestTypeComparison data={data} />}
      {activeProfile === 'bl' && <BlForestTypeComparison data={data} />}
    </>
  );
}

ForestTypeComparison.Header = function ForestTypeComparisonHeader() {
  const { t } = useTranslation();
  return <>{t('forestTypeModal.compare')}</>;
};

export default ForestTypeComparison;
