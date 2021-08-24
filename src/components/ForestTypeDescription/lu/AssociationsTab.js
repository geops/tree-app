import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Table } from 'semantic-ui-react';
import parse from 'html-react-parser';
// eslint-disable-next-line import/no-unresolved
import { info } from '@geops/tree-lib';
import { setForestTypeInfo } from '../../../store/actions';
import styles from '../ForestTypeDescription.module.css';

const parseHtml = (string) => parse(string.slice().replace(/\\n/g, '<br>'));

function AssociationsTab({ associationGroupCode }) {
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
            {associationGroup[i18n.language]}{' '}
            {associationGroup.la ? <i>{associationGroup.la}</i> : null}
          </>
        ) : (
          t('forestTypeModal.noDataHeader')
        )}
      </h3>
      <Table basic padded structured>
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell>{t('lu.forestType.location')}</Table.HeaderCell>
            <Table.Cell colSpan="3">
              <p>{parseHtml(associationGroup.location)}</p>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>
              {t('forestTypeDiagram.soil.header')}
            </Table.HeaderCell>
            <Table.Cell colSpan="3">
              <p>{parseHtml(associationGroup.soil)}</p>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>{t('lu.forestType.meaning')}</Table.HeaderCell>
            <Table.Cell colSpan="3">
              <p>{parseHtml(associationGroup.aptitudeMeaning)}</p>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>{t('lu.forestType.subGroups')}</Table.HeaderCell>
            <Table.Cell colSpan="3">
              {forestSubTypes.map((type, idx, array) => (
                <span key={type.code}>
                  <button
                    className={styles.link}
                    type="button"
                    onClick={() => dispatch(setForestTypeInfo(type))}
                  >
                    {type.de}
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
  associationGroupCode: PropTypes.string.isRequired,
};

export default AssociationsTab;
