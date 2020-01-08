import React from 'react';
import { Trans } from 'react-i18next';

function InfoAbout() {
  return (
    <Trans i18nKey="info.usage">
      <h3>views</h3>
      <p>description</p>
      <h3>map view</h3>
      <p>description</p>
      <h3>location and projection view</h3>
      <p>description</p>
      <h3>glossary</h3>
      <p>description</p>
    </Trans>
  );
}

export default InfoAbout;
