import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import parse from 'html-react-parser';

const parseHtml = (string) => parse(string.slice().replace(/\\n/g, '<br>'));

const styles = {
  section: {
    padding: '20px 0',
  },
};

function GeneralTab({ data }) {
  const { t } = useTranslation();

  return (
    <>
      <div style={styles.section}>
        <h4>{t('forestType.appearance')}</h4>
        <p>{parseHtml(data.description)}</p>
        <p>{parseHtml(data.vegetation)}</p>
      </div>
      <div style={styles.section}>
        <h4>{t('forestType.aptitude')}</h4>
        <p>{parseHtml(data.aptitude)}</p>
      </div>
      <div style={styles.section}>
        <h4>{t('forestType.rejuvDev')}</h4>
        <p>{parseHtml(data.forestryRejuvDev)}</p>
      </div>
      <div style={styles.section}>
        <h4>{t('forestType.care')}</h4>
        <p>{parseHtml(data.forestryCare)}</p>
      </div>
    </>
  );
}

GeneralTab.propTypes = {
  data: PropTypes.arrayOf().isRequired,
};

export default GeneralTab;
