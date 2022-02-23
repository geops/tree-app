import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form, Header, List, Message } from 'semantic-ui-react';
// eslint-disable-next-line import/no-unresolved
import { info } from '@geops/tree-lib';

import Button from './Button';
import Ecogram from './Ecogram';
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
  const selectForestType = async (forestType) => {
    await dispatch(setFormLocation({ forestType }));
    history.push(`/projection${history.location.search}`);
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
          <div className={styles.help}>
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
          <Header>{t('forestType.group.other')}</Header>
          <div className={styles.help}>
            <HelpModal color="#006268" header={t('forestType.group.other')}>
              {t('location.otherResultHelp')}
            </HelpModal>
          </div>
          {otherForestTypeGroups
            .filter((group) => forestTypes[group].length > 0)
            .map((group) => (
              <List key={group}>
                <Header content={t(`forestType.group.${group}`)} sub />
                {forestTypes[group].map((ftCode) => {
                  const ftInfo = info('forestType', ftCode);
                  const onClick = () => selectForestType(ftCode);
                  return (
                    <List.Item key={ftCode} className={styles.listitem}>
                      <Button
                        active
                        compact
                        onClick={onClick}
                        className={styles.forestTypeButton}
                      >
                        {ftCode} - {ftInfo[i18n.language]}
                      </Button>
                    </List.Item>
                  );
                })}
              </List>
            ))
            .reduce((ttft, ft) => ttft.concat(ft), [])}
        </>
      )}
    </Form>
  ) : null;
}

export default LocationResult;
