import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { project } from '@geops/tree-lib';
import 'semantic-ui-css/semantic.min.css';
import { Container, Divider, Form, Header, Label } from 'semantic-ui-react';

import Slope from './components/Slope';

const getDropdownOptions = i => ({
  key: i.key,
  text: i.label,
  value: i.key,
});

function App() {
  const { t, i18n } = useTranslation();
  const [location, setLocation] = useState({
    // forestType: '60*',
    // forestEcoregion: '1',
    // heightLevel: 'SA',
  });
  const projection = useMemo(() => project(location, i18n.language), [
    location,
    i18n.language,
  ]);
  document.title = t('app.title');

  return (
    <Container>
      <Divider hidden />
      <Header size="huge" textAlign="center" color="olive">
        {t('app.title')} <Label>{t('app.ribbon')}</Label>
      </Header>
      <Divider hidden />
      <Form>
        <Form.Dropdown
          label={t('forestType.label')}
          placeholder={t('dropdownPlaceholder')}
          search
          selection
          fluid
          clearable
          value={location.forestType}
          options={projection.options.forestType.map(getDropdownOptions)}
          onChange={(e, { value }) =>
            setLocation({ ...location, forestType: value })
          }
        />
        {projection.options.forestEcoregion && (
          <Form.Dropdown
            label={t('forestEcoregion.label')}
            placeholder={t('dropdownPlaceholder')}
            search
            selection
            clearable
            fluid
            value={location.forestEcoregion}
            options={projection.options.forestEcoregion.map(getDropdownOptions)}
            onChange={(e, { value }) =>
              setLocation({ ...location, forestEcoregion: value })
            }
          />
        )}
        {projection.options.heightLevel && (
          <Form.Dropdown
            label={t('heightLevel.label')}
            placeholder={t('dropdownPlaceholder')}
            search
            selection
            clearable
            fluid
            value={location.heightLevel}
            options={projection.options.heightLevel.map(getDropdownOptions)}
            onChange={(e, { value }) =>
              setLocation({ ...location, heightLevel: value })
            }
          />
        )}
        {projection.options.slope && projection.options.slope.length > 0 && (
          <Slope
            options={projection.options.slope}
            onChange={(e, { value }) =>
              setLocation({ ...location, slope: value })
            }
            value={location.slope}
          />
        )}
        <p>Result: {projection.target}</p>
      </Form>
    </Container>
  );
}

export default App;
