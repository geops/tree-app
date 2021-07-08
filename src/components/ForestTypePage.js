import React, { useMemo, useState } from 'react';
import { Form } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
// eslint-disable-next-line import/no-unresolved
import { info } from '@geops/tree-lib';

import Button from './Button';
import Dropdown from './Dropdown';
import LanguageSwitcher from './LanguageSwitcher';
import ProfileSwitcher from './ProfileSwitcher';

import { setForestTypeInfo } from '../store/actions';

function ForestTypePage() {
  const dispatch = useDispatch();
  const activeProfile = useSelector((state) => state.activeProfile);
  const forestTypes = useMemo(
    () =>
      info('forestType', null, activeProfile).map(({ code }) => ({
        text: code,
        value: code,
      })),
    [activeProfile],
  );
  const [data, setData] = useState(null);

  return (
    <Form style={{ margin: 20 }}>
      <Dropdown
        value={data ? data.de : ''}
        text={data?.de}
        options={forestTypes}
        onChange={(e, { value }) =>
          setData(info('forestType', value, activeProfile))
        }
      />
      <Form.Field>
        {data && (
          <Button
            active
            compact
            icon="info"
            onClick={() => dispatch(setForestTypeInfo(data))}
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
