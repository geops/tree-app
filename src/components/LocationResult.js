import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Header } from 'semantic-ui-react';
import { info } from '@geops/tree-lib/src';

import Dropdown from './Dropdown';
import Ecogram from './Ecogram';
import { setFormLocation } from '../store/actions';
import styles from './LocationResult.module.css';

const otherForestTypeGroups = ['special', 'volatile', 'riverside', 'pioneer'];

function LocationResult() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const {
    formLocation,
    location,
    locationResult: { ecogram, forestTypes },
  } = useSelector((state) => ({
    formLocation: state.formLocation,
    location: state.location,
    locationResult: state.locationResult,
  }));
  return location.forestEcoregion ? (
    <div>
      <Form className={styles.form}>
        <Header>{t('forestType.group.main')}</Header>
        <Ecogram data={ecogram} />
        <Dropdown
          label={t('forestType.group.other')}
          onChange={(e, { value: forestType }) =>
            dispatch(setFormLocation({ forestType }))
          }
          value={formLocation.forestType}
        >
          <Dropdown.Menu>
            {otherForestTypeGroups
              .map((group) => (
                <>
                  <Dropdown.Header content={t(`forestType.group.${group}`)} />
                  {forestTypes[group].map((key) => {
                    const label = info('forestType', key)[i18n.language];
                    const text = label ? `${key} - ${label}` : key;
                    return <Dropdown.Item text={text} value={key} />;
                  })}
                </>
              ))
              .reduce((ttft, ft) => ttft.concat(ft), [])}
          </Dropdown.Menu>
        </Dropdown>
      </Form>
    </div>
  ) : null;
}

export default LocationResult;
