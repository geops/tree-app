import React, { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

function InfoImpressumLucerne() {
  return (
    <>
      <h3>Waldbaukommentar Luzern</h3>
      <h4>1991-2000: Feldkartierung durch Projektgemeinschaft</h4>
      <ul>
        <li>
          UTAS AG, Büro für Landschaft, Natur und Siedlung, Giswil
          (Projektleitung)
        </li>
        <li>Ökologische Beratung, Markus Baggenstos, Stans</li>
        <li>Pius Häfliger, Büro für Natur und Landschaft, Grosswangen</li>
      </ul>
      <h4>
        2021: Anpassung kantonale Waldgesellschaften an Standortstypen gemäss
        NaiS und Überarbeitung Standortsbeschreibungen
      </h4>
      <ul>
        <li>
          UTAS AG, Büro für Landschaft, Natur und Siedlung, Giswil
          (Projektleitung)
        </li>
        <li>Dienststelle Landwirtschaft und Wald (lawa)</li>
      </ul>
      <p>
        3. Auflage (digital)
        <br />
        Copyright: 2021 - UTAS AG, Giswil / lawa
      </p>
    </>
  );
}

export default function InfoImpressum() {
  const activeProfile = useSelector((state) => state.activeProfile);
  const { t, i18n } = useTranslation();
  const wslPrivacyLink = useMemo(
    () =>
      i18n.language === 'fr'
        ? 'https://www.wsl.ch/fr/a-propos-du-wsl/conditions-dutilisation.html'
        : 'https://www.wsl.ch/de/ueber-die-wsl/rechtliches.html',
    [i18n.language],
  );
  const bafuPrivacyLink = useMemo(
    () =>
      i18n.language === 'fr'
        ? 'https://www.admin.ch/gov/fr/accueil/conditions-utilisation.html'
        : 'https://www.admin.ch/gov/de/start/rechtliches.html',
    [i18n.language],
  );
  return (
    <div>
      <h3>{t('info.impressumGeneralTitle')}</h3>
      <p>
        <Trans i18nKey="info.impressum" t={t}>
          <a href={bafuPrivacyLink} rel="noopener noreferrer" target="_blank">
            {bafuPrivacyLink}
          </a>
          <a href={wslPrivacyLink} rel="noopener noreferrer" target="_blank">
            {wslPrivacyLink}
          </a>
        </Trans>
      </p>
      {activeProfile === 'lu' && <InfoImpressumLucerne />}
    </div>
  );
}
