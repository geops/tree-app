import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Divider, Modal, Ref } from 'semantic-ui-react';
import { info } from '@geops/tree-lib';

import Button from './Button';
import ForestTypeComparison from './ForestTypeComparison';
import ForestTypeDescription from './ForestTypeDescription';
import ProfileSwitcher from './ProfileSwitcher';
import { setForestTypeInfo, setForestTypeCompare } from '../store/actions';

function ForestTypeModal({ setIsForestTypeModalOpen }) {
  const dispatch = useDispatch();
  const modalRef = useRef();
  const ftRef = useRef();
  const [comparisonIsOpen, setComparisonIsOpen] = useState(false);
  const forestTypeInfo = useSelector((state) => state.forestTypeInfo);
  const forestTypeCompare = useSelector((state) => state.forestTypeCompare);
  const activeProfile = useSelector((state) => state.activeProfile);
  const { i18n, t } = useTranslation();

  const forestTypeOptions = useMemo(
    () =>
      info('forestType', null, activeProfile)
        .map((ft) => {
          if (ft.code === forestTypeInfo?.code) {
            ftRef.current = ft;
          }
          return {
            text: `${ft.code} - ${ft[i18n.language]}`,
            value: ft.code,
          };
        })
        .filter((option) => option.value !== forestTypeInfo?.code),
    [activeProfile, forestTypeInfo, i18n.language],
  );

  useEffect(() => {
    if (modalRef?.current) {
      modalRef.current.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [forestTypeInfo, activeProfile]);

  console.log(forestTypeInfo);

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
            <Button
              compact
              active
              onClick={() => setComparisonIsOpen(!comparisonIsOpen)}
            >
              {comparisonIsOpen
                ? `${t('forestTypeModal.forestTypeDescription')} ${
                    ftRef.current.code
                  }`
                : t('forestTypeModal.compare')}
            </Button>
            <Divider hidden />
            {ftRef.current && comparisonIsOpen > 0 && (
              <ForestTypeComparison
                info={ftRef.current}
                compare={forestTypeCompare}
                options={forestTypeOptions}
              />
            )}
            {ftRef.current && !comparisonIsOpen && (
              <ForestTypeDescription info={ftRef.current} />
            )}
            {!ftRef.current && <>{t('forestTypeModal.noDataMessage')}</>}
          </Modal.Content>
        }
        header={
          <Modal.Header>
            {ftRef.current ? (
              <>
                {ftRef.current.code} - {ftRef.current[i18n.language]}{' '}
                {ftRef.current.la ? <i>{ftRef.current.la}</i> : null}
              </>
            ) : (
              t('forestTypeModal.noDataHeader')
            )}
          </Modal.Header>
        }
        onClose={(e) => {
          setIsForestTypeModalOpen(false);
          setComparisonIsOpen(false);
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
