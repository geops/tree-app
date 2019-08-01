import PropTypes from 'prop-types';
import React from 'react';
import { Dropdown as SUIDropdown } from 'semantic-ui-react';

import styles from './Dropdown.module.css';

function Dropdown({ className, ...props }) {
  return (
    <SUIDropdown {...props} className={`${className} ${styles.dropdown}`} />
  );
}

Dropdown.propTypes = {
  className: PropTypes.string,
};

Dropdown.defaultProps = {
  className: '',
};

export default Dropdown;
