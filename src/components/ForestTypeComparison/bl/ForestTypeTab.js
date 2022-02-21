import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Table } from 'semantic-ui-react';
import useIsMobile from '../../../hooks/useIsMobile';

// import Relief from '../../ForestTypeDescription/lu/Relief';
import ComparisonCell from '../ComparisonCell';
import ForestTypeLink from '../ForestTypeLink';
// import SoilIcon from '../../../icons/SoilIcon';
// import {
//   treeTypeMapping,
//   soilMapping,
// } from '../../ForestTypeDescription/lu/utils';
// import { getStringWithUnit } from '../../../utils/comparisonUtils';
// import comparisonStyles from '../ForestTypeComparison.module.css';

const HeaderCell = ({ ...props }) => {
  const { children } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Table.HeaderCell {...props} verticalAlign="top">
      {children}
    </Table.HeaderCell>
  );
};
HeaderCell.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

function ForestTypeTab({ data }) {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

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
          <HeaderCell>{t('forestType.la')}</HeaderCell>
          {data.map((ft, idx, arr) => (
            <ComparisonCell
              key={ft.code}
              code={ft.code}
              data={ft.la}
              footer={isMobile && idx + 1 !== arr.length && <br />}
            />
          ))}
        </Table.Row>
        <Table.Row>
          <HeaderCell>{t('forestType.properties')}</HeaderCell>
          {data.map((ft, idx, arr) => (
            <ComparisonCell
              key={ft.code}
              code={ft.code}
              data={ft.properties}
              footer={isMobile && idx + 1 !== arr.length && <br />}
            />
          ))}
        </Table.Row>
        {/* {treeTypeCells.map((tt, idx, arr) => (
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
        ))} */}
        <Table.Row>
          <HeaderCell>{t('forestType.rejuvDev')}</HeaderCell>
          {data.map((ft, idx, arr) => (
            <ComparisonCell
              key={ft.code}
              code={ft.code}
              data={ft.forestryRejuvDev ? ft.forestryRejuvDev : null}
            />
          ))}
        </Table.Row>
        <Table.Row>
          <HeaderCell>{t('forestType.care')}</HeaderCell>
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
          <HeaderCell>{t('forestType.descriptionNaturalForest')}</HeaderCell>
          {data.map((ft, idx, arr) => (
            <ComparisonCell
              key={ft.code}
              code={ft.code}
              data={
                ft.descriptionNaturalForest ? ft.descriptionNaturalForest : null
              }
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
              data={ft.heightDispersion ? ft.heightDispersion : null}
            />
          ))}
        </Table.Row>
        <Table.Row>
          <HeaderCell>{t('forestType.descriptionForestType')}</HeaderCell>
          {data.map((ft, idx, arr) => (
            <ComparisonCell
              key={ft.code}
              code={ft.code}
              data={ft.location ? ft.location : null}
              footer={isMobile && idx + 1 !== arr.length && <br />}
            />
          ))}
        </Table.Row>
        {/* <Table.Row>
          <HeaderCell>{t('lu.forestType.terrain')}</HeaderCell>
          {data.map((ft) => (
            <ComparisonCell code={ft.code} key={ft.code}>
              <Relief code={ft.code} />
            </ComparisonCell>
          ))}
        </Table.Row>
        <Table.Row>
          <HeaderCell>{t('forestTypeDiagram.vegetation')}</HeaderCell>
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
          <HeaderCell>{t('lu.forestType.soil.label')}</HeaderCell>
          {data.map((ft) => (
            <ComparisonCell key={ft.code} code={ft.code}>
              {soilMapping.map((soilType, idx) => {
                const value = ft.soil[idx];
                return (
                  <span
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
        </Table.Row> */}
      </Table.Body>
    </Table>
  );
}

ForestTypeTab.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default ForestTypeTab;
