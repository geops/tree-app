import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Table } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import parse from 'html-react-parser';
import useIsMobile from '../../../hooks/useIsMobile';

import { forestTypeMapping } from '../../ForestTypeDescription/lu/utils';
import {
  setForestTypeDescription,
  setForestTypeModal,
} from '../../../store/actions';

import comparisonStyles from '../ForestTypeComparison.module.css';
import descriptionStyles from '../../ForestTypeDescription/ForestTypeDescription.module.css';

const parseString = (str, isMobile) =>
  parse(str.slice().replace(/\\n/g, '<br>'));

const getStringWithUnit = (data, unit) => {
  if (Array.isArray(data)) {
    return data.every((val) => val !== null && val !== undefined)
      ? `${data.join('-')}${unit}`
      : '-';
  }
  return data ? parseString(`${data}${unit || ''}`) : '-';
};

const getValueIsSame = (arr1, arr2) =>
  getStringWithUnit(arr1) === getStringWithUnit(arr2) &&
  getStringWithUnit(arr1) !== '-';

const getHasSameValues = (currentInfo, infoArray, field) =>
  infoArray.some(
    (ft) =>
      currentInfo.code !== ft.code &&
      getValueIsSame(currentInfo[field], ft[field]),
  );

const Cell = ({ data, hasSameValues, unit, isMobile }) => (
  <Table.Cell
    className={hasSameValues ? comparisonStyles.comparisonIsSame : undefined}
  >
    {getStringWithUnit(data, unit, isMobile)}
  </Table.Cell>
);

Cell.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  hasSameValues: PropTypes.bool,
  unit: PropTypes.string,
  isMobile: PropTypes.bool,
};

Cell.defaultProps = {
  hasSameValues: false,
  unit: null,
  isMobile: false,
};

function ForestTypeTab({ data }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isMobile = useIsMobile();

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
              unit="%"
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
                      unit="%"
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
              unit="%"
            />
          ))}
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>
            {t('lu.forestType.pioneerTreeTypes')}
          </Table.HeaderCell>
          {data.map((ft) => (
            <Cell
              key={ft.code}
              hasSameValues={false}
              data={ft.pioneerTreeTypes}
            />
          ))}
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>
            {t('lu.forestType.priority.label')}
          </Table.HeaderCell>
          {data.map((ft) => (
            <Cell
              key={ft.code}
              hasSameValues={getHasSameValues(ft, data, 'priority')}
              data={
                ft.priority ? t(`lu.forestType.priority.${ft.priority}`) : null
              }
            />
          ))}
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>{t('lu.forestType.aptitude')}</Table.HeaderCell>
          {data.map((ft, idx, arr) => (
            <>
              <Cell
                key={ft.code}
                hasSameValues={false}
                data={ft.aptitude ? ft.aptitude : null}
              />
              {isMobile && idx + 1 !== arr.length && <br />}
            </>
          ))}
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>{t('lu.forestType.rejuvDev')}</Table.HeaderCell>
          <>
            {data.map((ft, idx, arr) => (
              <>
                <Cell
                  key={ft.code}
                  hasSameValues={false}
                  data={ft.forestryRejuvDev ? ft.forestryRejuvDev : null}
                />
                {isMobile && idx + 1 !== arr.length && <br />}
              </>
            ))}
          </>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}

ForestTypeTab.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default ForestTypeTab;
