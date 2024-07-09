import React, { useMemo } from 'react';
import { Button, Message } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { Trans, useTranslation } from 'react-i18next';
import styles from './CookieBanner.module.css';
import { setConsentGiven } from '../store/actions';

const CookieBanner = () => {
  const consentGiven = useSelector((state) => state.consentGiven);
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();

  const link = useMemo(
    () =>
      i18n.language === 'fr'
        ? 'https://www.wsl.ch/fr/a-propos-du-wsl/conditions-dutilisation.html'
        : 'https://www.wsl.ch/de/ueber-die-wsl/rechtliches.html',
    [i18n.language],
  );

  return !consentGiven ? (
    <Message floating color="black" className={styles.cookieBanner}>
      <div>
        <Trans i18nKey="cookieConsent" t={t}>
          <a href={link} rel="noopener noreferrer" target="_blank">
            Datenschutzerklärung
          </a>
        </Trans>
        <Button
          inverted
          color="black"
          className={styles.cookieConsentBtn}
          onClick={() => {
            dispatch(setConsentGiven(true));
            localStorage.setItem('tree.consentGiven', true);
          }}
          data-cypress="cookie-consent-ok-btn"
        >
          OK
        </Button>
      </div>
    </Message>
  ) : null;
};

export default CookieBanner;
