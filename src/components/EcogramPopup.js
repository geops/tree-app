import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { List, Popup } from 'semantic-ui-react';
// eslint-disable-next-line import/no-unresolved
import { info } from 'lib/src';

import Button from './Button';
import ForestTypeModal from './ForestTypeModal';
import styles from './EcogramPopup.module.css';

function EcogramPopup({ target, forestTypes, onClose, selectForestType }) {
  const container = useRef();
  const [isForestTypeModalOpen, setIsForestTypeModalOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const handleClickOutside = (e) => {
    if (
      container.current &&
      container.current.contains(e.target) === false &&
      isForestTypeModalOpen === false
    ) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  return (
    <Popup
      className={styles.popup}
      context={target}
      flowing
      position="top center"
      open={forestTypes.length > 0}
    >
      <div ref={container}>
        <List>
          {forestTypes.map((f) => (
            <List.Item style={{ display: 'flex' }}>
              <ForestTypeModal
                code={f}
                setIsForestTypeModalOpen={setIsForestTypeModalOpen}
              />
              <Button active onClick={() => selectForestType(f)}>
                {f} - {info('forestType', f)[i18n.language]}
              </Button>
            </List.Item>
          ))}
          <List.Item>
            <Button onClick={() => onClose()}>{t('forestType.cancel')}</Button>
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
};

export default EcogramPopup;
