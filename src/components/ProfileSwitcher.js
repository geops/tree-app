import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import lib from '@geops/tree-lib';
import Dropdown from './Dropdown';

import { setActiveProfile } from '../store/actions';

import styles from './ProfileSwitcher.module.css';

function ProfileSwitcher() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const activeProfile = useSelector((state) => state.activeProfile);

  const profiles = useMemo(
    () =>
      Object.keys(lib.types).map((key) => ({
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
    />
  );
}

export default ProfileSwitcher;
