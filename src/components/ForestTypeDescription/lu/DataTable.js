import PropTypes from 'prop-types';
import React from 'react';
import { Table } from 'semantic-ui-react';

const Icon = ({ value }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={16}
      width={16}
      viewBox="0 0 16 16"
    >
      {value === 1 && (
        <>
          <line y1={0} y2={16} x1={8} x2={8} stroke="black" strokeWidth={2} />
          <line y1={8} y2={8} x1={0} x2={16} stroke="black" strokeWidth={2} />
        </>
      )}
      {value === 2 && (
        <rect
          height={16}
          width={16}
          stroke="black"
          strokeWidth={2}
          fill="none"
        />
      )}
      {value === 3 && (
        <rect height={16} width={16} stroke="black" strokeWidth={2} />
      )}
    </svg>
  </div>
);

Icon.propTypes = {
  value: PropTypes.number.isRequired,
};

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
                          <Icon value={row} />
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
