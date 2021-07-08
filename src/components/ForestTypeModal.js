import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import { info } from '@geops/tree-lib';

import Button from './Button';
import ForestTypeDescription from './ForestTypeDescription';
import ProfileSwitcher from './ProfileSwitcher';

function ForestTypeModal({ code, setIsForestTypeModalOpen }) {
  const activeProfile = useSelector((state) => state.activeProfile);
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
      trigger={<Button active compact icon="info" />}
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
