import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Table } from 'semantic-ui-react';
import { utils } from '@geops/tree-lib';
import DataTable from '../DataTable';
import Site from './Site';
import Tillering from './Tillering';
import TilleringSingle from './TilleringSingle';
import Relief from '../Relief';
import { parseString } from '../../../../utils/comparisonUtils';

const { getMapping } = utils();
function GeneralTab({ data }) {
  const { t } = useTranslation();
  const vegetationMapping = useMemo(() => getMapping('vegetation', 'lu'), []);
  const soilMapping = useMemo(() => getMapping('soil', 'lu'), []);

  return (
    <Table basic padded structured>
      <Table.Body>
        <Table.Row>
          <Table.HeaderCell>
            {t('lu.forestType.tilleringHardwood')}
          </Table.HeaderCell>
          <Table.Cell colSpan="3">
            <TilleringSingle data={data.tilleringHardwood} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>{t('lu.forestType.tillering')}</Table.HeaderCell>
          <Table.Cell colSpan="3">
            <Tillering data={data.tillering} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>
            {`${t('lu.forestType.tilleringFirwood')} min (opt)`}
          </Table.HeaderCell>
          <Table.Cell colSpan="3">
            <p>
              {data.tilleringFirwood.every((val) => !val)
                ? '-'
                : `${data.tilleringFirwood[0]}${
                    data.tilleringFirwood[1]
                      ? ` (${data.tilleringFirwood[1]})`
                      : ''
                  }`}
            </p>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>
            {t('lu.forestType.pioneerTreeTypes')}
          </Table.HeaderCell>
          <Table.Cell colSpan="3">
            <p>
              {data.pioneerTreeTypes.map(
                (ptt, idx, arr) =>
                  `${ptt}${idx + 1 !== arr.length ? ', ' : ''}`,
              )}
            </p>
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
            <p>{parseString(data.aptitude)}</p>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>{t('forestType.care')}</Table.HeaderCell>
          <Table.Cell colSpan="3">
            <p>{parseString(data.forestryRejuvDev)}</p>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>{t('forestType.care')}</Table.HeaderCell>
          <Table.Cell colSpan="3">
            <p>{parseString(data.forestryCare)}</p>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>{t('lu.forestType.description')}</Table.HeaderCell>
          <Table.Cell colSpan="3">
            <p>{parseString(data.description)}</p>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>
            {t('lu.forestType.heightDispersion')}
          </Table.HeaderCell>
          <Table.Cell colSpan="3">
            <p>{parseString(data.heightDispersion)}</p>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>{t('forestType.terrain')}</Table.HeaderCell>
          <Table.Cell colSpan="3">
            <Relief code={data.code} trimCode />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>
            {`${t('forestTypeDiagram.slope')} & ${t(
              'forestTypeDiagram.aspect.label',
            )}`}
          </Table.HeaderCell>
          <Table.Cell colSpan="3">
            <div style={{ padding: '10px 0' }}>
              <Site data={data.expoAndAspect} />
            </div>
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
        <Table.Row>
          <Table.HeaderCell>
            {t('forestType.vegetationIndicator')}
          </Table.HeaderCell>
          <Table.Cell colSpan="3">
            <DataTable
              data={data.vegetationIndicator}
              getLabel={(i) =>
                `${vegetationMapping[i]?.toUpperCase()}: ${t(
                  `lu.forestType.vegetationIndicators.${vegetationMapping[i]}`,
                )}`
              }
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>{t('lu.forestType.soil.label')}</Table.HeaderCell>
          <Table.Cell colSpan="3">
            <DataTable
              data={data.soil}
              getLabel={(i) =>
                `${soilMapping[i]?.toUpperCase()}: ${t(
                  `lu.forestType.soil.typeMapping.${soilMapping[i]}`,
                )}`
              }
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
    compactRisk: PropTypes.string,
    description: PropTypes.string,
    vegetation: PropTypes.string,
    aptitude: PropTypes.string,
    expoAndAspect: PropTypes.arrayOf(PropTypes.number),
    forestryRejuvDev: PropTypes.string,
    forestryCare: PropTypes.string,
    heightDispersion: PropTypes.string,
    pioneerTreeTypes: PropTypes.arrayOf(PropTypes.string),
    priority: PropTypes.string,
    soil: PropTypes.arrayOf(PropTypes.number),
    tillering: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    ),
    tilleringFirwood: PropTypes.arrayOf(PropTypes.string),
    tilleringHardwood: PropTypes.arrayOf(PropTypes.number),
    vegetationIndicator: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
};

export default GeneralTab;
