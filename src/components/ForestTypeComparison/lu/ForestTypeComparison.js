import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Table } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { info as getInfo } from '@geops/tree-lib';

import { forestTypeMapping } from '../../ForestTypeDescription/utils';
import { setForestTypeInfo, setComparisonIsOpen } from '../../../store/actions';

import comparisonStyles from '../ForestTypeComparison.module.css';
import descriptionStyles from '../../ForestTypeDescription/ForestTypeDescription.module.css';

const infoPropTypes = {
  info: PropTypes.shape().isRequired,
};

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

function HeaderRowCell({ info }) {
  const dispatch = useDispatch();
  const activeProfile = useSelector((state) => state.activeProfile);

  return (
    <Table.HeaderCell>
      <span key={info.code}>
        <button
          className={descriptionStyles.link}
          type="button"
          onClick={() => {
            dispatch(setComparisonIsOpen(false));
            const forestType = getInfo('forestType', info.code, activeProfile);
            dispatch(setForestTypeInfo(forestType));
          }}
        >
          {info.code}
        </button>
        <br />
      </span>
    </Table.HeaderCell>
  );
}
HeaderRowCell.propTypes = infoPropTypes;

function TilleringCell({ hasSameValues, treePercentage }) {
  return (
    <Table.Cell
      className={hasSameValues ? comparisonStyles.comparisonIsSame : undefined}
    >
      {getPrecentageString(treePercentage)}
    </Table.Cell>
  );
}
TilleringCell.propTypes = {
  treePercentage: PropTypes.arrayOf(PropTypes.number).isRequired,
  hasSameValues: PropTypes.bool.isRequired,
};

function TilleringHardwoodCell({ hasSameValues, info }) {
  return (
    <Table.Cell
      className={hasSameValues ? comparisonStyles.comparisonIsSame : undefined}
    >
      {getPrecentageString(info.tilleringHardwood)}
    </Table.Cell>
  );
}
TilleringHardwoodCell.propTypes = {
  ...infoPropTypes,
  hasSameValues: PropTypes.bool.isRequired,
};

function TilleringFirwoodCell({ hasSameValues, info }) {
  return (
    <Table.Cell
      className={hasSameValues ? comparisonStyles.comparisonIsSame : undefined}
    >
      {getPrecentageString(info.tilleringFirwood)}
    </Table.Cell>
  );
}
TilleringFirwoodCell.propTypes = {
  ...infoPropTypes,
  hasSameValues: PropTypes.bool.isRequired,
};

function ForestTypeComparison({ info, compare }) {
  const { t } = useTranslation();

  return (
    <Table basic padded structured>
      <Table.Body>
        <Table.Row>
          <Table.HeaderCell>{t('lu.forestType.general')}</Table.HeaderCell>
          {compare.map((ft) => (
            <HeaderRowCell key={ft.code} info={ft} />
          ))}
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>
            {t('lu.forestType.tilleringHardwood')}
          </Table.HeaderCell>
          {compare.map((ft) => (
            <TilleringHardwoodCell
              key={ft.code}
              hasSameValues={getHasSameValues(
                ft,
                info ? [info, ...compare] : compare,
                'tilleringHardwood',
              )}
              info={ft}
            />
          ))}
        </Table.Row>
        {forestTypeMapping
          .map((treeType, idx) => {
            const cells = compare.map((ft) => ({
              code: ft.code,
              value: ft.tillering[0][idx],
            }));
            if (
              cells.every(
                (cell) =>
                  cell.value[0] === (undefined || null) &&
                  cell.value[1] === (undefined || null),
              )
            ) {
              return null;
            }
            return (
              <Table.Row key={treeType}>
                <Table.HeaderCell>{treeType}</Table.HeaderCell>
                {cells.map((cell) => (
                  <TilleringCell
                    key={`${treeType} - ${cell.code}`}
                    treePercentage={cell.value}
                    hasSameValues={getHasSameValues(cell, cells, 'value')}
                  />
                ))}
              </Table.Row>
            );
          })
          .filter((row) => !!row)}
        <Table.Row>
          <Table.HeaderCell>
            {t('lu.forestType.tilleringFirwood')}
          </Table.HeaderCell>
          {compare.map((ft) => (
            <TilleringFirwoodCell
              key={ft.code}
              hasSameValues={getHasSameValues(
                ft,
                info ? [info, ...compare] : compare,
                'tilleringFirwood',
              )}
              info={ft}
            />
          ))}
        </Table.Row>
      </Table.Body>
    </Table>
  );
}

ForestTypeComparison.propTypes = {
  compare: PropTypes.arrayOf(infoPropTypes.info).isRequired,
  ...infoPropTypes,
};

export default ForestTypeComparison;
