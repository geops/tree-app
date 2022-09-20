import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

const HeaderCell = ({ ...props }) => {
  const { children } = props;
  return (
    <Table.HeaderCell
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      verticalAlign="top"
      style={{ maxWidth: '12vw' }}
    >
      {children}
    </Table.HeaderCell>
  );
};

HeaderCell.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

export default HeaderCell;