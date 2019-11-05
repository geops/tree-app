import { transform } from 'ol/proj';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Label } from 'semantic-ui-react';

import Button from './Button';
import { ReactComponent as ManualIcon } from '../icons/manual.svg';
import { ReactComponent as MapPosition } from '../icons/mapPosition.svg';
import { ReactComponent as MapIcon } from '../icons/map.svg';
import { EPSG2056 } from '../map/projection';
import { setProjectionMode } from '../store/actions';
import styles from './ProjectionMode.module.css';

const formatCoordinates = coordinates =>
  transform(coordinates, 'EPSG:3857', EPSG2056)
    .map(c => c.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1'"))
    .join(', ');

function ProjectionMode() {
  const dispatch = useDispatch();
  const { coordinate, projectionMode } = useSelector(state => ({
    coordinate: state.mapLocation.coordinate,
    projectionMode: state.projectionMode,
  }));

  const { t } = useTranslation();
  return (
    <div className={styles.row}>
      <Button
        disabled
        className={
          projectionMode === 'm'
            ? `${styles.coordinateButtonActive}`
            : `${styles.coordinateButton}`
        }
        icon={
          // Reset size because OpenLayers map icon requires height and width.
          <MapPosition height={null} width={null} className={styles.icon} />
        }
        label={
          <Label color={projectionMode === 'm' ? 'black' : 'grey'}>
            {coordinate ? formatCoordinates(coordinate) : t('map.hint')}
          </Label>
        }
      />
      <Button.Group className={styles.group}>
        <Button
          active={projectionMode === 'm'}
          content={<MapIcon fill="white" className={styles.icon} />}
          onClick={() => {
            dispatch(setProjectionMode('m'));
          }}
          data-cypress="projectionModeMapButton"
        />
        <Button
          active={projectionMode === 'f'}
          content={<ManualIcon fill="white" className={styles.icon} />}
          onClick={() => {
            dispatch(setProjectionMode('f'));
          }}
          data-cypress="projectionModeFormButton"
        />
      </Button.Group>
    </div>
  );
}

export default ProjectionMode;
