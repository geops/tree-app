import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Table } from 'semantic-ui-react';
import { info } from '@geops/tree-lib';
import { setForestTypeDescription } from '../../../store/actions';
import ForestTypeLinksList from '../ForestTypeLinksList';
import { parseString } from '../../../utils/comparisonUtils';

function AssociationsTab({ associationGroupCode, onForestTypeChange }) {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const activeProfile = useSelector((state) => state.activeProfile);
  const associationGroup = info(
    'associationGroup',
    associationGroupCode,
    activeProfile,
  );
  const forestSubTypes = info('forestType', null, activeProfile).filter(
    (type) => type.associationGroupCode === associationGroupCode,
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
            <Table.HeaderCell>
              {t('lu.forestType.aptitudeMeaning')}
            </Table.HeaderCell>
            <Table.Cell colSpan="3">
              <p>{parseString(associationGroup.aptitudeMeaning)}</p>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>
              {t('lu.forestType.description')}
            </Table.HeaderCell>
            <Table.Cell colSpan="3">
              <p>{parseString(associationGroup.description)}</p>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>
              {t('lu.forestType.heightDispersion')}
            </Table.HeaderCell>
            <Table.Cell colSpan="3">
              <p>{parseString(associationGroup.heightDispersion)}</p>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>{t('lu.forestType.location')}</Table.HeaderCell>
            <Table.Cell colSpan="3">
              <p>{parseString(associationGroup.location)}</p>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>
              {t('forestTypeDiagram.soil.header')}
            </Table.HeaderCell>
            <Table.Cell colSpan="3">
              <p>{parseString(associationGroup.soil)}</p>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>{t('lu.forestType.subGroups')}</Table.HeaderCell>
            <Table.Cell
              colSpan="3"
              data-cypress="forestTypeDescription.lu.associationsTabSubGroups"
            >
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
  associationGroupCode: PropTypes.string.isRequired,
  onForestTypeChange: PropTypes.func,
};

AssociationsTab.defaultProps = {
  onForestTypeChange: () => {},
};

export default AssociationsTab;
