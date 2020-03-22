import { info } from '@geops/tree-lib';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'semantic-ui-react';

import Dropdown from './Dropdown';
import styles from './LocationForm.module.css';
import { setFormLocation } from '../store/actions';

const getDropdownOptions = (type, lng, includeKey = false) => (key) => ({
  key,
  text: includeKey ? `${key} - ${info(type, key)[lng]}` : info(type, key)[lng],
  value: key,
});

function LocationForm() {
  const dispatch = useDispatch();
  const {
    formLocation,
    locateResult: { options },
    location,
    mapLocation,
    projectionMode,
  } = useSelector((state) => ({
    formLocation: state.formLocation,
    locateResult: state.locateResult,
    location: state.location,
    mapLocation: state.mapLocation,
    projectionMode: state.projectionMode,
  }));
  const { t, i18n } = useTranslation();
  const isDifferent = (field) => mapLocation[field] !== formLocation[field];
  return (
    <Form className={styles.form}>
      {projectionMode === 'f' && options.forestEcoregion && (
        <Dropdown
          clearable={isDifferent('forestEcoregion')}
          label={t('forestEcoregion.label')}
          options={options.forestEcoregion.map(
            getDropdownOptions('forestEcoregion', i18n.language),
          )}
          onChange={(e, { value: forestEcoregion }) =>
            dispatch(setFormLocation({ forestEcoregion }))
          }
          value={location.forestEcoregion}
        />
      )}
      {projectionMode === 'f' && options.altitudinalZone && (
        <Dropdown
          clearable={isDifferent('altitudinalZone')}
          label={t('altitudinalZone.label')}
          options={options.altitudinalZone.map(
            getDropdownOptions('altitudinalZone', i18n.language),
          )}
          onChange={(e, { value: altitudinalZone }) =>
            dispatch(setFormLocation({ altitudinalZone }))
          }
          value={location.altitudinalZone}
        />
      )}
    </Form>
  );
}

export default LocationForm;
