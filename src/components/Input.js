/* eslint-disable jsx-a11y/label-has-for,jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import React from 'react';
import { Input as SUIInput, Form } from 'semantic-ui-react';

import styles from './Input.module.css';

function Input({ label, onChange, type, ...props }) {
  return (
    <Form.Field className={styles.field}>
      {label && <label>{label}</label>}
      <SUIInput
        onChange={(event, data) => {
          if (type === 'number') {
            const value = parseInt(data.value, 10) || null;
            onChange(event, { ...data, value });
          } else {
            onChange(event, data);
          }
        }}
        type={type}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </Form.Field>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
};

Input.defaultProps = {
  label: null,
  onChange: () => null,
  type: 'text',
};

export default Input;
