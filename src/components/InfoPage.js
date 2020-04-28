import React from 'react';
import { useTranslation } from 'react-i18next';
import { Accordion } from 'semantic-ui-react';

import InfoAbout from './InfoAbout';
import InfoParticipants from './InfoParticipants';
import InfoRecommendation from './InfoRecommendation';
import InfoReports from './InfoReports';
import InfoUsage from './InfoUsage';

import styles from './InfoPage.module.css';

function InfoPage() {
  const { t } = useTranslation();
  const panels = [
    {
      key: 'info.about',
      title: { content: t('info.aboutTitle') },
      content: { content: <InfoAbout /> },
    },
    {
      key: 'info.usage',
      title: { content: t('info.usageTitle') },
      content: { content: <InfoUsage /> },
    },
    {
      key: 'info.recommendation',
      title: { content: t('info.recommendationTitle') },
      content: { content: <InfoRecommendation /> },
    },
    {
      key: 'info.participants',
      title: { content: t('info.participantsTitle') },
      content: { content: <InfoParticipants /> },
    },
    {
      key: 'info.reports',
      title: { content: t('info.reportsTitle') },
      content: { content: <InfoReports /> },
    },
    {
      key: 'info.impressum',
      title: { content: t('info.impressumTitle') },
      content: { content: t('info.impressum') },
    },
  ];
  return (
    <div className={styles.page}>
      <Accordion fluid panels={panels} styled />
    </div>
  );
}

export default InfoPage;
