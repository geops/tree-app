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

function AssociationsTab({ data }) {
  const { t } = useTranslation();
  const activeProfile = useSelector((state) => state.activeProfile);
  const associationGroup = info('associationGroup', null, activeProfile).find(
    (group) => group.code === data.associationGroupCode,
  );

  return (
    <>
      <div style={styles.section}>
        <h4>{t('forestType.location')}</h4>
        <p>{parseHtml(associationGroup.location)}</p>
      </div>
      <div style={styles.section}>
        <h4>{t('forestTypeDiagram.soil.header')}</h4>
        <p>{parseHtml(associationGroup.soil)}</p>
      </div>
      <div style={styles.section}>
        <h4>{t('forestType.meaning')}</h4>
        <p>{parseHtml(associationGroup.aptitudeMeaning)}</p>
      </div>
    </>
  );
}

AssociationsTab.propTypes = {
  data: PropTypes.arrayOf().isRequired,
};

export default AssociationsTab;
