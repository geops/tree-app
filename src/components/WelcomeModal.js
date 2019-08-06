import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

import { ReactComponent as Logo } from '../icons/logo.svg';
import { closeWelcomeModal } from '../store/actions';

function WelcomeModal() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const welcomeModalOpen = useSelector(state => state.welcomeModalOpen);
  return (
    <Modal open={welcomeModalOpen}>
      <Modal.Header>{t('app.title')}</Modal.Header>
      <Modal.Content image>
        <Logo style={{ margin: '0 50px' }} />
        <Modal.Description>
          <Header>Platzhalter</Header>
          <ul>
            <li>Verweis auf WSL als Urheberin</li>
            <li>Kurzer Info-Text zum Hintergrund der App</li>
            <li>
              Anleitung, dass auf Karte geklickt werden muss und weitere Infos
            </li>
            <li>Text wird von Peter</li>
          </ul>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => dispatch(closeWelcomeModal())}>
          <Icon name="checkmark" /> {t('welcome.close')}
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default WelcomeModal;
