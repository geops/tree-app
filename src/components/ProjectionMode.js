import { transform } from 'ol/proj';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import Button from './Button';
import { ReactComponent as ManualIcon } from '../icons/manual.svg';
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
    <Grid columns="2" verticalAlign="middle" className={styles.grid}>
      <Grid.Row>
        <Grid.Column>
          <Button
            disabled
            icon="point"
            label={coordinate ? formatCoordinates(coordinate) : t('map.hint')}
          />
        </Grid.Column>
        <Grid.Column textAlign="right">
          <Button.Group>
            <Button
              active={projectionMode === 'm'}
              content={<MapIcon fill="white" className={styles.icon} />}
              onClick={() => dispatch(setProjectionMode('m'))}
            />
            <Button
              active={projectionMode === 'f'}
              content={<ManualIcon fill="white" className={styles.icon} />}
              onClick={() => dispatch(setProjectionMode('f'))}
            />
          </Button.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default ProjectionMode;
