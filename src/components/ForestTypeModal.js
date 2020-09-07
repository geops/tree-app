import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Table } from 'semantic-ui-react';
// eslint-disable-next-line import/no-unresolved
import { info, list, vegetation } from 'lib/src';

import Button from './Button';
import ForestTypeDiagram from './ForestTypeDiagram';

function ForestTypeModal({ data, setIsForestTypeModalOpen }) {
  const { i18n, t } = useTranslation();
  const location = { forestType: data.code };
  const treeList = list(location);
  const vegInfo = vegetation(location);

  const getInfo = (type) => (typeCode) => {
    const typeInfo = info(type, typeCode);
    return `${typeInfo[i18n.language]} (${typeInfo.la})`;
  };

  return (
    <Modal
      open
      actions={[{ key: 'done', content: 'Ok' }]}
      content={
        <Modal.Content>
          <ForestTypeDiagram data={data} />
          <Table basic padded structured unstackable>
            <Table.Body>
              <Table.Row>
                <Table.HeaderCell>
                  {t('forestType.naturalForest')}
                </Table.HeaderCell>
                <Table.Cell colSpan="3">
                  {data.naturalForest[i18n.language]}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>
                  {t('forestType.treeLayerHeight')}
                </Table.HeaderCell>
                <Table.Cell>
                  {data.height[2]}m - {data.height[3]}m
                </Table.Cell>
                <Table.Cell>
                  <strong>{t('forestType.coniferTreeHeightMax')}</strong>{' '}
                  {data.height[0]}m
                </Table.Cell>
                <Table.Cell>
                  <strong>{t('forestType.deciduousTreeHeightMax')}</strong>{' '}
                  {data.height[1]}m
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>{t('forestType.location')}</Table.HeaderCell>
                <Table.Cell colSpan="3">
                  {data.location[i18n.language]}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>
                  {t('forestType.vegetation')}
                </Table.HeaderCell>
                <Table.Cell colSpan="3">
                  {data.vegetation[i18n.language]}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>
                  {t('projection.treeTypesOne')}
                </Table.HeaderCell>
                <Table.Cell colSpan="3">
                  {treeList[0].map(getInfo('treeType')).join(', ') || '-'}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>
                  {t('projection.treeTypesTwo')}
                </Table.HeaderCell>
                <Table.Cell colSpan="3">
                  {treeList[1].map(getInfo('treeType')).join(', ') || '-'}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>
                  {t('projection.treeTypesThree')}
                </Table.HeaderCell>
                <Table.Cell colSpan="3">
                  {treeList[2].map(getInfo('treeType')).join(', ') || '-'}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>
                  {t('forestType.bush')} {t('forestType.often')}
                </Table.HeaderCell>
                <Table.Cell colSpan="3">
                  {vegInfo.bush[0].map(getInfo('bushType')).join(', ') || '-'}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>
                  {t('forestType.bush')} {t('forestType.rare')}
                </Table.HeaderCell>
                <Table.Cell colSpan="3">
                  {vegInfo.bush[1].map(getInfo('bushType')).join(', ') || '-'}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>
                  {t('forestType.herb')} {t('forestType.often')}
                </Table.HeaderCell>
                <Table.Cell colSpan="3">
                  {vegInfo.herb[0].map(getInfo('herbType')).join(', ') || '-'}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>
                  {t('forestType.herb')} {t('forestType.rare')}
                </Table.HeaderCell>
                <Table.Cell colSpan="3">
                  {vegInfo.herb[1].map(getInfo('herbType')).join(', ') || '-'}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>
                  {t('forestType.moss')} {t('forestType.often')}
                </Table.HeaderCell>
                <Table.Cell colSpan="3">
                  {vegInfo.moss[0].map(getInfo('mossType')).join(', ') || '-'}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>
                  {t('forestType.moss')} {t('forestType.rare')}
                </Table.HeaderCell>
                <Table.Cell colSpan="3">
                  {vegInfo.moss[1].map(getInfo('mossType')).join(', ') || '-'}
                </Table.Cell>
              </Table.Row>
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
                <Table.HeaderCell>
                  {t('forestType.water.stream')}
                </Table.HeaderCell>
                <Table.Cell colSpan="2">
                  {t(`forestType.frequency.${data.water[0]}`)}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>
                  {t('forestType.water.small')}
                </Table.HeaderCell>
                <Table.Cell colSpan="2">
                  {t(`forestType.frequency.${data.water[1]}`)}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>
                  {t('forestType.water.spring')}
                </Table.HeaderCell>
                <Table.Cell colSpan="2">
                  {t(`forestType.frequency.${data.water[2]}`)}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell>
                  {t('forestType.water.change')}
                </Table.HeaderCell>
                <Table.Cell colSpan="2">
                  {t(`forestType.frequency.${data.water[3]}`)}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Modal.Content>
      }
      header={`${data.code} - ${data[i18n.language]} (${data.la})`}
      onClose={() => setIsForestTypeModalOpen(false)}
      onOpen={() => setIsForestTypeModalOpen(true)}
      trigger={<Button active icon="info" />}
    />
  );
}

ForestTypeModal.propTypes = {
  data: PropTypes.arrayOf().isRequired,
  setIsForestTypeModalOpen: PropTypes.func.isRequired,
};

export default ForestTypeModal;
