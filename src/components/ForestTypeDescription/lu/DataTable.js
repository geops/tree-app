import PropTypes from 'prop-types';
import React from 'react';
import { Table } from 'semantic-ui-react';

import SoilIcon from '../../../icons/SoilIcon';

function DataTable({ data, getLabel }) {
  return (
    <div style={{ width: '100%', maxWidth: 400 }}>
      <Table basic columns={2} compact padded>
        <Table.Body>
          {data.reduce(
            (rows, row, index) =>
              row
                ? [
                    ...rows,
                    <Table.Row key={getLabel(index)}>
                      <Table.Cell>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                          }}
                        >
                          <span style={{ width: '90%', maxWidth: 300 }}>
                            {getLabel(index)}
                          </span>
                          <SoilIcon value={row} />
                        </div>
                      </Table.Cell>
                    </Table.Row>,
                  ]
                : rows,
            [],
          )}
        </Table.Body>
      </Table>
    </div>
  );
}

DataTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  getLabel: PropTypes.func.isRequired,
};

export default DataTable;
