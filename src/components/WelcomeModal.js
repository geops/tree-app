import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Image, Modal } from 'semantic-ui-react';

import InfoAbout from './InfoAbout';
import LanguageSwitcher from './LanguageSwitcher';
import ProfileSwitcher from './ProfileSwitcher';
import { ReactComponent as Logo } from '../icons/logo.svg';
import { setWelcomeModal } from '../store/actions';
import styles from './WelcomeModal.module.css';

function WelcomeModal() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const welcomeModalOpen = useSelector((state) => state.welcomeModalOpen);
  return (
    <Modal
      open={welcomeModalOpen}
      onClose={() => dispatch(setWelcomeModal(false))}
      closeIcon
    >
      <Modal.Header>{t('welcome.header')}</Modal.Header>
      <Modal.Content image>
        <Image wrapped>
          <Logo className={styles.logo} />
        </Image>
        <Modal.Description className={styles.description}>
          <InfoAbout />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions className={styles.actions}>
        <div className={styles.switchers}>
          <LanguageSwitcher />
          <ProfileSwitcher />
        </div>
      </Modal.Actions>
    </Modal>
  );
}

export default WelcomeModal;
