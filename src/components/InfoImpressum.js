import React from 'react';
import { Trans } from 'react-i18next';
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
  return (
    <div>
      <Trans i18nKey="info.impressum">impressum</Trans>
      {activeProfile === 'lu' && <InfoImpressumLucerne />}
    </div>
  );
}
