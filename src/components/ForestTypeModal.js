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
      actions={[{ key: 'done', content: 'Ok' }]}
      content={
        <Modal.Content>
          <ForestTypeDescription data={data} />
        </Modal.Content>
      }
      header={
        <Modal.Header>
          {data.code} - {data[i18n.language]} (<i>{data.la}</i>)
        </Modal.Header>
      }
      onClose={(e) => {
        e.stopPropagation();
        setIsForestTypeModalOpen(false);
      }}
      onOpen={(e) => {
        e.stopPropagation();
        setIsForestTypeModalOpen(true);
      }}
      trigger={<Button active icon="info" />}
    />
  );
}

ForestTypeModal.propTypes = {
  data: PropTypes.shape({
    code: PropTypes.string,
    la: PropTypes.string,
  }).isRequired,
  setIsForestTypeModalOpen: PropTypes.func,
};

ForestTypeModal.defaultProps = {
  setIsForestTypeModalOpen: () => null,
};

export default ForestTypeModal;
