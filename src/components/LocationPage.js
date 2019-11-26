import React from 'react';
import { useTranslation } from 'react-i18next';
import { Message } from 'semantic-ui-react';

import styles from './LocationPage.module.css';

function LocationPage() {
  const { t } = useTranslation();
  return (
    <Message className={styles.message} size="big">
      {t('location.underConstruction')}
    </Message>
  );
}

export default LocationPage;
