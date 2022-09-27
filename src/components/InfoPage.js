import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Accordion } from 'semantic-ui-react';

import InfoAbout from './InfoAbout';
import InfoBugs from './InfoBugs';
import InfoContact from './InfoContact';
import InfoGlossary from './InfoGlossary';
import InfoLocation from './InfoLocation';
import InfoLucerne from './InfoLucerne';
import InfoParticipants from './InfoParticipants';
import InfoRecommendation from './InfoRecommendation';
import InfoReports from './InfoReports';
import InfoUsage from './InfoUsage';
import LanguageSwitcher from './LanguageSwitcher';
import ProfileSwitcher from './ProfileSwitcher';
import LatinSwitcher from './LatinSwitcher';

import styles from './InfoPage.module.css';
import InfoImpressum from './InfoImpressum';

function InfoPage() {
  const activeProfile = useSelector((state) => state.activeProfile);
  const { t } = useTranslation();
  const panels = [
    {
      key: 'info.about',
      title: { content: t('info.aboutTitle') },
      content: { content: <InfoAbout /> },
    },
    {
      key: 'info.language&profile',
      title: { content: `${t('app.language')} & ${t('app.profile')}` },
      content: {
        content: (
          <div className={styles.infoLangProfilesContent}>
            <LanguageSwitcher />
            <ProfileSwitcher />
            <LatinSwitcher />
          </div>
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
      content: { content: <InfoImpressum /> },
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

  if (activeProfile === 'lu') {
    panels.splice(
      panels.findIndex((panel) => panel.key === 'info.language&profile') + 1,
      0,
      {
        key: 'info.lu',
        title: { content: InfoLucerne.title },
        content: { content: <InfoLucerne /> },
      },
    );
  }

  return (
    <div className={styles.page}>
      <Accordion fluid panels={panels} styled />
    </div>
  );
}

export default InfoPage;
