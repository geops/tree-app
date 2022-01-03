import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Table } from 'semantic-ui-react';
import { parseString } from '../../../utils/comparisonUtils';

function GeneralTab({ data }) {
  const { t } = useTranslation();

  return (
    <Table basic padded structured>
      <Table.Body>
        <Table.Row>
          <Table.HeaderCell>{t('bl.forestType.geology')}</Table.HeaderCell>
          <Table.Cell colSpan="3">{data.geology || '-'}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>{t('bl.forestType.locationDesc')}</Table.HeaderCell>
          <Table.Cell colSpan="3">{data.location || '-'}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>{t('bl.forestType.tillering')}</Table.HeaderCell>
          <Table.Cell colSpan="3">{data.tillering || '-'}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>{t('bl.forestType.properties')}</Table.HeaderCell>
          <Table.Cell colSpan="3">{data.properties || '-'}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>{t('bl.forestType.rejuvDev')}</Table.HeaderCell>
          <Table.Cell colSpan="3">
            <p>{parseString(data.forestryRejuvDev) || '-'}</p>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>{t('bl.forestType.care')}</Table.HeaderCell>
          <Table.Cell colSpan="3">
            <p>{parseString(data.forestryCare) || '-'}</p>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>
            {t('bl.forestType.descriptionNaturalForest')}
          </Table.HeaderCell>
          <Table.Cell colSpan="3">
            <p>{parseString(data.descriptionNaturalForest) || '-'}</p>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>
            {t('bl.forestType.heightDispersion')}
          </Table.HeaderCell>
          <Table.Cell colSpan="3">
            <p>{parseString(data.heightDispersion) || '-'}</p>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>{t('bl.forestType.transitions')}</Table.HeaderCell>
          <Table.Cell colSpan="3">
            <p>{parseString(data.transitions) || '-'}</p>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>
            {t('forestTypeDiagram.vegetation')}
          </Table.HeaderCell>
          <Table.Cell colSpan="3">
            <p>{parseString(data.vegetation)}</p>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}

GeneralTab.propTypes = {
  data: PropTypes.shape({
    code: PropTypes.string.isRequired,
    geology: PropTypes.string,
    location: PropTypes.string,
    descriptionNaturalForest: PropTypes.string,
    vegetation: PropTypes.string,
    aptitude: PropTypes.string,
    expoAndAspect: PropTypes.arrayOf(PropTypes.number),
    forestryRejuvDev: PropTypes.string,
    forestryCare: PropTypes.string,
    heightDispersion: PropTypes.string,
    pioneerTreeTypes: PropTypes.arrayOf(PropTypes.string),
    properties: PropTypes.string,
    soil: PropTypes.arrayOf(PropTypes.number),
    tillering: PropTypes.string,
    transitions: PropTypes.string,
    tilleringFirwood: PropTypes.arrayOf(PropTypes.string),
    tilleringHardwood: PropTypes.arrayOf(PropTypes.number),
    vegetationIndicator: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
};

export default GeneralTab;
