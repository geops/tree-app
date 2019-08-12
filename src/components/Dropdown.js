import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown as SUIDropdown } from 'semantic-ui-react';

import styles from './Dropdown.module.css';

function Dropdown({ className, ...props }) {
  const { t } = useTranslation();
  return (
    <SUIDropdown
      fluid
      search
      selection
      noResultsMessage={t('dropdown.noResultsMessage')}
      placeholder={t('dropdown.placeholder')}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      className={`${className} ${styles.dropdown}`}
    />
  );
}

Dropdown.propTypes = {
  className: PropTypes.string,
};

Dropdown.defaultProps = {
  className: '',
};

Dropdown.Divider = SUIDropdown.Divider;
Dropdown.Header = SUIDropdown.Header;
Dropdown.Item = SUIDropdown.Item;
Dropdown.Menu = SUIDropdown.Menu;

export default Dropdown;
