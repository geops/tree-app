import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Message } from 'semantic-ui-react';
import styles from './projectionError.module.css';

function ProjectionError() {
  const { mapLocation, projectionMode } = useSelector(state => ({
    mapLocation: state.mapLocation,
    projectionMode: state.projectionMode,
  }));

  const { t } = useTranslation();

  return projectionMode === 'm' && mapLocation.forestType === '50a' ? (
    <Message
      className={styles.message}
      success
      compact
      header={`${mapLocation.forestType} ${t(
        'errorMessage.invalidForestType',
      )}`}
      size="small"
    />
  ) : null;
}

export default ProjectionError;
