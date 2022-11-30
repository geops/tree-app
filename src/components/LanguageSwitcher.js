import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Button from './Button';
import styles from './LanguageSwitcher.module.css';

function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const langOverride = useSelector((state) => state.langOverride);

  if (langOverride) {
    return null;
  }

  return (
    <div className={styles.languageSwitcher}>
      <label className={styles.label} htmlFor="language-switcher-buttons">
        <h5>{t('app.language')}</h5>
      </label>
      <Button.Group id="language-switcher-buttons" className={styles.buttons}>
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
    </div>
  );
}

export default LanguageSwitcher;
