import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { info } from '@geops/tree-lib/src';

import Dropdown from './Dropdown';
import Ecogram from './Ecogram';
import { setFormLocation } from '../store/actions';
import styles from './LocationResult.module.css';

function LocationResult() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const {
    formLocation,
    locationResult: { forestTypes },
  } = useSelector((state) => ({
    formLocation: state.formLocation,
    locationResult: state.locationResult,
  }));
  if (formLocation.forestTypeGroup === 'main') {
    return (
      <div>
        <Ecogram />
      </div>
    );
  }
  if (formLocation.forestTypeGroup) {
    return (
      <Form className={styles.form}>
        <Dropdown
          label={t('forestType.label')}
          options={forestTypes.map((key) => {
            const label = info('forestType', key)[i18n.language];
            return {
              key,
              text: label ? `${key} - ${label}` : key,
              value: key,
            };
          })}
          onChange={(e, { value: forestType }) =>
            dispatch(setFormLocation({ forestType }))
          }
          value={formLocation.forestType}
        />
      </Form>
    );
  }
  return null;
}

export default LocationResult;
