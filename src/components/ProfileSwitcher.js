import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from './Dropdown';

import { setActiveProfile } from '../store/actions';
import translation from '../i18n/resources/de/translation.json';

import styles from './ProfileSwitcher.module.css';

function ProfileSwitcher() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const activeProfile = useSelector((state) => state.activeProfile);

  const profiles = useMemo(
    () =>
      Object.keys(translation.profiles).map((key) => ({
        value: `${key}`,
        text: t(`profiles.${key}`),
        content: (
          <span data-cypress={`${key}Option`}>{t(`profiles.${key}`)}</span>
        ),
      })),
    [t],
  );

  return (
    <Dropdown
      value={activeProfile}
      className={styles['profile-switcher']}
      options={profiles}
      onChange={(e, { value }) => dispatch(setActiveProfile(value))}
      data-cypress="profileSwitcher"
      search={false}
      label={<h5>{t('app.profile')}</h5>}
    />
  );
}

export default ProfileSwitcher;
