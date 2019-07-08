/* eslint-disable jsx-a11y/label-has-for,jsx-a11y/label-has-associated-control */
import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react';

function ChoiceButton({ onChange, options, value, label }) {
  const { t } = useTranslation();
  return (
    <Form.Field>
      <label>{label}</label>
      <Button.Group basic>
        {options.map(s => (
          <Button
            key={s.key}
            active={value === s.key}
            onClick={e => onChange(e, { value: s.key })}
          >
            {s.label}
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
