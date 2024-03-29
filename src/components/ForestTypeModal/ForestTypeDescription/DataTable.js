import PropTypes from 'prop-types';
import React from 'react';
import { Table } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import SoilIcon from '../../../icons/SoilIcon';

function DataTable({ data, getLabel, getValue }) {
  const { t } = useTranslation();
  if (!data?.length) {
    return <strong>{t('forestTypeModal.noDataHeader')}</strong>;
  }
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
                          <SoilIcon value={getValue(row)} />
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
  data: PropTypes.arrayOf(PropTypes.number),
  getLabel: PropTypes.func.isRequired,
  getValue: PropTypes.func,
};

DataTable.defaultProps = {
  data: undefined,
  getValue: (value) => value,
};

export default DataTable;
