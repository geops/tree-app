import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import Button from './Button';
import { ReactComponent as ManualIcon } from '../icons/manual.svg';
import { ReactComponent as MapIcon } from '../icons/map.svg';
import { setProjectionMode } from '../store/actions';

const formatCoordinate = coordinate =>
  coordinate.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1'");

const iconStyle = { height: '2em' };

function ProjectionMode() {
  const dispatch = useDispatch();
  const { coordinate, projectionMode } = useSelector(state => ({
    coordinate: state.mapLocation.coordinate,
    projectionMode: state.projectionMode,
  }));
  const { t } = useTranslation();
  return (
    <Grid columns="2" verticalAlign="middle">
      <Grid.Row>
        <Grid.Column>
          <Button
            disabled
            icon="point"
            label={
              coordinate
                ? coordinate.map(formatCoordinate).join(', ')
                : t('map.hint')
            }
          />
        </Grid.Column>
        <Grid.Column textAlign="right">
          <Button.Group>
            <Button
              active={projectionMode === 'map'}
              content={<MapIcon fill="white" style={iconStyle} />}
              onClick={() => dispatch(setProjectionMode('map'))}
            />
            <Button
              active={projectionMode === 'manual'}
              content={<ManualIcon fill="white" style={iconStyle} />}
              onClick={() => dispatch(setProjectionMode('manual'))}
            />
          </Button.Group>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row></Grid.Row>
    </Grid>
  );
}

export default ProjectionMode;
