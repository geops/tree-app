import React, { useMemo, useState } from 'react';
import { Form } from 'semantic-ui-react';
// eslint-disable-next-line import/no-unresolved
import { info } from 'lib/src';

import Dropdown from './Dropdown';
import ForestTypeModal from './ForestTypeModal';
import LanguageSwitcher from './LanguageSwitcher';

function ForestTypePage() {
  const forestTypes = useMemo(
    () => info('forestType').map(({ code }) => ({ text: code, value: code })),
    [],
  );
  const [data, setData] = useState(null);

  return (
    <Form style={{ margin: 20 }}>
      <Dropdown
        options={forestTypes}
        onChange={(e, { value }) => setData(info('forestType', value))}
      />
      <Form.Field>{data && <ForestTypeModal data={data} />}</Form.Field>
      <Form.Field>
        <LanguageSwitcher />
      </Form.Field>
    </Form>
  );
}

export default ForestTypePage;
