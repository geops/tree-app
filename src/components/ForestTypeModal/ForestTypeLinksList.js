import React from 'react';
import PropTypes from 'prop-types';

import ForestTypeLink from './ForestTypeLink';

function ForestTypeLinksList({ forestTypes, onClick }) {
  if (!forestTypes || !forestTypes.length) {
    return '-';
  }

  return forestTypes.map(({ code, de }) => (
    <div key={code}>
      <ForestTypeLink onClick={onClick} code={code}>
        {code} - {de}
      </ForestTypeLink>
    </div>
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
