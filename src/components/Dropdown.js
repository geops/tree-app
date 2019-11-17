/* eslint-disable jsx-a11y/label-has-for,jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown as SUIDropdown, Form } from 'semantic-ui-react';

import styles from './Dropdown.module.css';

function Dropdown({ className, label, ...props }) {
  const { t } = useTranslation();
  return (
    <Form.Field>
      {label && <label>{label}</label>}
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
    </Form.Field>
  );
}

Dropdown.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
};

Dropdown.defaultProps = {
  className: '',
  label: null,
};

Dropdown.Divider = SUIDropdown.Divider;
Dropdown.Header = SUIDropdown.Header;
Dropdown.Item = SUIDropdown.Item;
Dropdown.Menu = SUIDropdown.Menu;

export default Dropdown;
