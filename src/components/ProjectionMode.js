import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { setProjectionMode } from '../store/actions';

const formatCoordinate = coordinate =>
  coordinate.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1'");

function ProjectionMode() {
  const dispatch = useDispatch();
  const { coordinate, projectionMode } = useSelector(state => ({
    coordinate: state.mapLocation.coordinate,
    projectionMode: state.projectionMode,
  }));
  const { t } = useTranslation();
  return (
    <>
      <Button
        active={projectionMode === 'map'}
        content="Karte"
        icon="point"
        label={{
          as: 'a',
          basic: true,
          pointing: 'right',
          content: coordinate
            ? coordinate.map(formatCoordinate).join(', ')
            : t('map.hint'),
        }}
        labelPosition="left"
        onClick={() => dispatch(setProjectionMode('map'))}
      />
      <Button
        active={projectionMode === 'manual'}
        content="Manual"
        icon="edit"
        onClick={() => dispatch(setProjectionMode('manual'))}
      />
    </>
  );
}

export default ProjectionMode;
