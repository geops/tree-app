import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Table } from 'semantic-ui-react';
import { info } from '@geops/tree-lib';
import useIsMobile from '../../../../hooks/useIsMobile';

import ComparisonCell from '../ComparisonCell';
import ForestTypeLink from '../../ForestTypeLink';
import ForestTypeLinksList from '../../ForestTypeLinksList';
import Site from '../../ForestTypeDescription/bl/Site';
import {
  setForestTypeDescription,
  setForestTypeModal,
} from '../../../../store/actions';
import {
  treeTypeMapping,
  vegetationMapping,
} from '../../ForestTypeDescription/bl/utils';
import SoilIcon from '../../../../icons/SoilIcon';
// import {
//   treeTypeMapping,
//   soilMapping,
// } from '../../ForestTypeDescription/lu/utils';
// import { getStringWithUnit } from '../../../utils/comparisonUtils';
import comparisonStyles from '../ForestTypeComparison.module.css';

const getTreeTypes = (treeTypes, category) =>
  treeTypeMapping.reduce(
    (finalTreeTypes, treeType, index) =>
      treeTypes[index] === category
        ? `${finalTreeTypes}${`${finalTreeTypes ? ', ' : ''}${treeType}`}`
        : finalTreeTypes,
    '',
  );

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
  const dispatch = useDispatch();
  const isMobile = useIsMobile();

  return (
    <Table basic padded structured fixed>
      <Table.Body>
        {!isMobile && (
          <Table.Row>
            <HeaderCell>Standortstyp</HeaderCell>
            {data.map((ft) => (
              <HeaderCell key={ft.code}>
                <ForestTypeLink code={ft.code} />
              </HeaderCell>
            ))}
          </Table.Row>
        )}
        <Table.Row>
          <HeaderCell>Lateinische Bezeichnung</HeaderCell>
          {data.map((ft, idx, arr) => (
            <ComparisonCell
              key={ft.code}
              code={ft.code}
              data={ft.la}
              footer={isMobile && idx + 1 !== arr.length && <br />}
            />
          ))}
        </Table.Row>
        <Table.Row className={comparisonStyles.row}>
          <HeaderCell>Eigenschaften</HeaderCell>
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
          <HeaderCell>Verjüngung und Entwicklung</HeaderCell>
          {data.map((ft, idx, arr) => (
            <ComparisonCell
              key={ft.code}
              code={ft.code}
              data={ft.forestryRejuvDev ? ft.forestryRejuvDev : null}
            />
          ))}
        </Table.Row>
        <Table.Row>
          <HeaderCell>Pflege</HeaderCell>
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
          <HeaderCell>Beschrieb Naturwald</HeaderCell>
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
          <HeaderCell>Höhenverbreitung</HeaderCell>
          {data.map((ft, idx, arr) => (
            <ComparisonCell
              key={ft.code}
              code={ft.code}
              data={ft.heightDispersion ? ft.heightDispersion : null}
            />
          ))}
        </Table.Row>
        <Table.Row>
          <HeaderCell>Standort</HeaderCell>
          {data.map((ft, idx, arr) => (
            <ComparisonCell
              key={ft.code}
              code={ft.code}
              data={ft.location ? ft.location : null}
              footer={isMobile && idx + 1 !== arr.length && <br />}
            />
          ))}
        </Table.Row>
        <Table.Row>
          <HeaderCell>Geologie</HeaderCell>
          {data.map((ft, idx, arr) => (
            <ComparisonCell
              key={ft.code}
              code={ft.code}
              data={ft.geology ? ft.geology : null}
              footer={isMobile && idx + 1 !== arr.length && <br />}
            />
          ))}
        </Table.Row>
        <Table.Row>
          <HeaderCell>Vegetation</HeaderCell>
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
          <HeaderCell>Übergänge zu</HeaderCell>
          <>
            {data.map((ft, idx, arr) => {
              const forestSubTypes = ft.transitions?.map((code) =>
                info('forestType', code, 'bl'),
              );
              return (
                <ComparisonCell key={ft.code} code={ft.code}>
                  <ForestTypeLinksList
                    forestTypes={forestSubTypes}
                    onClick={(evt, code) => {
                      dispatch(setForestTypeModal('d'));
                      dispatch(setForestTypeDescription(code));
                    }}
                  />
                </ComparisonCell>
              );
            })}
          </>
        </Table.Row>
        <Table.Row>
          <HeaderCell>Vegetation</HeaderCell>
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
          <HeaderCell>Als Hauptbaumart geeignet</HeaderCell>
          <>
            {data.map((ft, idx, arr) => (
              <ComparisonCell
                key={ft.code}
                code={ft.code}
                data={getTreeTypes(ft.tilleringTreeTypes, 'D') || '-'}
              />
            ))}
          </>
        </Table.Row>
        <Table.Row>
          <HeaderCell>Als Nebenbaumart geeignet</HeaderCell>
          <>
            {data.map((ft, idx, arr) => (
              <ComparisonCell
                key={ft.code}
                code={ft.code}
                data={getTreeTypes(ft.tilleringTreeTypes, 'N') || '-'}
              />
            ))}
          </>
        </Table.Row>
        <Table.Row>
          <HeaderCell>Baumart mitpflegen</HeaderCell>
          <>
            {data.map((ft, idx, arr) => (
              <ComparisonCell
                key={ft.code}
                code={ft.code}
                data={getTreeTypes(ft.tilleringTreeTypes, 'S') || '-'}
              />
            ))}
          </>
        </Table.Row>
        <Table.Row>
          <HeaderCell>Gastbaumart, als Hauptbaumart geeignet</HeaderCell>
          <>
            {data.map((ft, idx, arr) => (
              <ComparisonCell
                key={ft.code}
                code={ft.code}
                data={getTreeTypes(ft.tilleringTreeTypes, 'G') || '-'}
              />
            ))}
          </>
        </Table.Row>
        <Table.Row>
          <HeaderCell>Hangneigung & Exposition</HeaderCell>
          {data.map((ft) => (
            <ComparisonCell code={ft.code} key={ft.code}>
              <Site data={ft.expoAndAspect} />
            </ComparisonCell>
          ))}
        </Table.Row>
        <Table.Row>
          <HeaderCell>{t('lu.forestType.soil.label')}</HeaderCell>
          {data.map((ft) => (
            <ComparisonCell key={ft.code} code={ft.code}>
              {vegetationMapping.map((soilType, idx) => {
                const value = ft.vegetationIndicator[idx];
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
        </Table.Row>
      </Table.Body>
    </Table>
  );
}

ForestTypeTab.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default ForestTypeTab;
