import { info } from '@geops/tree-lib';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { List, Modal } from 'semantic-ui-react';

import Button from './Button';
import { setFormLocation, setForestTypes } from '../store/actions';

function ForestTypeModal() {
  const history = useHistory();
  const { search } = useLocation();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const forestTypes = useSelector((state) => state.forestTypes);
  const selectForestType = (forestType) => {
    dispatch(setForestTypes([]));
    dispatch(setFormLocation({ forestType }));
    history.push(`/projection${search}`);
  };

  if (forestTypes.length === 1) {
    selectForestType(forestTypes[0]);
  }

  return (
    <Modal open={forestTypes.length > 1}>
      <Modal.Header>{t('forestType.select')}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <List>
            {forestTypes.map((f) => (
              <List.Item>
                <Button active onClick={() => selectForestType(f)}>
                  {f} - {info('forestType', f)[i18n.language]}
                </Button>
              </List.Item>
            ))}
          </List>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => dispatch(setForestTypes([]))}>
          {t('forestType.cancel')}
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default ForestTypeModal;
