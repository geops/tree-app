import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Header, Icon, Modal } from 'semantic-ui-react';

import Button from './Button';
import { ReactComponent as Logo } from '../icons/logo.svg';
import { closeWelcomeModal } from '../store/actions';

function WelcomeModal() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const welcomeModalOpen = useSelector(state => state.welcomeModalOpen);
  return (
    <Modal open={welcomeModalOpen}>
      <Modal.Header>{t('welcome.header')}</Modal.Header>
      <Modal.Content image>
        <Logo style={{ margin: '0 50px' }} />
        <Modal.Description>
          <Trans i18nKey="welcome.content">
            about <i>app</i>
            <ol>
              <li>today</li>
              <li>moderate</li>
              <li>extreme</li>
            </ol>
            by
          </Trans>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button active onClick={() => dispatch(closeWelcomeModal())}>
          <Icon name="checkmark" /> {t('welcome.close')}
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default WelcomeModal;
