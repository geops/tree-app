import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Message } from 'semantic-ui-react';
import styles from './projectionError.module.css';

const requiredFieldsForProjection = [
  'forestEcoregion',
  'forestType',
  'altitudinalZone',
];

function ProjectionError() {
  const { mapLocation, projectionMode } = useSelector(state => ({
    mapLocation: state.mapLocation,
    projectionMode: state.projectionMode,
  }));

  const { t } = useTranslation();
  const missingFields = requiredFieldsForProjection
    .filter(field => mapLocation[field] === undefined)
    .map(field => t(`${field}.label`));

  return projectionMode === 'm' &&
    mapLocation.coordinate &&
    missingFields.length >= 1 ? (
    <Message
      className={styles.message}
      positive
      compact
      header={t('errorMessage.incompleteLocationInput')}
      list={missingFields}
      size="small"
    />
  ) : null;
}

export default ProjectionError;
