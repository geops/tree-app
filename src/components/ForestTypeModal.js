import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from 'semantic-ui-react';

import Button from './Button';
import ForestTypeDescription from './ForestTypeDescription';

function ForestTypeModal({ compact, data, setIsForestTypeModalOpen }) {
  const { i18n } = useTranslation();

  return (
    <Modal
      actions={[{ key: 'done', content: 'Ok' }]}
      content={
        <Modal.Content>
          <ForestTypeDescription data={data} />
        </Modal.Content>
      }
      header={`${data.code} - ${data[i18n.language]} (${data.la})`}
      onClose={() => setIsForestTypeModalOpen(false)}
      onOpen={() => setIsForestTypeModalOpen(true)}
      trigger={<Button active compact={compact} icon="info" />}
    />
  );
}

ForestTypeModal.propTypes = {
  compact: PropTypes.bool,
  data: PropTypes.arrayOf().isRequired,
  setIsForestTypeModalOpen: PropTypes.func,
};

ForestTypeModal.defaultProps = {
  compact: false,
  setIsForestTypeModalOpen: () => null,
};

export default ForestTypeModal;
