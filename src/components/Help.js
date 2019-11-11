import PropTypes from 'prop-types';
import React from 'react';
import { Modal } from 'semantic-ui-react';

import { ReactComponent as InfoIcon } from '../icons/info.svg';

import styles from './Help.module.css';

function Help({ children }) {
  return (
    <Modal
      trigger={<InfoIcon fill="white" className={styles.icon} />}
      content={
        <Modal.Content className={styles.text}>{children}</Modal.Content>
      }
      actions={[{ key: 'done', content: 'Ok' }]}
    />
  );
}

Help.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Help;
