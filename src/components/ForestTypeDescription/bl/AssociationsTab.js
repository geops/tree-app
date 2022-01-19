import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Table } from 'semantic-ui-react';
import { info } from '@geops/tree-lib';
import { parseString } from '../../../utils/comparisonUtils';
import ForestTypeLinksList from '../ForestTypeLinksList';
import { setForestTypeDescription } from '../../../store/actions';

function AssociationsTab({ forestTypeCode, onForestTypeChange }) {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const activeProfile = useSelector((state) => state.activeProfile);
  const associationGroup = info(
    'associationGroup',
    undefined,
    activeProfile,
  ).find((group) => group.locations.includes(forestTypeCode));

  const forestSubTypes = associationGroup.locations?.map((code) =>
    info('forestType', code, activeProfile),
  );

  return (
    <>
      <h3>
        {associationGroup ? (
          <>
            {associationGroup.code} - {associationGroup[i18n.language]}{' '}
            {associationGroup.la ? <i>{associationGroup.la}</i> : null}
          </>
        ) : (
          t('forestTypeModal.noDataHeader')
        )}
      </h3>
      <Table basic padded structured>
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell>Standortbeschreibung</Table.HeaderCell>
            <Table.Cell colSpan="3">
              <p>{parseString(associationGroup.location)}</p>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>Waldbild</Table.HeaderCell>
            <Table.Cell colSpan="3">
              <p>{parseString(associationGroup.forestAppearance)}</p>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>Höhenverbreitung</Table.HeaderCell>
            <Table.Cell colSpan="3">
              <p>{parseString(associationGroup.heightDispersion)}</p>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>Nutzung und Pflege</Table.HeaderCell>
            <Table.Cell colSpan="3">
              <p>{parseString(associationGroup.useAndCare)}</p>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>Fläche</Table.HeaderCell>
            <Table.Cell colSpan="3">
              <div>
                <strong>Basel-Land:</strong>
                {` ${associationGroup.areaBl}ha`}
              </div>
              <div>
                <strong>Basel-Stadt:</strong>
                {` ${associationGroup.areaBs}ha`}
              </div>
              <div>
                <strong>Gesamter Flächenanteil:</strong>
                {` ${associationGroup.areaBlBsPercent * 100}%`}
              </div>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>Standortstypen</Table.HeaderCell>
            <Table.Cell colSpan="3">
              <ForestTypeLinksList
                forestTypes={forestSubTypes}
                onClick={(evt, code) => {
                  dispatch(setForestTypeDescription(code));
                  onForestTypeChange();
                }}
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  );
}

AssociationsTab.propTypes = {
  forestTypeCode: PropTypes.string.isRequired,
  onForestTypeChange: PropTypes.func,
};

AssociationsTab.defaultProps = {
  onForestTypeChange: () => {},
};

export default AssociationsTab;
