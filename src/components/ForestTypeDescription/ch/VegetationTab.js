import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Table } from 'semantic-ui-react';
// eslint-disable-next-line import/no-unresolved
import { info, list, vegetation } from '@geops/tree-lib';

const concat = (prev, cur) => [prev, ', ', cur];

function VegetationTab({ data }) {
  const { i18n, t } = useTranslation();
  const location = { forestType: data.code };
  const [t1, t2, t3] = list(location);
  const vegetationInfo = vegetation(location);
  const [b1, b2] = vegetationInfo.bush;
  const [h1, h2] = vegetationInfo.herb;
  const [m1, m2] = vegetationInfo.moss;

  const getInfo = (type) => (typeCode) => {
    const typeInfo = info(type, typeCode);
    return (
      <>
        {typeInfo[i18n.language]} (<i>{typeInfo.la}</i>)
      </>
    );
  };

  return (
    <Table basic padded structured>
      <Table.Body>
        <Table.Row>
          <Table.HeaderCell>{t('forestType.naturalForest')}</Table.HeaderCell>
          <Table.Cell colSpan="3">
            {data.naturalForest[i18n.language]}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>{t('forestType.treeLayerHeight')}</Table.HeaderCell>
          {data.height ? (
            <>
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
              </Table.Cell>{' '}
            </>
          ) : (
            <Table.Cell colSpan="3">-</Table.Cell>
          )}
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>{t('forestType.locationGeneral')}</Table.HeaderCell>
          <Table.Cell colSpan="3">{data.location[i18n.language]}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>{t('forestType.vegetation')}</Table.HeaderCell>
          <Table.Cell colSpan="3">{data.vegetation[i18n.language]}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>{t('projection.treeTypesOne')}</Table.HeaderCell>
          <Table.Cell colSpan="3">
            {t1.map(getInfo('treeType')).reduce(concat) || '-'}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>{t('projection.treeTypesTwo')}</Table.HeaderCell>
          <Table.Cell colSpan="3">
            {t2.map(getInfo('treeType')).reduce(concat) || '-'}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>{t('projection.treeTypesThree')}</Table.HeaderCell>
          <Table.Cell colSpan="3">
            {t3.map(getInfo('treeType')).reduce(concat) || '-'}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>
            {t('forestType.bush')} {t('forestType.often')}
          </Table.HeaderCell>
          <Table.Cell colSpan="3">
            {b1.length ? b1.map(getInfo('bushType')).reduce(concat) : '-'}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>
            {t('forestType.bush')} {t('forestType.rare')}
          </Table.HeaderCell>
          <Table.Cell colSpan="3">
            {b2.length ? b2.map(getInfo('bushType')).reduce(concat) : '-'}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>
            {t('forestType.herb')} {t('forestType.often')}
          </Table.HeaderCell>
          <Table.Cell colSpan="3">
            {h1.length ? h1.map(getInfo('herbType')).reduce(concat) : '-'}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>
            {t('forestType.herb')} {t('forestType.rare')}
          </Table.HeaderCell>
          <Table.Cell colSpan="3">
            {h2.length ? h2.map(getInfo('herbType')).reduce(concat) : '-'}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>
            {t('forestType.moss')} {t('forestType.often')}
          </Table.HeaderCell>
          <Table.Cell colSpan="3">
            {m1.length ? m1.map(getInfo('mossType')).reduce(concat) : '-'}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>
            {t('forestType.moss')} {t('forestType.rare')}
          </Table.HeaderCell>
          <Table.Cell colSpan="3">
            {m2.length ? m2.map(getInfo('mossType')).reduce(concat) : '-'}
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
