import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import React from 'react';
import { useTranslation } from 'react-i18next';
import parse from 'html-react-parser';
// eslint-disable-next-line import/no-unresolved
import { info } from '@geops/tree-lib';

const parseHtml = (string) => parse(string.slice().replace(/\\n/g, '<br>'));

const styles = {
  section: {
    padding: '20px 0',
  },
};

function AssociationsTab({ associationGroupCode }) {
  const { t } = useTranslation();
  const activeProfile = useSelector((state) => state.activeProfile);
  const associationGroup = info(
    'associationGroup',
    associationGroupCode,
    activeProfile,
  );

  return (
    <>
      <div style={styles.section}>
        <h4>{t('lu.forestType.location')}</h4>
        <p>{parseHtml(associationGroup.location)}</p>
      </div>
      <div style={styles.section}>
        <h4>{t('forestTypeDiagram.soil.header')}</h4>
        <p>{parseHtml(associationGroup.soil)}</p>
      </div>
      <div style={styles.section}>
        <h4>{t('lu.forestType.meaning')}</h4>
        <p>{parseHtml(associationGroup.aptitudeMeaning)}</p>
      </div>
    </>
  );
}

AssociationsTab.propTypes = {
  associationGroupCode: PropTypes.string.isRequired,
};

export default AssociationsTab;
