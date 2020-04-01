/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
import { Checkbox as SUICheckbox, Form } from 'semantic-ui-react';

// import styles from './Checkbox.module.css';

function Checkbox({ className, ...props }) {
  return (
    <Form.Field>
      <SUICheckbox {...props} className={`${className}`} />
    </Form.Field>
  );
}

Checkbox.propTypes = {
  className: PropTypes.string,
};

Checkbox.defaultProps = {
  className: '',
};

export default Checkbox;
