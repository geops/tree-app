import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Table } from 'semantic-ui-react';

import AltitudinalZone from './AltitudinalZoneForestEcoregion';
import Legend from '../Legend';
import Site from './Site';
import useIsMobile from '../../../hooks/useIsMobile';

function TerrainTab({ data }) {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const [c0, c1] = data.carbonate;
  const [r0, r1, r2, r3, r4] = data.reliefType;
  const [p0, p1, p2, p3] = data.process;
  const [g0, g1, g2, g3, g4, g5, g6] = data.geomorphology;
  const [w0, w1, w2, w3] = data.water;

  return (
    <>
      <Legend />
      <AltitudinalZone data={data.altitudinalZoneForestEcoregion} />
      <Site altitude={data.altitude} aspect={data.aspect} slope={data.slope} />
      <Table basic padded={isMobile === false} structured unstackable>
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell rowSpan="2">
              {t('forestType.carbonate.label')}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {t('forestType.carbonate.fine')}
            </Table.HeaderCell>
            <Table.Cell colSpan="2">
              {c0 !== null ? t(`forestType.frequency.${c0}`) : '-'}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>
              {t('forestType.carbonate.rock')}
            </Table.HeaderCell>
            <Table.Cell colSpan="2">
              {c1 !== null ? t(`forestType.frequency.${c1}`) : '-'}
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
              {r0 !== null ? t(`forestType.frequency.${r0}`) : '-'}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>
              {t('forestType.reliefType.hollow')}
            </Table.HeaderCell>
            <Table.Cell colSpan="2">
              {r1 !== null ? t(`forestType.frequency.${r1}`) : '-'}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>
              {t('forestType.reliefType.dome')}
            </Table.HeaderCell>
            <Table.Cell colSpan="2">
              {r2 !== null ? t(`forestType.frequency.${r2}`) : '-'}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>
              {t('forestType.reliefType.plateau')}
            </Table.HeaderCell>
            <Table.Cell colSpan="2">
              {r3 !== null ? t(`forestType.frequency.${r3}`) : '-'}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>
              {t('forestType.reliefType.steep')}
            </Table.HeaderCell>
            <Table.Cell colSpan="2">
              {r4 !== null ? t(`forestType.frequency.${r4}`) : '-'}
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
              {p0 !== null ? t(`forestType.frequency.${p0}`) : '-'}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>
              {t('forestType.process.avalanche')}
            </Table.HeaderCell>
            <Table.Cell colSpan="2">
              {p1 !== null ? t(`forestType.frequency.${p1}`) : '-'}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>
              {t('forestType.process.landslide')}
            </Table.HeaderCell>
            <Table.Cell colSpan="2">
              {p2 !== null ? t(`forestType.frequency.${p2}`) : '-'}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>
              {t('forestType.process.erosion')}
            </Table.HeaderCell>
            <Table.Cell colSpan="2">
              {p3 !== null ? t(`forestType.frequency.${p3}`) : '-'}
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
              {g1 !== null ? t(`forestType.frequency.${g1}`) : '-'}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>
              {t('forestType.geomorphology.blockyRockyLittle')}
            </Table.HeaderCell>
            <Table.Cell colSpan="2">
              {g2 !== null ? t(`forestType.frequency.${g2}`) : '-'}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>
              {t('forestType.geomorphology.rocksStronglyMoved')}
            </Table.HeaderCell>
            <Table.Cell colSpan="2">
              {g5 !== null ? t(`forestType.frequency.${g5}`) : '-'}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>
              {t('forestType.geomorphology.rocksModeratelyMoved')}
            </Table.HeaderCell>
            <Table.Cell colSpan="2">
              {g4 !== null ? t(`forestType.frequency.${g4}`) : '-'}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>
              {t('forestType.geomorphology.rocksStabilised')}
            </Table.HeaderCell>
            <Table.Cell colSpan="2">
              {g6 !== null ? t(`forestType.frequency.${g6}`) : '-'}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>
              {t('forestType.geomorphology.limestonePavement')}
            </Table.HeaderCell>
            <Table.Cell colSpan="2">
              {g3 !== null ? t(`forestType.frequency.${g3}`) : '-'}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>
              {t('forestType.geomorphology.rockBand')}
            </Table.HeaderCell>
            <Table.Cell colSpan="2">
              {g0 !== null ? t(`forestType.frequency.${g0}`) : '-'}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell rowSpan="3">
              {t('forestType.water.label')}
            </Table.HeaderCell>
            <Table.HeaderCell>{t('forestType.water.stream')}</Table.HeaderCell>
            <Table.Cell colSpan="2">
              {w0 !== null ? t(`forestType.frequency.${w0}`) : '-'}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>{t('forestType.water.small')}</Table.HeaderCell>
            <Table.Cell colSpan="2">
              {w1 !== null ? t(`forestType.frequency.${w1}`) : '-'}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>{t('forestType.water.spring')}</Table.HeaderCell>
            <Table.Cell colSpan="2">
              {w2 !== null ? t(`forestType.frequency.${w2}`) : '-'}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>{t('forestType.water.change')}</Table.HeaderCell>
            <Table.Cell colSpan="2">
              {w3 !== null ? t(`forestType.frequency.${w3}`) : '-'}
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
