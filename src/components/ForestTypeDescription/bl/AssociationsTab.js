import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Table } from 'semantic-ui-react';
import { info } from '@geops/tree-lib';
import { setForestTypeDescription } from '../../../store/actions';
import styles from '../ForestTypeDescription.module.css';
import { parseString } from '../../../utils/comparisonUtils';

function AssociationsTab({ forestTypeCode, onForestTypeChange }) {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const activeProfile = useSelector((state) => state.activeProfile);
  const associationGroup = info(
    'associationGroup',
    forestTypeCode,
    activeProfile,
  );
  const forestSubTypes = info('forestType', null, activeProfile).filter(
    (type) => type.associationGroupCode === associationGroup.category,
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
              {t('bl.forestType.locationDescription')}
            </Table.HeaderCell>
            <Table.Cell colSpan="3">
              <p>{parseString(associationGroup.location)}</p>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>{t('bl.forestType.appearance')}</Table.HeaderCell>
            <Table.Cell colSpan="3">
              <p>{parseString(associationGroup.forestAppearance)}</p>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>
              {t('bl.forestType.heightDispersion')}
            </Table.HeaderCell>
            <Table.Cell colSpan="3">
              <p>{parseString(associationGroup.heightDispersion)}</p>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>{t('bl.forestType.useAndCare')}</Table.HeaderCell>
            <Table.Cell colSpan="3">
              <p>{parseString(associationGroup.useAndCare)}</p>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>{t('bl.forestType.area')}</Table.HeaderCell>
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
            <Table.HeaderCell>{t('lu.forestType.subGroups')}</Table.HeaderCell>
            <Table.Cell
              colSpan="3"
              data-cypress="forestTypeDescription.lu.associationsTabSubGroups"
            >
              {forestSubTypes.map(({ code, de }) => (
                <span key={code}>
                  <button
                    className={styles.link}
                    type="button"
                    onClick={() => {
                      dispatch(setForestTypeDescription(code));
                      onForestTypeChange();
                    }}
                  >
                    {code} - {de}
                  </button>
                  <br />
                </span>
              ))}
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
