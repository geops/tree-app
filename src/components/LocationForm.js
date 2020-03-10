import { info } from '@geops/tree-lib';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'semantic-ui-react';

import Dropdown from './Dropdown';
import styles from './LocationForm.module.css';
import { setFormLocation } from '../store/actions';

const getDropdownOptions = (type, lng, includeCode = false) => {
  return info(type).map(item => ({
    key: item.code,
    text: includeCode ? `${item.code} - ${item[lng]}` : item[lng],
    value: item.code,
  }));
};

function LocationForm() {
  const dispatch = useDispatch();
  const { formLocation, location, mapLocation, projectionMode } = useSelector(
    state => ({
      formLocation: state.formLocation,
      location: state.location,
      mapLocation: state.mapLocation,
      projectionMode: state.projectionMode,
    }),
  );
  const { t, i18n } = useTranslation();
  const forestEcoregions = useMemo(
    () => getDropdownOptions('forestEcoregion', i18n.language, true),
    [i18n.language],
  );
  const altitudinalZones = useMemo(
    () => getDropdownOptions('altitudinalZone', i18n.language),
    [i18n.language],
  );
  const isDifferent = field => mapLocation[field] !== formLocation[field];
  return (
    <Form className={styles.form}>
      {projectionMode === 'f' && (
        <Dropdown
          clearable={isDifferent('forestEcoregion')}
          label={t('forestEcoregion.label')}
          options={forestEcoregions}
          onChange={(e, { value: forestEcoregion }) =>
            dispatch(setFormLocation({ forestEcoregion }))
          }
          value={location.forestEcoregion}
        />
      )}
      {projectionMode === 'f' && (
        <Dropdown
          clearable={isDifferent('altitudinalZone')}
          label={t('altitudinalZone.label')}
          options={altitudinalZones}
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
