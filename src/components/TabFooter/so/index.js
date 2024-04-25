import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from 'semantic-ui-react';
import ExportButton from '../../ExportButton';
import Button from '../../Button';
import styles from '../TabFooter.module.css';
import getCantonalForestTypes from './getCantonalForestType';
import { setForestTypeDescription } from '../../../store/actions';

function SoTabFooter(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { onExport, cantonalForestTypeCode, cantonalForestTypeAltitudinalZone } = props;
  const activeProfile = useSelector((state) => state.activeProfile);

  const cantonalForestType = useMemo(
    () => getCantonalForestTypes(cantonalForestTypeCode, activeProfile, cantonalForestTypeAltitudinalZone),
    [cantonalForestTypeCode, activeProfile, cantonalForestTypeAltitudinalZone],
  );

  if (!onExport && !cantonalForestType) return null;

  return (
    <div className={styles.tabFooter}>
      {cantonalForestType ? (
        <div className={styles.cantonalForestTypesWrapper}>
          <Header as="h4" inverted>{t('forestType.cantonalForestType')}</Header>
          <Button
              basic
              active
              compact
              className={styles.cantonalForestTypeButton}
              onClick={() => dispatch(setForestTypeDescription(cantonalForestType.codeSoFuture))}
              disabled={!cantonalForestType.hasPdf}
            >
              {cantonalForestType.codeSoFuture}
          </Button>
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

SoTabFooter.propTypes = {
  onExport: PropTypes.func,
  cantonalForestTypeCode: PropTypes.string,
  cantonalForestTypeAltitudinalZone: PropTypes.string,
};

SoTabFooter.defaultProps = {
  onExport: null,
  cantonalForestTypeCode: null,
  cantonalForestTypeAltitudinalZone: null,
};

export default SoTabFooter;
