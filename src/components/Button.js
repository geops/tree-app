import PropTypes from 'prop-types';
import React from 'react';
import { Button as SUIButton } from 'semantic-ui-react';

import styles from './Button.module.css';

function Button({ className, ...props }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <SUIButton {...props} className={`${styles.button} ${className}`} />;
}

Button.propTypes = {
  className: PropTypes.string,
};

Button.defaultProps = {
  className: '',
};

Button.Group = SUIButton.Group;

export default Button;
