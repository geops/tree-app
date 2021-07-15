import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Ref } from 'semantic-ui-react';
import { info } from '@geops/tree-lib';

import ForestTypeDescription from './ForestTypeDescription';
import ProfileSwitcher from './ProfileSwitcher';
import { setForestTypeInfo } from '../store/actions';

function ForestTypeModal({ setIsForestTypeModalOpen }) {
  const dispatch = useDispatch();
  const modalRef = useRef();
  const forestTypeInfo = useSelector((state) => state.forestTypeInfo);
  const activeProfile = useSelector((state) => state.activeProfile);
  const { i18n, t } = useTranslation();

  const data = useMemo(() => {
    if (forestTypeInfo) {
      let result;
      try {
        result = info('forestType', forestTypeInfo.code, activeProfile);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        result = undefined;
      }
      return result;
    }
    return null;
  }, [activeProfile, forestTypeInfo]);

  useEffect(() => {
    if (modalRef?.current) {
      modalRef.current.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [forestTypeInfo, activeProfile]);

  return (
    <Ref innerRef={modalRef}>
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
        onClose={(e) => {
          setIsForestTypeModalOpen(false);
          dispatch(setForestTypeInfo(null));
        }}
        onOpen={(e) => setIsForestTypeModalOpen(true)}
      />
    </Ref>
  );
}

ForestTypeModal.propTypes = {
  setIsForestTypeModalOpen: PropTypes.func,
};

ForestTypeModal.defaultProps = {
  setIsForestTypeModalOpen: () => null,
};

export default ForestTypeModal;
