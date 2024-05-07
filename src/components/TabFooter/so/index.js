import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from 'semantic-ui-react';
import DefaultTabFooter from '../DefaultTabFooter';
import Button from '../../Button';
import getCantonalForestType from './getCantonalForestType';
import { setForestTypeDescription } from '../../../store/actions';
import styles from '../TabFooter.module.css';

function SoTabFooter(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    onExport,
    cantonalForestTypeCode,
    cantonalForestTypeAltitudinalZone,
  } = props;
  const activeProfile = useSelector((state) => state.activeProfile);

  const cantonalForestType = useMemo(
    () =>
      getCantonalForestType(
        cantonalForestTypeCode,
        activeProfile,
        cantonalForestTypeAltitudinalZone,
      ),
    [cantonalForestTypeCode, activeProfile, cantonalForestTypeAltitudinalZone],
  );

  if (!onExport && !cantonalForestType) return null;

  return (
    <>
      <DefaultTabFooter onExport={onExport} />
      {cantonalForestType ? (
        <div className={styles.cantonalForestTypesWrapper}>
          <Header as="h4" inverted>
            {t('forestType.cantonalForestType')}
          </Header>
          <div className={styles.cantonalForestType}>
            <Button
              basic
              active
              compact
              icon="info"
              className={styles.cantonalForestTypeButton}
              onClick={() =>
                dispatch(
                  setForestTypeDescription(cantonalForestType.codeSoFuture),
                )
              }
              disabled={!cantonalForestType.hasPdf}
            />
            <Header
              className={styles.cantonalForestTypeLabel}
              inverted
              as="span"
            >
              {cantonalForestType.codeSoFuture}
            </Header>
          </div>
        </div>
      ) : null}
    </>
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
