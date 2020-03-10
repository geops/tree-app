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
  const { location } = useSelector(state => ({ location: state.location }));
  const { t, i18n } = useTranslation();
  return (
    <Form className={styles.form}>
      <Dropdown
        label={t('forestEcoregion.label')}
        options={useMemo(
          () => getDropdownOptions('forestEcoregion', i18n.language, true),
          [i18n.language],
        )}
        onChange={(e, { value: forestEcoregion }) =>
          dispatch(setFormLocation({ forestEcoregion }))
        }
        value={location.forestEcoregion}
      />
      <Dropdown
        label={t('altitudinalZone.label')}
        options={useMemo(
          () => getDropdownOptions('altitudinalZone', i18n.language),
          [i18n.language],
        )}
        onChange={(e, { value: altitudinalZone }) =>
          dispatch(setFormLocation({ altitudinalZone }))
        }
        value={location.altitudinalZone}
      />
    </Form>
  );
}

export default LocationForm;
