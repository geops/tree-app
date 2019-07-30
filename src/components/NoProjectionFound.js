import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Message } from 'semantic-ui-react';
import MapLocationInfo from './MapLocationInfo';

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
    .map(field => <li key={field}>{t(`${field}.label`)}</li>);

  return (
    <>
      {mapLocation.coordinate && missingFields.length >= 1 && (
        <Message negative>
          <Message.Header>
            {t('errorMessage.incompleteLocationInput')}
            {missingFields}
          </Message.Header>
        </Message>
      )}
      {/* {mapLocation.forestType && projectionLocation.options !== undefined && (
        <Message negative>
          <Message.Header>
            {t('errorMessage.noProjectionFoundMessage')}
            <p>hello there</p>
          </Message.Header>
        </Message>
      )} */}
    </>
  );
}

export default NoProjectionFound;
