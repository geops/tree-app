import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import ExportButton from './ExportButton';
import Button from './Button';
import styles from './TabFooter.module.css';
import getCantonalForestTypes from '../utils/getCantonalForestType';
import { setForestTypeDescription } from '../store/actions';

function TabFooter(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { onExport, forestType, isFuture } = props;
  const activeProfile = useSelector((state) => state.activeProfile);

  const cantonalForestTypes = useMemo(
    () => getCantonalForestTypes(forestType, activeProfile, isFuture),
    [forestType, activeProfile, isFuture],
  );

  if (!onExport && !cantonalForestTypes?.length) return null;

  return (
    <div className={styles.tabFooter}>
      {cantonalForestTypes?.length ? (
        <div className={styles.cantonalForestTypes}>
          {cantonalForestTypes.map((ft) => (
            <Button
              basic
              key={ft.code}
              active
              compact
              className={styles.cantonalForestTypeButton}
              onClick={() => dispatch(setForestTypeDescription(ft.code))}
            >
              {ft.code}
            </Button>
          ))}
        </div>
      ) : null}
      {onExport && (
        <ExportButton onClick={onExport} className={`${styles.exportButton}`}>
          {t('export.exportRecommendation')}
        </ExportButton>
      )}
    </div>
  );
}

TabFooter.propTypes = {
  onExport: PropTypes.func,
  forestType: PropTypes.string,
  isFuture: PropTypes.bool,
};

TabFooter.defaultProps = {
  onExport: null,
  forestType: null,
  isFuture: false,
};

export default TabFooter;
