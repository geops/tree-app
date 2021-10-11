import PropTypes from 'prop-types';
import React from 'react';
import { Table } from 'semantic-ui-react';

import diagramStyles from '../Diagram.module.css';

const soilStyleMapping = {
  1: diagramStyles.rareBackground,
  2: diagramStyles.mediumBackground,
  3: diagramStyles.oftenBackground,
};

function DataTable({ data, getLabel }) {
  return (
    <Table basic columns={2} compact>
      <Table.Body>
        {data
          .map((value, index) => ({
            label: getLabel(index),
            value: soilStyleMapping[value],
          }))
          .filter((row) => row.value)
          .map((row, index) => (
            <Table.Row key={getLabel(index)}>
              <Table.Cell>{row.label}</Table.Cell>
              <Table.Cell className={row.value} />
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
}

DataTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  getLabel: PropTypes.func.isRequired,
};

export default DataTable;
