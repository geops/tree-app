/* eslint-disable jsx-a11y/label-has-for,jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown as SUIDropdown, Form } from 'semantic-ui-react';

import useIsMobile from '../hooks/useIsMobile';

import styles from './Dropdown.module.css';

function Dropdown({ className, children, label, multiple, value, ...props }) {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  return (
    <Form.Field className={styles.field}>
      {label && <label>{label}</label>}
      <SUIDropdown
        fluid
        noResultsMessage={t('dropdown.noResultsMessage')}
        placeholder={t('dropdown.placeholder')}
        search={isMobile === false}
        selection
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        className={`${className} ${styles.dropdown}`}
        multiple={multiple}
        value={multiple ? value || [] : value || ''}
      >
        {children}
      </SUIDropdown>
    </Form.Field>
  );
}

Dropdown.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  label: PropTypes.string,
  multiple: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

Dropdown.defaultProps = {
  className: '',
  children: null,
  label: null,
  multiple: false,
  value: undefined,
};

Dropdown.Divider = SUIDropdown.Divider;
Dropdown.Header = SUIDropdown.Header;
Dropdown.Item = SUIDropdown.Item;
Dropdown.Menu = SUIDropdown.Menu;

export default Dropdown;
