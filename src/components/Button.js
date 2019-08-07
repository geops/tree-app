import PropTypes from 'prop-types';
import React from 'react';
import { Button as SUIButton } from 'semantic-ui-react';

import styles from './Button.module.css';

function Button({ className, ...props }) {
  return <SUIButton {...props} className={`${className} ${styles.button}`} />;
}

Button.propTypes = {
  className: PropTypes.string,
};

Button.defaultProps = {
  className: '',
};

Button.Group = SUIButton.Group;

export default Button;
