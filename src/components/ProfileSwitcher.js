import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from './Dropdown';

import { setActiveProfile } from '../store/actions';

import styles from './ProfileSwitcher.module.css';

function ProfileSwitcher() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const activeProfile = useSelector((state) => state.activeProfile);
  const profiles = useMemo(
    () => [
      {
        value: 'ch',
        text: t('profiles.ch'),
        content: <span>{t('profiles.ch')}</span>,
      },
      {
        value: 'lu',
        text: t('profiles.lu'),
        content: <span data-cypress="lucerneOption">{t('profiles.lu')}</span>,
      },
    ],
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
    />
  );
}

export default ProfileSwitcher;
