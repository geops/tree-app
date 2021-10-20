import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'semantic-ui-react';
// eslint-disable-next-line import/no-unresolved
import { info } from '@geops/tree-lib';

import Button from './Button';
import Dropdown from './Dropdown';
import LanguageSwitcher from './LanguageSwitcher';
import ProfileSwitcher from './ProfileSwitcher';

import { setForestTypeDescription } from '../store/actions';

function ForestTypePage() {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const activeProfile = useSelector((state) => state.activeProfile);
  const forestTypeOptions = useMemo(
    () =>
      info('forestType', null, activeProfile).map((ft) => ({
        text: `${ft.code} - ${ft[i18n.language]}`,
        value: ft.code,
      })),
    [activeProfile, i18n.language],
  );
  const [forestType, setForestType] = useState(null);

  return (
    <Form style={{ margin: 20 }}>
      <Dropdown
        options={forestTypeOptions}
        onChange={(e, { value }) => setForestType(value)}
        value={forestType}
      />
      <Form.Field>
        {forestType && (
          <Button
            active
            compact
            icon="info"
            onClick={() => dispatch(setForestTypeDescription(forestType))}
          />
        )}
      </Form.Field>
      <Form.Field>
        <LanguageSwitcher />
      </Form.Field>
      <Form.Field>
        <ProfileSwitcher />
      </Form.Field>
    </Form>
  );
}

export default ForestTypePage;
