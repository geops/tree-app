import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Table } from 'semantic-ui-react';

import styles from '../ForestTypeComparison.module.css';

const infoPropTypes = {
  info: PropTypes.shape().isRequired,
};

const getPrecentageData = (arr) =>
  arr.every((val) => !!val) ? `${arr.join('-')}%` : '-';
const getValueIsSame = (arr1, arr2) =>
  getPrecentageData(arr1) === getPrecentageData(arr2);
const getHasSameValues = (currentInfo, infoArray, field) =>
  infoArray.some(
    (ft) =>
      currentInfo.code !== ft.code &&
      getValueIsSame(currentInfo[field], ft[field]),
  );

function HeaderRowCell({ info }) {
  return <Table.HeaderCell>{info.code}</Table.HeaderCell>;
}
HeaderRowCell.propTypes = infoPropTypes;

function TilleringHardwoodCell({ hasSameValues, info }) {
  return (
    <Table.Cell className={hasSameValues && styles.comparisonIsSame}>
      {getPrecentageData(info.tilleringHardwood)}
    </Table.Cell>
  );
}
TilleringHardwoodCell.propTypes = {
  ...infoPropTypes,
  hasSameValues: PropTypes.bool.isRequired,
};

function TilleringFirwoodCell({ hasSameValues, info }) {
  return (
    <Table.Cell className={hasSameValues && styles.comparisonIsSame}>
      {getPrecentageData(info.tilleringFirwood)}
    </Table.Cell>
  );
}
TilleringFirwoodCell.propTypes = {
  ...infoPropTypes,
  hasSameValues: PropTypes.bool.isRequired,
};

function GeneralTab({ info, compare }) {
  const { t } = useTranslation();

  return (
    <Table basic padded structured>
      <Table.Body>
        <Table.Row>
          <Table.HeaderCell>{t('lu.forestType.general')}</Table.HeaderCell>
          <HeaderRowCell info={info} />
          {compare.map((ft) => (
            <HeaderRowCell key={ft.code} info={ft} />
          ))}
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>
            {t('lu.forestType.tilleringHardwood')}
          </Table.HeaderCell>
          <TilleringHardwoodCell
            info={info}
            hasSameValues={getHasSameValues(
              info,
              [info, ...compare],
              'tilleringHardwood',
            )}
          />
          {compare.map((ft) => (
            <TilleringHardwoodCell
              key={ft.code}
              hasSameValues={getHasSameValues(
                ft,
                [info, ...compare],
                'tilleringHardwood',
              )}
              info={ft}
            />
          ))}
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>
            {t('lu.forestType.tilleringFirwood')}
          </Table.HeaderCell>
          <TilleringFirwoodCell
            info={info}
            hasSameValues={getHasSameValues(info, compare, 'tilleringHardwood')}
          />
          {compare.map((ft) => (
            <TilleringFirwoodCell
              key={ft.code}
              hasSameValues={getHasSameValues(
                ft,
                [info, ...compare],
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

GeneralTab.propTypes = {
  compare: PropTypes.arrayOf(infoPropTypes.info).isRequired,
  ...infoPropTypes,
};

export default GeneralTab;
