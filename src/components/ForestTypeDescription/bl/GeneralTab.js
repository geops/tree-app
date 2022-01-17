import PropTypes from 'prop-types';
import React from 'react';
import { Table } from 'semantic-ui-react';
import { parseString } from '../../../utils/comparisonUtils';

function GeneralTab({ data }) {
  return (
    <Table basic padded structured>
      <Table.Body>
        <Table.Row>
          <Table.HeaderCell>Geologie</Table.HeaderCell>
          <Table.Cell colSpan="3">{data.geology || '-'}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Standortbeschreibung</Table.HeaderCell>
          <Table.Cell colSpan="3">{data.location || '-'}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Bestockung</Table.HeaderCell>
          <Table.Cell colSpan="3">{data.tillering || '-'}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Eigenschaften</Table.HeaderCell>
          <Table.Cell colSpan="3">{data.properties || '-'}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Verjüngung und Entwicklung</Table.HeaderCell>
          <Table.Cell colSpan="3">
            <p>{parseString(data.forestryRejuvDev) || '-'}</p>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Pflege</Table.HeaderCell>
          <Table.Cell colSpan="3">
            <p>{parseString(data.forestryCare) || '-'}</p>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Beschreibung Naturwald</Table.HeaderCell>
          <Table.Cell colSpan="3">
            <p>{parseString(data.descriptionNaturalForest) || '-'}</p>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Höhenverbreitung</Table.HeaderCell>
          <Table.Cell colSpan="3">
            <p>{parseString(data.heightDispersion) || '-'}</p>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Übergänge zu</Table.HeaderCell>
          <Table.Cell colSpan="3">
            <p>{parseString(data.transitions) || '-'}</p>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Vegetation</Table.HeaderCell>
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
