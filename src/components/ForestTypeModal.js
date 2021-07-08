import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'semantic-ui-react';
// import { info } from '@geops/tree-lib';

import ForestTypeDescription from './ForestTypeDescription';
import ProfileSwitcher from './ProfileSwitcher';
import { setForestTypeInfo } from '../store/actions';

function ForestTypeModal({ code, setIsForestTypeModalOpen }) {
  const dispatch = useDispatch();
  const forestTypeInfo = useSelector((state) => state.forestTypeInfo);
  const { i18n, t } = useTranslation();

  return (
    <Modal
      open={!!forestTypeInfo}
      actions={
        <Modal.Actions
          style={{ display: 'flex', justifyContent: 'flex-end' }}
          actions={[
            {
              key: 'profileSwitcher',
              as: ProfileSwitcher,
            },
            { key: 'done', content: 'Ok' },
          ]}
        />
      }
      content={
        <Modal.Content>
          <ForestTypeDescription />
        </Modal.Content>
      }
      header={
        <Modal.Header>
          {forestTypeInfo ? (
            <>
              {forestTypeInfo.code} - {forestTypeInfo[i18n.language]}{' '}
              {forestTypeInfo.la ? <i>{forestTypeInfo.la}</i> : null}
            </>
          ) : (
            t('forestTypeModal.noDataHeader')
          )}
        </Modal.Header>
      }
      onClose={(e) => {
        setIsForestTypeModalOpen(false);
        dispatch(setForestTypeInfo(null));
      }}
      onOpen={(e) => setIsForestTypeModalOpen(true)}
    />
  );
}

ForestTypeModal.propTypes = {
  code: PropTypes.string.isRequired,
  setIsForestTypeModalOpen: PropTypes.func,
};

ForestTypeModal.defaultProps = {
  setIsForestTypeModalOpen: () => null,
};

export default ForestTypeModal;
