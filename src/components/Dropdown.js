import React from 'react';
import { Dropdown as SUIDropdown } from 'semantic-ui-react';

import styles from './Dropdown.module.css';

function Dropdown(props) {
  return <SUIDropdown {...props} className={styles.dropdown} />;
}

export default Dropdown;
