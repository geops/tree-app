import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Header, Message } from 'semantic-ui-react';
// eslint-disable-next-line import/no-unresolved
import { info } from 'lib/src';

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
    locationResult: { ecogram, forestTypes },
  } = useSelector((state) => ({
    formLocation: state.formLocation,
    locationResult: state.locationResult,
  }));
  return forestTypes ? (
    <div>
      <Form className={styles.form}>
        <Header>{t('forestType.group.main')}</Header>
        {ecogram ? (
          <Ecogram data={ecogram} />
        ) : (
          <Message>{t('location.noEcogram')}</Message>
        )}
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
