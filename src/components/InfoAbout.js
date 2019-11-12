import React from 'react';
import { Trans } from 'react-i18next';

function InfoAbout() {
  return (
    <Trans i18nKey="info.about">
      about <i>app</i>
      <ol>
        <li>today</li>
        <li>moderate</li>
        <li>extreme</li>
      </ol>
      by
    </Trans>
  );
}

export default InfoAbout;
