import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Table } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';

import { forestTypeMapping } from '../../ForestTypeDescription/lu/utils';
import {
  setForestTypeDescription,
  setForestTypeModal,
} from '../../../store/actions';

import comparisonStyles from '../ForestTypeComparison.module.css';
import descriptionStyles from '../../ForestTypeDescription/ForestTypeDescription.module.css';

const getPrecentageString = (arr) =>
  arr.every((val) => val !== null && val !== undefined)
    ? `${arr.join('-')}%`
    : '-';

const getValueIsSame = (arr1, arr2) =>
  getPrecentageString(arr1) === getPrecentageString(arr2);

const getHasSameValues = (currentInfo, infoArray, field) =>
  infoArray.some(
    (ft) =>
      currentInfo.code !== ft.code &&
      getValueIsSame(currentInfo[field], ft[field]),
  );

const Cell = ({ data, hasSameValues }) => (
  <Table.Cell
    className={hasSameValues ? comparisonStyles.comparisonIsSame : undefined}
  >
    {getPrecentageString(data)}
  </Table.Cell>
);

Cell.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  hasSameValues: PropTypes.bool.isRequired,
};

function ForestTypeTab({ data }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <Table basic padded structured>
      <Table.Body>
        <Table.Row>
          <Table.HeaderCell>{t('lu.forestType.general')}</Table.HeaderCell>
          {data.map((ft) => (
            <Table.HeaderCell key={ft.code}>
              <button
                className={descriptionStyles.link}
                type="button"
                onClick={() => {
                  dispatch(setForestTypeModal('d'));
                  dispatch(setForestTypeDescription(ft.code));
                }}
              >
                {ft.code}
              </button>
            </Table.HeaderCell>
          ))}
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>
            {t('lu.forestType.tilleringHardwood')}
          </Table.HeaderCell>
          {data.map((ft) => (
            <Cell
              key={ft.code}
              hasSameValues={getHasSameValues(ft, data, 'tilleringHardwood')}
              data={ft.tilleringHardwood}
            />
          ))}
        </Table.Row>
        {forestTypeMapping.reduce((rows, currTreeType, idx) => {
          const cells = data.map((ft) => ({
            code: ft.code,
            value: ft.tillering[0][idx],
          }));
          return cells.every(
            (cell) =>
              cell.value[0] === (undefined || null) &&
              cell.value[1] === (undefined || null),
          )
            ? rows
            : [
                ...rows,
                <Table.Row key={currTreeType}>
                  <Table.HeaderCell>{currTreeType}</Table.HeaderCell>
                  {cells.map((cell) => (
                    <Cell
                      key={`${currTreeType} - ${cell.code}`}
                      data={cell.value}
                      hasSameValues={getHasSameValues(cell, cells, 'value')}
                    />
                  ))}
                </Table.Row>,
              ];
        }, [])}
        <Table.Row>
          <Table.HeaderCell>
            {t('lu.forestType.tilleringFirwood')}
          </Table.HeaderCell>
          {data.map((ft) => (
            <Cell
              key={ft.code}
              hasSameValues={getHasSameValues(ft, data, 'tilleringFirwood')}
              data={ft.tilleringFirwood}
            />
          ))}
        </Table.Row>
      </Table.Body>
    </Table>
  );
}

ForestTypeTab.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default ForestTypeTab;
