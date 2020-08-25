import React from 'react';
import { useTranslation } from 'react-i18next';

import Button from './Button';

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  return (
    <Button.Group>
      <Button
        active={i18n.language !== 'de'}
        disabled={i18n.language === 'de'}
        content="deutsch"
        onClick={() => i18n.changeLanguage('de')}
      />
      <Button
        active={i18n.language !== 'fr'}
        disabled={i18n.language === 'fr'}
        content="français"
        onClick={() => i18n.changeLanguage('fr')}
      />
    </Button.Group>
  );
}

export default LanguageSwitcher;
