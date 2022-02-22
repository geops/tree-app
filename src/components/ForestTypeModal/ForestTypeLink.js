import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  setForestTypeDescription,
  setForestTypeModal,
} from '../../store/actions';

import descriptionStyles from './ForestTypeDescription/ForestTypeDescription.module.css';

const ForestTypeLink = ({ code, children, onClick }) => {
  const dispatch = useDispatch();
  return (
    <button
      key={code}
      className={descriptionStyles.link}
      type="button"
      onClick={(evt) => {
        dispatch(setForestTypeModal('d'));
        dispatch(setForestTypeDescription(code));
        onClick(evt, code);
      }}
    >
      {children || code}
    </button>
  );
};

ForestTypeLink.propTypes = {
  code: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.number,
  ]),
  onClick: PropTypes.func,
};

ForestTypeLink.defaultProps = {
  children: null,
  onClick: () => {},
};

export default ForestTypeLink;
