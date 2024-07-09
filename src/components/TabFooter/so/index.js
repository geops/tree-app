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
import useHasPdf from '../../ForestTypeModal/ForestTypeDescription/so/useHasPdf';

function SoTabFooter(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    onExport,
    cantonalForestTypeCode,
    cantonalForestTypeAltitudinalZone,
  } = props;
  const { activeProfile, mapLocation } = useSelector((state) => state);

  const cantonalForestType = useMemo(
    () =>
      getCantonalForestType(
        cantonalForestTypeCode,
        activeProfile,
        cantonalForestTypeAltitudinalZone,
        undefined,
        mapLocation?.[`forestType_${activeProfile}`] || mapLocation?.forestType,
      ),
    [
      cantonalForestTypeCode,
      activeProfile,
      cantonalForestTypeAltitudinalZone,
      mapLocation,
    ],
  );

  const hasPdf = useHasPdf(cantonalForestType?.codeSoFuture);

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
              disabled={!hasPdf}
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
