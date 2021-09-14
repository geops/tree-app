import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Table } from 'semantic-ui-react';

const infoPropTypes = {
  info: PropTypes.shape().isRequired,
};

function HeaderRowCell({ info }) {
  return <Table.HeaderCell>{info.code}</Table.HeaderCell>;
}
HeaderRowCell.propTypes = infoPropTypes;

function TilleringHardwoodCell({ info }) {
  return <Table.Cell>{info.tilleringHardwood.join('-')}%</Table.Cell>;
}
TilleringHardwoodCell.propTypes = infoPropTypes;

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
          <TilleringHardwoodCell info={info} />
          {compare.map((ft) => (
            <TilleringHardwoodCell key={ft.code} info={ft} />
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
