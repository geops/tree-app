import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Ref } from 'semantic-ui-react';

import ForestTypeComparison from './ForestTypeComparison';
import ForestTypeDescription from './ForestTypeDescription';
import ProfileSwitcher from '../ProfileSwitcher';
import {
  setForestTypeModal,
  setForestTypeComparison,
  setForestTypeDescription,
} from '../../store/actions';

const modalModes = ['c', 'd'];

const style = { height: '72dvh', overflowY: 'scroll', overflowX: 'hidden' };

function ForestTypeModal() {
  const dispatch = useDispatch();
  const modalRef = useRef();
  const forestTypeModal = useSelector((state) => state.forestTypeModal);
  const activeProfile = useSelector((state) => state.activeProfile);
  const forestTypeDescription = useSelector(
    (state) => state.forestTypeDescription,
  );

  useEffect(
    () => modalRef.current && modalRef.current.scroll({ top: 0, left: 0 }),
    [forestTypeDescription, activeProfile],
  );

  return (
    <Ref innerRef={modalRef}>
      <Modal
        data-cypress="forestTypeModal"
        open={modalModes.includes(forestTypeModal)}
        actions={
          <Modal.Actions
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginBottom: 10,
            }}
            actions={[
              {
                key: 'profileSwitcher',
                as: ProfileSwitcher,
              },
              {
                key: 'done',
                content: 'Ok',
                style: {
                  marginBottom: 0,
                  marginTop: 18,
                },
              },
            ]}
          />
        }
        content={
          <Modal.Content style={style}>
            {forestTypeModal === 'c' ? (
              <ForestTypeComparison />
            ) : (
              <ForestTypeDescription />
            )}
          </Modal.Content>
        }
        header={
          <Modal.Header>
            {forestTypeModal === 'c' ? (
              <ForestTypeComparison.Header />
            ) : (
              <ForestTypeDescription.Header />
            )}
          </Modal.Header>
        }
        onClose={(e) => {
          dispatch(setForestTypeComparison());
          dispatch(setForestTypeDescription());
          dispatch(setForestTypeModal());
        }}
      />
    </Ref>
  );
}

export default ForestTypeModal;
