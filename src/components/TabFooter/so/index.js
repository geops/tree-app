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
    scenarioKey,
  } = props;
  const { activeProfile, mapLocation, location } = useSelector(
    (state) => state,
  );

  const cantonalForestType = useMemo(
    () =>
      getCantonalForestType(
        cantonalForestTypeCode,
        activeProfile,
        cantonalForestTypeAltitudinalZone,
        /today/.test(scenarioKey) ? 'codeSoPresent' : undefined,
        mapLocation?.[`forestType_${activeProfile}`] || mapLocation?.forestType,
        location?.forestType,
      ),
    [
      cantonalForestTypeCode,
      activeProfile,
      cantonalForestTypeAltitudinalZone,
      mapLocation,
      location,
      scenarioKey,
    ],
  );

  const hasPdf = useHasPdf(cantonalForestType);

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
                dispatch(setForestTypeDescription(cantonalForestType))
              }
              disabled={!hasPdf}
            />
            <Header
              className={styles.cantonalForestTypeLabel}
              inverted
              as="span"
            >
              {cantonalForestType}
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
  scenarioKey: PropTypes.string,
};

SoTabFooter.defaultProps = {
  onExport: null,
  cantonalForestTypeCode: null,
  cantonalForestTypeAltitudinalZone: null,
  scenarioKey: null,
};

export default SoTabFooter;
