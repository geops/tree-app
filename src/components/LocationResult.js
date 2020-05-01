import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Form, Header, Message } from 'semantic-ui-react';
// eslint-disable-next-line import/no-unresolved
import { info } from 'lib/src';

import Dropdown from './Dropdown';
import Ecogram from './Ecogram';
import ForestTypeButton from './ForestTypeButton';
import HelpModal from './HelpModal';
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

  const history = useHistory();
  const { search } = useLocation();
  const selectForestType = (forestType) => {
    dispatch(setFormLocation({ forestType }));
    history.push(`/projection${search}`);
  };
  const hasMainGroup =
    !formLocation.groups || formLocation.groups.includes('main');
  const hasOtherGroup =
    !formLocation.groups ||
    formLocation.groups.filter((group) => group !== 'main').length > 0;

  return forestTypes ? (
    <Form className={styles.form}>
      {hasMainGroup && (
        <>
          <Header>{t('forestType.group.main')}</Header>
          <div className={styles.mainHelp}>
            <HelpModal color="#006268" header={t('forestType.group.main')}>
              {t('location.mainResultHelp')}
            </HelpModal>
          </div>
        </>
      )}
      {hasMainGroup && ecogram && (
        <Ecogram data={ecogram} selectForestType={selectForestType} />
      )}
      {hasMainGroup && !ecogram && <Message>{t('location.noEcogram')}</Message>}
      {hasOtherGroup && (
        <>
          <div className={styles.otherHelp}>
            <HelpModal color="#006268" header={t('forestType.group.other')}>
              {t('location.otherResultHelp')}
            </HelpModal>
          </div>
          <Dropdown
            search={false}
            label={t('forestType.group.other')}
            value={formLocation.forestType}
          >
            <Dropdown.Menu>
              {otherForestTypeGroups
                .map((group) => (
                  <>
                    <Dropdown.Header content={t(`forestType.group.${group}`)} />
                    {forestTypes[group].map((key) => {
                      return (
                        <Dropdown.Item
                          content={
                            <>
                              <ForestTypeButton code={key} compact />
                              {key} - {info('forestType', key)[i18n.language]}
                            </>
                          }
                          value={key}
                          onClick={(e, { value: forestType }) =>
                            selectForestType(forestType)
                          }
                        />
                      );
                    })}
                  </>
                ))
                .reduce((ttft, ft) => ttft.concat(ft), [])}
            </Dropdown.Menu>
          </Dropdown>
        </>
      )}
    </Form>
  ) : null;
}

export default LocationResult;
