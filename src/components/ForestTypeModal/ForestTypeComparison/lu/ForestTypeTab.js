import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Table } from 'semantic-ui-react';
import useIsMobile from '../../../../hooks/useIsMobile';

import Relief from '../../ForestTypeDescription/Relief';
import ComparisonCell from '../ComparisonCell';
import HeaderCell from '../ComparisonHeaderCell';
import BorderlessRow from '../../BorderlessRow';
import ForestTypeLink from '../../ForestTypeLink';
import SoilIcon from '../../../../icons/SoilIcon';
import {
  treeTypeMapping,
  soilMapping,
} from '../../ForestTypeDescription/lu/utils';
import { getStringWithUnit } from '../../../../utils/comparisonUtils';
import comparisonStyles from '../ForestTypeComparison.module.css';

function ForestTypeTab({ data }) {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const treeTypeRows = useMemo(
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
            <HeaderCell>{t('forestType.label')}</HeaderCell>
            {data.map((ft) => (
              <HeaderCell key={ft.code}>
                <ForestTypeLink code={ft.code} />
              </HeaderCell>
            ))}
          </Table.Row>
        )}
        <Table.Row>
          <HeaderCell>{t('lu.forestType.tilleringHardwood')}</HeaderCell>
          {data.map((ft) => (
            <ComparisonCell
              key={ft.code}
              code={ft.code}
              data={ft.tilleringHardwood}
              unit="%"
            />
          ))}
        </Table.Row>
        {treeTypeRows.map((tt, idx, arr) => (
          <BorderlessRow
            key={tt.treeType}
            borderBottom={idx + 1 === arr.length}
          >
            <>
              <td>
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
          </BorderlessRow>
        ))}
        <Table.Row>
          <HeaderCell>{t('lu.forestType.tilleringFirwood')}</HeaderCell>
          {data.map((ft) => (
            <ComparisonCell
              key={ft.code}
              code={ft.code}
              data={ft.tilleringFirwood}
            />
          ))}
        </Table.Row>
        <Table.Row>
          <HeaderCell>{t('lu.forestType.pioneerTreeTypes')}</HeaderCell>
          {data.map((ft) => (
            <ComparisonCell
              key={ft.code}
              hasSameValues={false}
              code={ft.code}
              data={ft.pioneerTreeTypes}
            />
          ))}
        </Table.Row>
        <Table.Row>
          <HeaderCell>{t('lu.forestType.priority.label')}</HeaderCell>
          {data.map((ft) => (
            <ComparisonCell
              key={ft.code}
              code={ft.code}
              data={ft.priority && t(`lu.forestType.priority.${ft.priority}`)}
            />
          ))}
        </Table.Row>
        <Table.Row>
          <HeaderCell>{t('lu.forestType.aptitude')}</HeaderCell>
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
          <HeaderCell>{t('forestType.rejuvDev')}</HeaderCell>
          {data.map((ft, idx, arr) => (
            <ComparisonCell
              key={ft.code}
              code={ft.code}
              data={ft.forestryRejuvDev}
              footer={isMobile && idx + 1 !== arr.length && <br />}
            />
          ))}
        </Table.Row>
        <Table.Row>
          <HeaderCell>{t('forestType.care')}</HeaderCell>
          {data.map((ft, idx, arr) => (
            <ComparisonCell
              key={ft.code}
              code={ft.code}
              data={ft.forestryCare}
              footer={isMobile && idx + 1 !== arr.length && <br />}
            />
          ))}
        </Table.Row>
        <Table.Row>
          <HeaderCell>{t('lu.forestType.heightDispersion')}</HeaderCell>
          {data.map((ft, idx, arr) => (
            <ComparisonCell
              key={ft.code}
              code={ft.code}
              data={ft.heightDispersion}
            />
          ))}
        </Table.Row>
        <Table.Row>
          <HeaderCell>{t('forestType.terrain')}</HeaderCell>
          {data.map((ft) => (
            <ComparisonCell code={ft.code} key={ft.code}>
              <Relief code={ft.code} trimCode />
            </ComparisonCell>
          ))}
        </Table.Row>
        <Table.Row>
          <HeaderCell>{t('forestTypeDiagram.vegetation')}</HeaderCell>
          {data.map((ft, idx, arr) => (
            <ComparisonCell
              key={ft.code}
              code={ft.code}
              data={ft.vegetation}
              footer={isMobile && idx + 1 !== arr.length && <br />}
            />
          ))}
        </Table.Row>
        <Table.Row>
          <HeaderCell>{t('lu.forestType.soil.label')}</HeaderCell>
          {data.map((ft) => (
            <ComparisonCell key={ft.code} code={ft.code}>
              {soilMapping.map((soilType, idx) => {
                const value = ft.soil[idx];
                return (
                  <span
                    key={`${ft.code}-${soilType}`}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: 10,
                      minWidth: 80,
                      opacity: value ? 1 : 0.4,
                    }}
                  >
                    {soilType.toUpperCase()}
                    {value && <SoilIcon value={value} size={10} />}
                  </span>
                );
              })}
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
