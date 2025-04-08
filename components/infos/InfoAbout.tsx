import { Trans } from "react-i18next";

import pkg from "../../package.json";

function InfoAbout() {
  return (
    <Trans i18nKey="info.about">
      about <i>app</i>
      <ol className="ml-5">
        <li>today</li>
        <li>moderate</li>
        <li>extreme</li>
      </ol>
      version {{ version: pkg.version }}
    </Trans>
  );
}

export default InfoAbout;
