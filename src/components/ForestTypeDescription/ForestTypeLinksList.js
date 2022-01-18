import React from 'react';
import PropTypes from 'prop-types';
import styles from './ForestTypeDescription.module.css';

function ForestTypeLinksList({ forestTypes, onClick }) {
  if (!forestTypes || forestTypes.length === 0) {
    return '-';
  }

  return forestTypes.map(({ code, de }) => (
    <span key={code}>
      <button
        className={styles.link}
        type="button"
        onClick={(evt) => onClick(evt, code)}
      >
        {code} - {de}
      </button>
      <br />
    </span>
  ));
}

ForestTypeLinksList.propTypes = {
  forestTypes: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string,
      de: PropTypes.string,
    }),
  ),
  onClick: PropTypes.func,
};

ForestTypeLinksList.defaultProps = {
  forestTypes: undefined,
  onClick: () => {},
};

export default ForestTypeLinksList;
