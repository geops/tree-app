import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import parse from 'html-react-parser';
import { Table } from 'semantic-ui-react';
import Tillering from './Tillering';
import Legend from '../Legend';

const parseHtml = (string) => parse(string.slice().replace(/\\n/g, '<br>'));

function GeneralTab({ data }) {
  const { t } = useTranslation();

  return (
    <Table basic padded structured>
      <Table.Body>
        <Table.Row>
          <Table.HeaderCell>{t('lu.forestType.appearance')}</Table.HeaderCell>
          <Table.Cell colSpan="3">
            <p>{parseHtml(data.description)}</p>
            <p>{parseHtml(data.vegetation)}</p>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>
            {t('forestTypeDiagram.vegetation')}
          </Table.HeaderCell>
          <Table.Cell colSpan="3">
            <p>{parseHtml(data.vegetation)}</p>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>{t('lu.forestType.aptitude')}</Table.HeaderCell>
          <Table.Cell colSpan="3">
            <p>{parseHtml(data.aptitude)}</p>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>{t('lu.forestType.rejuvDev')}</Table.HeaderCell>
          <Table.Cell colSpan="3">
            <p>{parseHtml(data.forestryRejuvDev)}</p>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>{t('lu.forestType.care')}</Table.HeaderCell>
          <Table.Cell colSpan="3">
            <p>{parseHtml(data.forestryCare)}</p>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>
            {t('forestTypeDiagram.altitude.label')}
          </Table.HeaderCell>
          <Table.Cell colSpan="3">
            <p>{parseHtml(data.heightDispersion)}</p>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>
            {t('forestTypeDiagram.tillering')}
          </Table.HeaderCell>
          <Table.Cell colSpan="3">
            <Legend rare={false} title={false} />
            <Tillering />
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}

GeneralTab.propTypes = {
  data: PropTypes.shape({
    description: PropTypes.string,
    vegetation: PropTypes.string,
    aptitude: PropTypes.string,
    forestryRejuvDev: PropTypes.string,
    forestryCare: PropTypes.string,
    heightDispersion: PropTypes.string,
  }).isRequired,
};

export default GeneralTab;
