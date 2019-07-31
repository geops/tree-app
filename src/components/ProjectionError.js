import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Message, Grid } from 'semantic-ui-react';

const requiredFieldsForProjection = [
  'forestEcoregion',
  'forestType',
  'altitudinalZone',
];

function ProjectionError() {
  const { mapLocation, projectionMode } = useSelector(state => ({
    mapLocation: state.mapLocation,
    projectionMode: state.projectionMode,
    projectionLocation: state.projectionLocation,
  }));

  const { t } = useTranslation();
  const missingFields = requiredFieldsForProjection
    .filter(field => mapLocation[field] === undefined)
    .map(field => t(`${field}.label`));

  return projectionMode === 'map' &&
    mapLocation.coordinate &&
    missingFields.length >= 1 ? (
    <Grid columns={1} centered>
      <Message
        error
        header={t('errorMessage.incompleteLocationInput')}
        list={missingFields}
        size="medium"
        compact
      />
    </Grid>
  ) : null;
}

export default ProjectionError;
