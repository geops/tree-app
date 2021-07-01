import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Modal, Button as SUIButton } from 'semantic-ui-react';
import { info } from '@geops/tree-lib';

import Button from './Button';
import ForestTypeDescription from './ForestTypeDescription';
import ProfileSwitcher from './ProfileSwitcher';

function ForestTypeModal({ code, setIsForestTypeModalOpen }) {
  const activeProfile = useSelector((state) => state.activeProfile);
  const [modalOpen, setModalOpen] = useState(false);
  const { i18n, t } = useTranslation();
  const data = useMemo(() => {
    let result;
    try {
      result = info('forestType', code, activeProfile);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      result = undefined;
    }
    return result;
  }, [code, activeProfile]);

  return (
    <Modal
      open={modalOpen}
      actions={
        <Modal.Actions>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <span style={{ marginRight: 15 }}>
              <ProfileSwitcher />
            </span>
            <SUIButton onClick={() => setModalOpen(false)}>Ok</SUIButton>
          </div>
        </Modal.Actions>
      }
      content={
        <Modal.Content>
          {data ? (
            <ForestTypeDescription data={data} />
          ) : (
            <>{t('forestTypeModal.noDataMessage')}</>
          )}
        </Modal.Content>
      }
      header={
        <Modal.Header>
          {data ? (
            <>
              {data.code} - {data[i18n.language]}{' '}
              {data.la ? <i>{data.la}</i> : null}
            </>
          ) : (
            t('forestTypeModal.noDataHeader')
          )}
        </Modal.Header>
      }
      onClose={(e) => setIsForestTypeModalOpen(false)}
      onOpen={(e) => setIsForestTypeModalOpen(true)}
      trigger={
        <Button active compact icon="info" onClick={() => setModalOpen(true)} />
      }
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
