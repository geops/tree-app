import React from 'react';
import { Button as SUIButton } from 'semantic-ui-react';

import styles from './Button.module.css';

function Button(props) {
  return <SUIButton {...props} className={styles.button} />;
}

Button.Group = SUIButton.Group;

export default Button;
