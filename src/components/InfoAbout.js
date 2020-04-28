import React from 'react';
import { Trans } from 'react-i18next';

import { version } from '../../package.json';

function InfoAbout() {
  return (
    <Trans i18nKey="info.about">
      about <i>app</i>
      <ol>
        <li>today</li>
        <li>moderate</li>
        <li>extreme</li>
      </ol>
      version {{ version }}
    </Trans>
  );
}

export default InfoAbout;
