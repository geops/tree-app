import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Modal } from 'semantic-ui-react';

import Button from './Button';
import { setFormLocation, setForestTypes } from '../store/actions';

function ForestTypeModal() {
  const history = useHistory();
  const { search } = useLocation();
  const { t } = useTranslation();
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
          {forestTypes.map((f) => (
            <Button active onClick={() => selectForestType(f)}>
              {f}
            </Button>
          ))}
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
