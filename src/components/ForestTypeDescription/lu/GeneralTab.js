import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import parse from 'html-react-parser';
import { Table } from 'semantic-ui-react';
import Legend from '../Legend';
import Site from './Site';
import Tillering from './Tillering';
import TilleringSingle from './TilleringSingle';

const replaceLineBreaks = (str) => parse(str.slice().replace(/\\n/g, '<br>'));

function GeneralTab({ data }) {
  const { t } = useTranslation();

  return (
    <Table basic padded structured>
      <Table.Body>
        <Table.Row>
          <Table.HeaderCell>
            {t('forestTypeDiagram.legend.label')}
          </Table.HeaderCell>
          <Table.Cell colSpan="3">
            <Legend rare={false} title={false} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>
            {t('forestTypeDiagram.tilleringHardwood')}
          </Table.HeaderCell>
          <Table.Cell colSpan="3">
            <TilleringSingle data={data.tilleringHardwood} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>
            {t('forestTypeDiagram.tillering')}
          </Table.HeaderCell>
          <Table.Cell colSpan="3">
            <Tillering data={data.tillering} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>
            {t('forestTypeDiagram.tilleringFirwood')}
          </Table.HeaderCell>
          <Table.Cell colSpan="3">
            <TilleringSingle data={data.tilleringFirwood} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>
            {t('lu.forestType.pioneerTreeTypes')}
          </Table.HeaderCell>
          <Table.Cell colSpan="3">
            <p>{data.pioneerTreeTypes}</p>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>
            {t('lu.forestType.compactRisk.label')}
          </Table.HeaderCell>
          <Table.Cell colSpan="3">
            <p>{t(`lu.forestType.compactRisk.${data.compactRisk}`)}</p>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>
            {t('lu.forestType.priority.label')}
          </Table.HeaderCell>
          <Table.Cell colSpan="3">
            <p>
              {data.priority
                ? t(`lu.forestType.priority.${data.priority}`)
                : '-'}
            </p>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>{t('lu.forestType.aptitude')}</Table.HeaderCell>
          <Table.Cell colSpan="3">
            <p>{replaceLineBreaks(data.aptitude)}</p>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>{t('lu.forestType.rejuvDev')}</Table.HeaderCell>
          <Table.Cell colSpan="3">
            <p>{replaceLineBreaks(data.forestryRejuvDev)}</p>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>{t('lu.forestType.care')}</Table.HeaderCell>
          <Table.Cell colSpan="3">
            <p>{replaceLineBreaks(data.forestryCare)}</p>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>{t('lu.forestType.description')}</Table.HeaderCell>
          <Table.Cell colSpan="3">
            <p>{replaceLineBreaks(data.description)}</p>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>
            {t('lu.forestType.heightDispersion')}
          </Table.HeaderCell>
          <Table.Cell colSpan="3">
            <p>{replaceLineBreaks(data.heightDispersion)}</p>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>
            {`${t('forestTypeDiagram.slope')} & ${t(
              'forestTypeDiagram.aspect.label',
            )}`}
          </Table.HeaderCell>
          <Table.Cell colSpan="3">
            <Site data={data.expoAndAspect} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>
            {t('forestTypeDiagram.vegetation')}
          </Table.HeaderCell>
          <Table.Cell colSpan="3">
            <p>{replaceLineBreaks(data.vegetation)}</p>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}

GeneralTab.propTypes = {
  data: PropTypes.shape({
    compactRisk: PropTypes.string,
    description: PropTypes.string,
    vegetation: PropTypes.string,
    aptitude: PropTypes.string,
    expoAndAspect: PropTypes.arrayOf(PropTypes.number),
    forestryRejuvDev: PropTypes.string,
    forestryCare: PropTypes.string,
    heightDispersion: PropTypes.string,
    pioneerTreeTypes: PropTypes.string,
    priority: PropTypes.string,
    tillering: PropTypes.arrayOf(PropTypes.number),
    tilleringFirwood: PropTypes.arrayOf(PropTypes.number),
    tilleringHardwood: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
};

export default GeneralTab;
