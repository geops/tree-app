import PropTypes from 'prop-types';
import React from 'react';
import { Button as SUIButton } from 'semantic-ui-react';

import styles from './Button.module.css';

function Button({ active, ...props }) {
  return <SUIButton {...props} active={active} className={styles.button} />;
}

Button.propTypes = {
  active: PropTypes.bool,
};

Button.defaultProps = {
  active: false,
};

Button.Group = SUIButton.Group;

export default Button;
