import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from 'semantic-ui-react';

import Button from './Button';
import ForestTypeDescription from './ForestTypeDescription';

function ForestTypeModal({ data, setIsForestTypeModalOpen }) {
  const { i18n } = useTranslation();

  return (
    <Modal
      open
      actions={[{ key: 'done', content: 'Ok' }]}
      content={
        <Modal.Content>
          <ForestTypeDescription data={data} />
        </Modal.Content>
      }
      header={`${data.code} - ${data[i18n.language]} (${data.la})`}
      onClose={() => setIsForestTypeModalOpen(false)}
      onOpen={() => setIsForestTypeModalOpen(true)}
      trigger={<Button active icon="info" />}
    />
  );
}

ForestTypeModal.propTypes = {
  data: PropTypes.arrayOf().isRequired,
  setIsForestTypeModalOpen: PropTypes.func.isRequired,
};

export default ForestTypeModal;
