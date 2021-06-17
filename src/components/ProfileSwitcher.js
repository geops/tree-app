import React from 'react';
// import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from './Dropdown';

import { setActiveProfile } from '../store/actions';

import styles from './ProfileSwitcher.module.css';

function ProfileSwitcher() {
  // const { t } = useTranslation();
  const dispatch = useDispatch();
  const activeProfile = useSelector((state) => state.activeProfile);
  const profiles = useSelector((state) => state.profiles);

  return (
    <Dropdown
      text={`${activeProfile.name}`}
      className={styles['profile-switcher']}
    >
      <Dropdown.Menu>
        {profiles.map((profile) => (
          <Dropdown.Item
            key={profile.id}
            text={`${profile.name}`}
            onClick={() => dispatch(setActiveProfile(profile))}
          />
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ProfileSwitcher;
