import PropTypes from 'prop-types';
import React from 'react';
import { Modal } from 'semantic-ui-react';

import { ReactComponent as InfoIcon } from '../icons/info.svg';

import styles from './HelpModal.module.css';

function HelpModal({ children, color, header }) {
  return (
    <Modal
      actions={[{ key: 'done', content: 'Ok' }]}
      content={
        <Modal.Content className={styles.text}>{children}</Modal.Content>
      }
      header={header || undefined}
      trigger={<InfoIcon fill={color} className={styles.icon} />}
    />
  );
}

HelpModal.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  header: PropTypes.string,
};

HelpModal.defaultProps = {
  color: 'white',
  header: '',
};

export default HelpModal;
