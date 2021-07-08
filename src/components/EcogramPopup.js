import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { List, Popup } from 'semantic-ui-react';
// eslint-disable-next-line import/no-unresolved
import { info } from '@geops/tree-lib';

import Button from './Button';
import styles from './EcogramPopup.module.css';
import useIsMobile from '../hooks/useIsMobile';
import { setForestTypeInfo } from '../store/actions';

function EcogramPopup({ target, forestTypes, onClose, selectForestType, x }) {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const container = useRef();

  const activeProfile = useSelector((state) => state.activeProfile);
  const { t, i18n } = useTranslation();

  const handleClickOutside = (e) => {
    if (
      container.current &&
      container.current.contains(e.target) === false
      // isForestTypeModalOpen === false
    ) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  let position = 'top center';
  if (x < 200) {
    position = 'top right';
  } else if (x > 800) {
    position = 'top left';
  }

  return (
    <Popup
      className={styles.popup}
      context={target}
      flowing={isMobile === false}
      position={position}
      open={forestTypes.length > 0}
    >
      <div ref={container}>
        <List>
          {forestTypes.map((ftCode) => {
            const ftInfo = info('forestType', ftCode, activeProfile, true);
            console.log(ftInfo);
            return (
              <List.Item style={{ display: 'flex' }}>
                <Button
                  active
                  compact
                  icon="info"
                  onClick={() => dispatch(setForestTypeInfo(ftInfo))}
                />
                <Button active compact onClick={() => selectForestType(ftCode)}>
                  {ftCode} - {ftInfo[i18n.language]}
                </Button>
              </List.Item>
            );
          })}
          <List.Item>
            <Button compact onClick={() => onClose()}>
              {t('forestType.cancel')}
            </Button>
          </List.Item>
        </List>
      </div>
    </Popup>
  );
}

EcogramPopup.propTypes = {
  forestTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClose: PropTypes.func.isRequired,
  target: PropTypes.node.isRequired,
  selectForestType: PropTypes.func.isRequired,
  x: PropTypes.number.isRequired,
};

export default EcogramPopup;
