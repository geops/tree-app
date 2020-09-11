import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Table } from 'semantic-ui-react';

import AltitudinalZone from './AltitudinalZoneForestEcoregion';
import Legend from './Legend';
import Site from './Site';

function TerrainTab({ data }) {
  const { t } = useTranslation();

  return (
    <>
      <Legend />
      <AltitudinalZone data={data.altitudinalZoneForestEcoregion} />
      <Site altitude={data.altitude} aspect={data.aspect} slope={data.slope} />
      <Table basic padded structured unstackable>
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell rowSpan="2">
              {t('forestType.carbonate.label')}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {t('forestType.carbonate.fine')}
            </Table.HeaderCell>
            <Table.Cell colSpan="2">
              {t(`forestType.frequency.${data.carbonate[0]}`)}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>
              {t('forestType.carbonate.rock')}
            </Table.HeaderCell>
            <Table.Cell colSpan="2">
              {t(`forestType.frequency.${data.carbonate[1]}`)}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell rowSpan="5">
              {t('forestType.reliefType.label')}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {t('forestType.reliefType.centralSlope')}
            </Table.HeaderCell>
            <Table.Cell colSpan="2">
              {t(`forestType.frequency.${data.reliefType[0]}`)}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>
              {t('forestType.reliefType.hollow')}
            </Table.HeaderCell>
            <Table.Cell colSpan="2">
              {t(`forestType.frequency.${data.reliefType[1]}`)}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>
              {t('forestType.reliefType.dome')}
            </Table.HeaderCell>
            <Table.Cell colSpan="2">
              {t(`forestType.frequency.${data.reliefType[2]}`)}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>
              {t('forestType.reliefType.plateau')}
            </Table.HeaderCell>
            <Table.Cell colSpan="2">
              {t(`forestType.frequency.${data.reliefType[3]}`)}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>
              {t('forestType.reliefType.steep')}
            </Table.HeaderCell>
            <Table.Cell colSpan="2">
              {t(`forestType.frequency.${data.reliefType[4]}`)}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell rowSpan="4">
              {t('forestType.process.label')}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {t('forestType.process.rockfall')}
            </Table.HeaderCell>
            <Table.Cell colSpan="2">
              {t(`forestType.frequency.${data.process[0]}`)}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>
              {t('forestType.process.avalanche')}
            </Table.HeaderCell>
            <Table.Cell colSpan="2">
              {t(`forestType.frequency.${data.process[1]}`)}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>
              {t('forestType.process.landslide')}
            </Table.HeaderCell>
            <Table.Cell colSpan="2">
              {t(`forestType.frequency.${data.process[2]}`)}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>
              {t('forestType.process.erosion')}
            </Table.HeaderCell>
            <Table.Cell colSpan="2">
              {t(`forestType.frequency.${data.process[3]}`)}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell rowSpan="7">
              {t('forestType.geomorphology.label')}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {t('forestType.geomorphology.blockyRockyStrong')}
            </Table.HeaderCell>
            <Table.Cell colSpan="2">
              {t(`forestType.frequency.${data.geomorphology[1]}`)}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>
              {t('forestType.geomorphology.blockyRockyLittle')}
            </Table.HeaderCell>
            <Table.Cell colSpan="2">
              {t(`forestType.frequency.${data.geomorphology[2]}`)}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>
              {t('forestType.geomorphology.rocksStronglyMoved')}
            </Table.HeaderCell>
            <Table.Cell colSpan="2">
              {t(`forestType.frequency.${data.geomorphology[5]}`)}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>
              {t('forestType.geomorphology.rocksModeratelyMoved')}
            </Table.HeaderCell>
            <Table.Cell colSpan="2">
              {t(`forestType.frequency.${data.geomorphology[4]}`)}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>
              {t('forestType.geomorphology.rocksStabilised')}
            </Table.HeaderCell>
            <Table.Cell colSpan="2">
              {t(`forestType.frequency.${data.geomorphology[6]}`)}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>
              {t('forestType.geomorphology.limestonePavement')}
            </Table.HeaderCell>
            <Table.Cell colSpan="2">
              {t(`forestType.frequency.${data.geomorphology[3]}`)}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>
              {t('forestType.geomorphology.rockBand')}
            </Table.HeaderCell>
            <Table.Cell colSpan="2">
              {t(`forestType.frequency.${data.geomorphology[0]}`)}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell rowSpan="3">
              {t('forestType.water.label')}
            </Table.HeaderCell>
            <Table.HeaderCell>{t('forestType.water.stream')}</Table.HeaderCell>
            <Table.Cell colSpan="2">
              {t(`forestType.frequency.${data.water[0]}`)}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>{t('forestType.water.small')}</Table.HeaderCell>
            <Table.Cell colSpan="2">
              {t(`forestType.frequency.${data.water[1]}`)}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>{t('forestType.water.spring')}</Table.HeaderCell>
            <Table.Cell colSpan="2">
              {t(`forestType.frequency.${data.water[2]}`)}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>{t('forestType.water.change')}</Table.HeaderCell>
            <Table.Cell colSpan="2">
              {t(`forestType.frequency.${data.water[3]}`)}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  );
}

TerrainTab.propTypes = {
  data: PropTypes.arrayOf().isRequired,
};

export default TerrainTab;
