import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  setForestTypeDescription,
  setForestTypeModal,
} from '../../store/actions';

import descriptionStyles from '../ForestTypeDescription/ForestTypeDescription.module.css';

const ForestTypeLink = ({ code }) => {
  const dispatch = useDispatch();
  return (
    <button
      className={descriptionStyles.link}
      type="button"
      onClick={() => {
        dispatch(setForestTypeModal('d'));
        dispatch(setForestTypeDescription(code));
      }}
    >
      {code}
    </button>
  );
};

ForestTypeLink.propTypes = {
  code: PropTypes.string.isRequired,
};

export default ForestTypeLink;
