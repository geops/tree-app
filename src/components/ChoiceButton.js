/* eslint-disable jsx-a11y/label-has-for,jsx-a11y/label-has-associated-control,react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react';

function ChoiceButton({ onChange, options, value, label, ...props }) {
  return (
    <Form.Field>
      <label>{label}</label>
      <Button.Group basic {...props}>
        {options.map(option => (
          <Button
            key={option.key}
            active={value === option.key}
            onClick={e => onChange(e, { value: option.key })}
          >
            {option.label}
          </Button>
        ))}
      </Button.Group>
    </Form.Field>
  );
}

ChoiceButton.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.exact({ key: PropTypes.string, label: PropTypes.string }),
  ).isRequired,
  value: PropTypes.string,
};

ChoiceButton.defaultProps = {
  onChange: () => {},
  value: '',
};

export default ChoiceButton;
