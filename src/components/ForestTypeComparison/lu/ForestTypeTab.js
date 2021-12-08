import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Table } from 'semantic-ui-react';
import useIsMobile from '../../../hooks/useIsMobile';

import Relief from '../../ForestTypeDescription/lu/Relief';
import ComparisonCell from './ComparisonCell';
import ForestTypeLink from './ForestTypeLink';
import {
  treeTypeMapping,
  soilMapping,
} from '../../ForestTypeDescription/lu/utils';
import {
  getHasSameValues,
  getStringWithUnit,
} from '../../../utils/comparisonUtils';
import comparisonStyles from '../ForestTypeComparison.module.css';

const ComparedString = ({ data, hasDuplicate, isLast }) => (
  <>
    <span
      className={hasDuplicate ? comparisonStyles.comparisonIsSame : undefined}
    >
      {data}
    </span>
    {!isLast && ', '}
  </>
);

ComparedString.propTypes = {
  data: PropTypes.string.isRequired,
  hasDuplicate: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
};

const getPioneerTreeTypes = (info, allInfos) => {
  const allTreeTypes = allInfos.reduce((pioneerTypes, current) => {
    const currentPioneersTypes = current.pioneerTreeTypes;
    return currentPioneersTypes && currentPioneersTypes.length
      ? [...pioneerTypes, ...currentPioneersTypes]
      : pioneerTypes;
  }, []);
  return info.pioneerTreeTypes.map((treeType, idx, arr) => {
    const hasDuplicate =
      allTreeTypes.filter((ptt) => ptt === treeType).length > 1;
    return (
      <ComparedString
        isLast={idx + 1 === arr.length}
        data={treeType}
        hasDuplicate={hasDuplicate}
        key={treeType}
      />
    );
  });
};

const soulTypeReducer = (soilTypes, type, idx) =>
  type ? [...soilTypes, `${soilMapping[idx]?.toUpperCase()}`] : soilTypes;

const getSoilTypes = (info, otherInfos) => {
  const otherSoilTypes = otherInfos.reduce((soilTypes, dataInfo) => {
    const soils = dataInfo.soil.reduce(soulTypeReducer, []);
    return soils.length ? [...soilTypes, ...soils] : soilTypes;
  }, []);
  const currentSoilTypes = info.soil.reduce(soulTypeReducer, []);
  return currentSoilTypes.map((soilType, idx, arr) => {
    const hasDuplicate = otherSoilTypes.includes(soilType);
    return (
      <ComparedString
        isLast={idx + 1 === arr.length}
        data={soilType}
        hasDuplicate={hasDuplicate}
        key={soilType}
      />
    );
  });
};

function ForestTypeTab({ data }) {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const treeTypeCells = useMemo(
    () =>
      treeTypeMapping.reduce((treeTypes, currTreeType, idx) => {
        const cells = data.map((ft) => ({
          code: ft.code,
          natural: ft.tillering[0][idx],
          commercial: ft.tillering[1] && ft.tillering[1][idx],
        }));
        return cells.every(
          (cell) =>
            cell.natural[0] === (undefined || null) &&
            cell.natural[1] === (undefined || null),
        )
          ? treeTypes
          : [
              ...treeTypes,
              {
                treeType: currTreeType,
                cells: cells.map((cell) => (
                  <ComparisonCell
                    key={`${currTreeType} - ${cell.code}`}
                    code={cell.code}
                    hasSameValues={getHasSameValues(cell, cells, 'natural')}
                    className={comparisonStyles.treeTypeCell}
                  >
                    <div>{`${getStringWithUnit(cell.natural, '%')}`}</div>
                    {getStringWithUnit(cell.commercial, '%') !== '-' && (
                      <div>({getStringWithUnit(cell.commercial, '%')})</div>
                    )}
                  </ComparisonCell>
                )),
              },
            ];
      }, []),
    [data],
  );

  return (
    <Table basic padded structured>
      <Table.Body>
        {!isMobile && (
          <Table.Row>
            <Table.HeaderCell>{t('lu.forestType.general')}</Table.HeaderCell>
            {data.map((ft) => (
              <Table.HeaderCell key={ft.code}>
                <ForestTypeLink code={ft.code} />
              </Table.HeaderCell>
            ))}
          </Table.Row>
        )}
        <Table.Row>
          <Table.HeaderCell>
            {t('lu.forestType.tilleringFirwood')}
          </Table.HeaderCell>
          {data.map((ft) => (
            <ComparisonCell
              key={ft.code}
              code={ft.code}
              hasSameValues={getHasSameValues(ft, data, 'tilleringFirwood')}
              data={ft.tilleringFirwood}
              unit="%"
            />
          ))}
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>
            {t('lu.forestType.tilleringHardwood')}
          </Table.HeaderCell>
          {data.map((ft) => (
            <ComparisonCell
              key={ft.code}
              code={ft.code}
              hasSameValues={getHasSameValues(ft, data, 'tilleringHardwood')}
              data={ft.tilleringHardwood}
              unit="%"
            />
          ))}
        </Table.Row>
        {treeTypeCells.map((tt, idx, arr) => (
          <tr
            key={tt.treeType}
            className={
              idx + 1 !== arr.length ? comparisonStyles.treeTypeCell : undefined
            }
            ref={(el) => {
              // We need to use this hack for mobile view because react-semantic-ui sets a box shadow with !important
              if (el) {
                el.style.setProperty('box-shadow', 'none', 'important');
              }
            }}
          >
            <>
              <td className={comparisonStyles.treeTypeCell}>
                <div
                  className={
                    !isMobile ? comparisonStyles.treeTypeHeader : undefined
                  }
                >
                  <span>{idx === 0 && t('lu.forestType.tillering')}</span>
                  <div>{tt.treeType}</div>
                </div>
              </td>
              {tt.cells}
            </>
          </tr>
        ))}
        <Table.Row>
          <Table.HeaderCell>
            {t('lu.forestType.pioneerTreeTypes')}
          </Table.HeaderCell>
          {data.map((ft) => (
            <ComparisonCell key={ft.code} hasSameValues={false} code={ft.code}>
              {getPioneerTreeTypes(ft, data)}
            </ComparisonCell>
          ))}
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>
            {t('lu.forestType.priority.label')}
          </Table.HeaderCell>
          {data.map((ft) => (
            <ComparisonCell
              key={ft.code}
              code={ft.code}
              hasSameValues={getHasSameValues(ft, data, 'priority')}
              data={
                ft.priority ? t(`lu.forestType.priority.${ft.priority}`) : '-'
              }
            />
          ))}
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>{t('lu.forestType.aptitude')}</Table.HeaderCell>
          {data.map((ft, idx, arr) => (
            <ComparisonCell
              code={ft.code}
              key={ft.code}
              data={ft.aptitude ? ft.aptitude : null}
              footer={isMobile && idx + 1 !== arr.length && <br />}
            />
          ))}
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>{t('lu.forestType.rejuvDev')}</Table.HeaderCell>
          {data.map((ft, idx, arr) => (
            <ComparisonCell
              key={ft.code}
              code={ft.code}
              data={ft.forestryRejuvDev ? ft.forestryRejuvDev : null}
              footer={isMobile && idx + 1 !== arr.length && <br />}
            />
          ))}
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>{t('lu.forestType.care')}</Table.HeaderCell>
          {data.map((ft, idx, arr) => (
            <ComparisonCell
              key={ft.code}
              code={ft.code}
              data={ft.forestryCare ? ft.forestryCare : null}
              footer={isMobile && idx + 1 !== arr.length && <br />}
            />
          ))}
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>
            {t('lu.forestType.heightDispersion')}
          </Table.HeaderCell>
          {data.map((ft, idx, arr) => (
            <ComparisonCell
              key={ft.code}
              code={ft.code}
              hasSameValues={getHasSameValues(ft, data, 'heightDispersion')}
              data={ft.heightDispersion ? ft.heightDispersion : null}
            />
          ))}
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>{t('lu.forestType.terrain')}</Table.HeaderCell>
          {data.map((ft) => (
            <ComparisonCell code={ft.code} key={ft.code}>
              <Relief code={ft.code} />
            </ComparisonCell>
          ))}
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>
            {t('forestTypeDiagram.vegetation')}
          </Table.HeaderCell>
          <>
            {data.map((ft, idx, arr) => (
              <ComparisonCell
                key={ft.code}
                code={ft.code}
                data={ft.vegetation ? ft.vegetation : null}
                footer={isMobile && idx + 1 !== arr.length && <br />}
              />
            ))}
          </>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>{t('lu.forestType.soil.label')}</Table.HeaderCell>
          {data.map((ft) => (
            <ComparisonCell key={ft.code} code={ft.code}>
              {getSoilTypes(
                ft,
                data.filter((forestType) => forestType.code !== ft.code),
              )}
            </ComparisonCell>
          ))}
        </Table.Row>
      </Table.Body>
    </Table>
  );
}

ForestTypeTab.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default ForestTypeTab;
