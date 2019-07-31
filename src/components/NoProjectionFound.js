import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Message } from 'semantic-ui-react';

const requiredFieldsForProjection = [
  'forestEcoregion',
  'forestType',
  'altitudinalZone',
];

function NoProjectionFound() {
  const {
    mapLocation,
    projectionMode,
    projectionLocation,
    projectionOptions,
  } = useSelector(state => ({
    mapLocation: state.mapLocation,
    projectionMode: state.projectionMode,
    projectionLocation: state.projectionLocation,
    projectionOptions: state.projectionOptions,
  }));

  const { t } = useTranslation();
  const missingFields = requiredFieldsForProjection
    .filter(field => mapLocation[field] === undefined)
    .map(field => <li key={field}>{t(`${field}.label`)}</li>);

  return (
    <>
      {projectionMode === 'map' &&
        mapLocation.coordinate &&
        missingFields.length >= 1 && (
          <Message negative>
            <Message.Header>
              {t('errorMessage.incompleteLocationInput')}
              {missingFields}
            </Message.Header>
          </Message>
        )}
      {projectionMode === 'map' &&
        missingFields.length === 0 &&
        mapLocation.forestType &&
        projectionLocation.forestType === undefined && (
          <Message negative>
            <Message.Header>
              {t('errorMessage.noProjectionFoundMessage')}
              <p>hello there</p>
            </Message.Header>
          </Message>
        )}
    </>
  );
}

export default NoProjectionFound;
