import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import useIsMobile from '../../../hooks/useIsMobile';

const HeaderCell = ({ ...props }) => {
  const { children } = props;
  const isMobile = useIsMobile();
  return (
    <Table.HeaderCell
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      verticalAlign="top"
      style={{ maxWidth: !isMobile ? '12vw' : undefined }}
    >
      {children}
    </Table.HeaderCell>
  );
};

HeaderCell.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

export default HeaderCell;
