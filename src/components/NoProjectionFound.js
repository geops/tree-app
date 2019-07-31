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
  const { mapLocation, projectionMode, projectionLocation } = useSelector(
    state => ({
      mapLocation: state.mapLocation,
      projectionMode: state.projectionMode,
      projectionLocation: state.projectionLocation,
    }),
  );

  const { t } = useTranslation();
  const missingFields = requiredFieldsForProjection
    .filter(field => mapLocation[field] === undefined)
    .map(field => t(`${field}.label`));

  return (
    <>
      {projectionMode === 'map' &&
        mapLocation.coordinate &&
        missingFields.length >= 1 && (
          <Message
            error
            header={t('errorMessage.incompleteLocationInput')}
            list={missingFields}
            size="large"
          />
        )}
      {projectionMode === 'map' &&
        missingFields.length === 0 &&
        mapLocation.forestType &&
        projectionLocation.forestType === undefined && (
          <Message negative>
            <Message.Header>
              {t('errorMessage.noProjectionFoundMessage')}
            </Message.Header>
          </Message>
        )}
    </>
  );
}

export default NoProjectionFound;
