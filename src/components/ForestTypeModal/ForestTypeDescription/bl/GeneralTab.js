import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Table } from 'semantic-ui-react';

import Site from './Site';
import ForestTypeLinksList from '../../ForestTypeLinksList';
import DataTable from '../DataTable';
import BorderlessRow from '../../BorderlessRow';
import Relief from '../Relief';
import {
  parseString,
  getValidForestTypes,
} from '../../../../utils/comparisonUtils';
import { setForestTypeDescription } from '../../../../store/actions';
import {
  vegetationMapping,
  getTilleringTreeTypes,
  soilIconTranslator,
} from './utils';

function GeneralTab({ data }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const transitions = getValidForestTypes(data.transitions, 'bl');
  return (
    <Table basic padded structured>
      <Table.Body>
        <Table.Row>
          <Table.HeaderCell>Laubholzanteil</Table.HeaderCell>
          <Table.Cell colSpan="3">
            {data.tilleringHardwood ? `${data.tilleringHardwood}%` : '-'}
          </Table.Cell>
        </Table.Row>
        <BorderlessRow>
          <Table.HeaderCell>Als Hauptbaumart geeignet</Table.HeaderCell>
          <Table.Cell colSpan="3">
            {getTilleringTreeTypes(data.tilleringTreeTypes, 'D') || '-'}
          </Table.Cell>
        </BorderlessRow>
        <BorderlessRow>
          <Table.HeaderCell>Als Nebenbaumart geeignet</Table.HeaderCell>
          <Table.Cell colSpan="3">
            {getTilleringTreeTypes(data.tilleringTreeTypes, 'N') || '-'}
          </Table.Cell>
        </BorderlessRow>
        <BorderlessRow>
          <Table.HeaderCell>Baumart mitpflegen</Table.HeaderCell>
          <Table.Cell colSpan="3">
            {getTilleringTreeTypes(data.tilleringTreeTypes, 'S') || '-'}
          </Table.Cell>
        </BorderlessRow>
        <BorderlessRow borderBottom>
          <Table.HeaderCell>
            Gastbaumart, als Hauptbaumart geeignet
          </Table.HeaderCell>
          <Table.Cell colSpan="3">
            {getTilleringTreeTypes(data.tilleringTreeTypes, 'G') || '-'}
          </Table.Cell>
        </BorderlessRow>
        <Table.Row>
          <Table.HeaderCell>Eigenschaften</Table.HeaderCell>
          <Table.Cell colSpan="3">{data.properties || '-'}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Bestockungsziele</Table.HeaderCell>
          <Table.Cell colSpan="3">{data.tillering || '-'}</Table.Cell>
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
          <Table.HeaderCell>
            {t('bl.forestType.descriptionNaturalForest')}
          </Table.HeaderCell>
          <Table.Cell colSpan="3">
            <p>{parseString(data.descriptionNaturalForest) || '-'}</p>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Übergänge zu</Table.HeaderCell>
          <Table.Cell colSpan="3">
            <ForestTypeLinksList
              forestTypes={transitions}
              onClick={(evt, code) => dispatch(setForestTypeDescription(code))}
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Höhenverbreitung</Table.HeaderCell>
          <Table.Cell colSpan="3">
            <p>{parseString(data.heightDispersion) || '-'}</p>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Standort</Table.HeaderCell>
          <Table.Cell colSpan="3">{data.location || '-'}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Geologie</Table.HeaderCell>
          <Table.Cell colSpan="3">{data.geology || '-'}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>{t('forestType.terrain')}</Table.HeaderCell>
          <Table.Cell colSpan="3">
            <Relief code={data.code} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Hangneigung & Exposition</Table.HeaderCell>
          <Table.Cell colSpan="3">
            <div style={{ padding: '10px 0' }}>
              <Site data={data.expoAndAspect} />
            </div>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Vegetation</Table.HeaderCell>
          <Table.Cell colSpan="3">
            <p>{parseString(data.vegetation || '-')}</p>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Zeigerartengruppen</Table.HeaderCell>
          <Table.Cell colSpan="3">
            <DataTable
              data={data.vegetationIndicator}
              getLabel={(i) =>
                `${vegetationMapping[i]?.toUpperCase()}: ${t(
                  `bl.forestType.vegetationIndicators.${vegetationMapping[i]}`,
                )}`
              }
              getValue={soilIconTranslator}
            />
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}

GeneralTab.propTypes = {
  data: PropTypes.shape({
    code: PropTypes.string.isRequired,
    de: PropTypes.string,
    geology: PropTypes.string,
    location: PropTypes.string,
    descriptionNaturalForest: PropTypes.string,
    aptitude: PropTypes.string,
    expoAndAspect: PropTypes.arrayOf(PropTypes.number),
    forestryRejuvDev: PropTypes.string,
    forestryCare: PropTypes.string,
    heightDispersion: PropTypes.string,
    properties: PropTypes.string,
    soil: PropTypes.arrayOf(PropTypes.number),
    tillering: PropTypes.string,
    transitions: PropTypes.arrayOf(PropTypes.string),
    vegetation: PropTypes.string,
    vegetationIndicator: PropTypes.arrayOf(PropTypes.number),
    tilleringTreeTypes: PropTypes.arrayOf(PropTypes.string),
    tilleringHardwood: PropTypes.string,
  }).isRequired,
};

export default GeneralTab;
