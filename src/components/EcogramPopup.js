import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { List, Popup } from 'semantic-ui-react';
// eslint-disable-next-line import/no-unresolved
import { info } from 'lib/src';

import Button from './Button';

function EcogramPopup({ target, forestTypes, onClose, selectForestType }) {
  const { t, i18n } = useTranslation();

  if (forestTypes.length === 1) {
    selectForestType(forestTypes[0]);
  }

  return (
    <Popup context={target} position="top center" open={forestTypes.length > 1}>
      <List>
        {forestTypes.map((f) => (
          <List.Item>
            <Button active onClick={() => selectForestType(f)}>
              {f} - {info('forestType', f)[i18n.language]}
            </Button>
          </List.Item>
        ))}
        <List.Item>
          <Button onClick={() => onClose()}>{t('forestType.cancel')}</Button>
        </List.Item>
      </List>
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
