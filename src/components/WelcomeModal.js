import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Image, Modal } from 'semantic-ui-react';

import Button from './Button';
import InfoAbout from './InfoAbout';
import { ReactComponent as Logo } from '../icons/logo.svg';
import { setWelcomeModal } from '../store/actions';
import styles from './WelcomeModal.module.css';

function WelcomeModal() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const welcomeModalOpen = useSelector(state => state.welcomeModalOpen);
  return (
    <Modal open={welcomeModalOpen}>
      <Modal.Header>{t('welcome.header')}</Modal.Header>
      <Modal.Content image>
        <Image wrapped>
          <Logo className={styles.logo} />
        </Image>
        <Modal.Description>
          <InfoAbout />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button active onClick={() => dispatch(setWelcomeModal(false))}>
          <Icon name="checkmark" /> {t('welcome.close')}
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default WelcomeModal;
