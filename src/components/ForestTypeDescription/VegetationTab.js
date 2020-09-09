import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Table } from 'semantic-ui-react';
// eslint-disable-next-line import/no-unresolved
import { info, list, vegetation } from 'lib/src';

function VegetationTab({ data }) {
  const { i18n, t } = useTranslation();
  const location = { forestType: data.code };
  const treeList = list(location);
  const vegInfo = vegetation(location);

  const getInfo = (type) => (typeCode) => {
    const typeInfo = info(type, typeCode);
    return `${typeInfo[i18n.language]} (${typeInfo.la})`;
  };

  return (
    <Table basic padded structured unstackable>
      <Table.Body>
        <Table.Row>
          <Table.HeaderCell>{t('forestType.naturalForest')}</Table.HeaderCell>
          <Table.Cell colSpan="3">
            {data.naturalForest[i18n.language]}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>{t('forestType.treeLayerHeight')}</Table.HeaderCell>
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
          <Table.Cell colSpan="3">{data.location[i18n.language]}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>{t('forestType.vegetation')}</Table.HeaderCell>
          <Table.Cell colSpan="3">{data.vegetation[i18n.language]}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>{t('projection.treeTypesOne')}</Table.HeaderCell>
          <Table.Cell colSpan="3">
            {treeList[0].map(getInfo('treeType')).join(', ') || '-'}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>{t('projection.treeTypesTwo')}</Table.HeaderCell>
          <Table.Cell colSpan="3">
            {treeList[1].map(getInfo('treeType')).join(', ') || '-'}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>{t('projection.treeTypesThree')}</Table.HeaderCell>
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
      </Table.Body>
    </Table>
  );
}

VegetationTab.propTypes = {
  data: PropTypes.arrayOf().isRequired,
};

export default VegetationTab;
