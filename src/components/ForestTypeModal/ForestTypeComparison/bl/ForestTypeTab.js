import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Table } from 'semantic-ui-react';
import { info, utils } from '@geops/tree-lib';
import { useTranslation } from 'react-i18next';

import useIsMobile from '../../../../hooks/useIsMobile';
import ComparisonCell from '../ComparisonCell';
import BorderlessRow from '../../BorderlessRow';
import HeaderCell from '../ComparisonHeaderCell';
import ForestTypeLink from '../../ForestTypeLink';
import ForestTypeLinksList from '../../ForestTypeLinksList';
import Relief from '../../ForestTypeDescription/Relief';
import Site from '../../ForestTypeDescription/bl/Site';
import {
  setForestTypeDescription,
  setForestTypeModal,
} from '../../../../store/actions';
import {
  getTilleringTreeTypes,
  soilIconTranslator,
} from '../../ForestTypeDescription/bl/utils';
import SoilIcon from '../../../../icons/SoilIcon';

function ForestTypeTab({ data }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
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
        <Table.Row>
          <HeaderCell>Laubholzanteil</HeaderCell>
          {data.map((ft) => (
            <ComparisonCell
              key={ft.code}
              code={ft.code}
              data={ft.tilleringHardwood}
              unit="%"
            />
          ))}
        </Table.Row>
        <BorderlessRow>
          <HeaderCell>Als Hauptbaumart geeignet</HeaderCell>
          {data.map((ft) => (
            <ComparisonCell
              key={ft.code}
              code={ft.code}
              data={getTilleringTreeTypes(ft?.tilleringTreeTypes, 'D')}
            />
          ))}
        </BorderlessRow>
        <BorderlessRow>
          <HeaderCell>Als Nebenbaumart geeignet</HeaderCell>
          {data.map((ft) => (
            <ComparisonCell
              key={ft.code}
              code={ft.code}
              data={getTilleringTreeTypes(ft?.tilleringTreeTypes, 'N')}
            />
          ))}
        </BorderlessRow>
        <BorderlessRow>
          <HeaderCell>Baumart mitpflegen</HeaderCell>
          {data.map((ft) => (
            <ComparisonCell
              key={ft.code}
              code={ft.code}
              data={getTilleringTreeTypes(ft?.tilleringTreeTypes, 'S')}
            />
          ))}
        </BorderlessRow>
        <BorderlessRow borderBottom>
          <HeaderCell>Gastbaumart, als Hauptbaumart geeignet</HeaderCell>
          {data.map((ft) => (
            <ComparisonCell
              key={ft.code}
              code={ft.code}
              data={getTilleringTreeTypes(ft?.tilleringTreeTypes, 'G')}
            />
          ))}
        </BorderlessRow>
        <Table.Row>
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
        <Table.Row>
          <HeaderCell>Bestockungsziele</HeaderCell>
          {data.map((ft) => (
            <ComparisonCell
              key={ft.code}
              code={ft.code}
              data={ft.tillering ? ft.tillering : null}
            />
          ))}
        </Table.Row>
        <Table.Row>
          <HeaderCell>Verjüngung und Entwicklung</HeaderCell>
          {data.map((ft) => (
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
          <HeaderCell>{t('bl.forestType.descriptionNaturalForest')}</HeaderCell>
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
          <HeaderCell>Übergänge zu</HeaderCell>
          {data.map((ft) => {
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
        </Table.Row>
        <Table.Row>
          <HeaderCell>Höhenverbreitung</HeaderCell>
          {data.map((ft) => (
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
          <HeaderCell>{t('forestType.terrain')}</HeaderCell>
          {data.map((ft) => (
            <ComparisonCell code={ft.code} key={ft.code}>
              <Relief code={ft.code} />
            </ComparisonCell>
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
          <HeaderCell>Hangneigung & Exposition</HeaderCell>
          {data.map((ft) => (
            <ComparisonCell code={ft.code} key={ft.code}>
              <Site data={ft.expoAndAspect} />
            </ComparisonCell>
          ))}
        </Table.Row>
        <Table.Row>
          <HeaderCell>Zeigerartengruppen</HeaderCell>
          {data.map((ft) => (
            <ComparisonCell key={ft.code} code={ft.code}>
              {utils()
                .getMapping('vegetation', 'bl')
                .map((indicator, idx) => {
                  const value = soilIconTranslator(
                    ft.vegetationIndicator && ft.vegetationIndicator[idx],
                  );
                  return (
                    <span
                      key={`${ft.code}-${indicator}`}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: 10,
                        minWidth: 80,
                        opacity: value ? 1 : 0.4,
                      }}
                    >
                      {indicator.toUpperCase()}
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
