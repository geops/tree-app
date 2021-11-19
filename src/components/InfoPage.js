import React from 'react';
import { useTranslation } from 'react-i18next';
import { Accordion } from 'semantic-ui-react';

import InfoAbout from './InfoAbout';
import InfoBugs from './InfoBugs';
import InfoContact from './InfoContact';
import InfoGlossary from './InfoGlossary';
import InfoLocation from './InfoLocation';
import InfoParticipants from './InfoParticipants';
import InfoRecommendation from './InfoRecommendation';
import InfoReports from './InfoReports';
import InfoUsage from './InfoUsage';
import LanguageSwitcher from './LanguageSwitcher';
import LatinSwitcher from './LatinSwitcher';

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
      key: 'info.language',
      title: { content: t('app.language') },
      content: {
        content: (
          <>
            <p>
              <LanguageSwitcher />
            </p>
            <p>
              <LatinSwitcher />
            </p>
          </>
        ),
      },
    },
    {
      key: 'info.bugs',
      title: { content: t('info.bugsTitle') },
      content: { content: <InfoBugs /> },
    },
    {
      key: 'info.usage',
      title: { content: t('info.usageTitle') },
      content: { content: <InfoUsage /> },
    },
    {
      key: 'info.location',
      title: { content: t('info.locationTitle') },
      content: { content: <InfoLocation /> },
    },
    {
      key: 'info.recommendation',
      title: { content: t('info.recommendationTitle') },
      content: { content: <InfoRecommendation /> },
    },
    {
      key: 'info.glossary',
      title: { content: t('info.glossaryTitle') },
      content: { content: <InfoGlossary /> },
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
    {
      key: 'info.disclaimer',
      title: { content: t('info.disclaimerTitle') },
      content: { content: t('info.disclaimer') },
    },
    {
      key: 'info.contact',
      title: { content: t('info.contactTitle') },
      content: { content: <InfoContact /> },
    },
    {
      key: 'info.changelog',
      title: { content: t('info.changelogTitle') },
      content: {
        content: (
          // eslint-disable-next-line react/no-danger
          <div dangerouslySetInnerHTML={{ __html: t('info.changelog') }} />
        ),
      },
    },
  ];
  return (
    <div className={styles.page}>
      <Accordion fluid panels={panels} styled />
    </div>
  );
}

export default InfoPage;
