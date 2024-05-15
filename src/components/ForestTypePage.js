import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Message, MessageHeader } from 'semantic-ui-react';
import { info, utils } from '@geops/tree-lib';

import Button from './Button';
import Dropdown from './Dropdown';
import LanguageSwitcher from './LanguageSwitcher';
import ProfileSwitcher from './ProfileSwitcher';

import { setForestTypeDescription } from '../store/actions';

const { sortForestTypes } = utils();

function ForestTypePage() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const activeProfile = useSelector((state) => state.activeProfile);
  const forestTypeOptions = useMemo(() => {
    try {
      return info('forestType', null, activeProfile)
        .sort(sortForestTypes)
        .map((ft) => ({
          text: `${ft.code}${
            ft[i18n.language] ? `- ${ft[i18n.language]}` : ''
          }`,
          value: ft.code,
        }));
    } catch (error) {
      return null;
    }
  }, [activeProfile, i18n.language]);
  const [forestType, setForestType] = useState(null);

  return (
    <Form style={{ margin: 20 }}>
      {forestTypeOptions?.length ? (
        <Dropdown
          options={forestTypeOptions}
          onChange={(e, { value }) => setForestType(value)}
          value={forestType}
        />
      ) : (
        <Message warning visible>
          <MessageHeader>
            {t('forestTypePage.noCantonalForestTypesMessage')}
          </MessageHeader>
        </Message>
      )}
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
