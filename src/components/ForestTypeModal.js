import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Divider, Modal, Ref } from 'semantic-ui-react';
import { info } from '@geops/tree-lib';

import Button from './Button';
import ForestTypeComparison from './ForestTypeComparison';
import ForestTypeDescription from './ForestTypeDescription';
import ProfileSwitcher from './ProfileSwitcher';
import {
  setForestTypeInfo,
  setForestTypeCompare,
  setComparisonIsOpen,
} from '../store/actions';

const renderHeader = (ftRef, comparisonIsOpen, t, i18n) => {
  if (comparisonIsOpen) {
    return t('forestTypeModal.compare');
  }
  return ftRef.current ? (
    <>
      {ftRef.current.code} - {ftRef.current[i18n.language]}{' '}
      {ftRef.current.la ? <i>{ftRef.current.la}</i> : null}
    </>
  ) : (
    t('forestTypeModal.noDataHeader')
  );
};

function ForestTypeModal({ setIsForestTypeModalOpen }) {
  const dispatch = useDispatch();
  const modalRef = useRef();
  const ftRef = useRef();
  const comparisonIsOpen = useSelector((state) => state.comparisonIsOpen);
  const forestTypeInfo = useSelector((state) => state.forestTypeInfo);
  const forestTypeCompare = useSelector((state) => state.forestTypeCompare);
  const activeProfile = useSelector((state) => state.activeProfile);
  const { i18n, t } = useTranslation();

  const forestTypeOptions = useMemo(() => {
    const forestTypes = info('forestType', null, activeProfile);
    const currentForestType = forestTypes.find(
      (ft) => ft.code === forestTypeInfo?.code,
    );
    if (currentForestType) {
      ftRef.current = currentForestType;
    } else {
      ftRef.current = null;
    }
    return forestTypes.map((ft) => ({
      text: `${ft.code} - ${ft[i18n.language]}`,
      value: ft.code,
    }));
  }, [activeProfile, forestTypeInfo, i18n.language]);

  useEffect(() => {
    const forestTypes = info('forestType', null, activeProfile);
    if (!forestTypes.find((ft) => ft.code === forestTypeInfo?.code)) {
      ftRef.current = null;
    }

    if (modalRef?.current) {
      modalRef.current.scroll({ top: 0, left: 0, behavior: 'smooth' });
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
            {ftRef.current && !comparisonIsOpen && (
              <>
                <Button
                  compact
                  active
                  onClick={() =>
                    dispatch(setComparisonIsOpen(!comparisonIsOpen))
                  }
                >
                  {t('forestTypeModal.compare')}
                </Button>
                <Divider hidden />
              </>
            )}
            {comparisonIsOpen > 0 && (
              <ForestTypeComparison
                info={ftRef.current}
                compare={forestTypeCompare}
                options={forestTypeOptions}
              />
            )}
            {ftRef.current && !comparisonIsOpen && (
              <ForestTypeDescription info={ftRef.current} />
            )}
            {!ftRef.current && !comparisonIsOpen && (
              <>{t('forestTypeModal.noDataMessage')}</>
            )}
          </Modal.Content>
        }
        header={
          <Modal.Header>
            {renderHeader(ftRef, comparisonIsOpen, t, i18n)}
          </Modal.Header>
        }
        onClose={(e) => {
          setIsForestTypeModalOpen(false);
          dispatch(setComparisonIsOpen(false));
          dispatch(setForestTypeInfo(null));
          dispatch(setForestTypeCompare([]));
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
