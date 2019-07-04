import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { project } from '@geops/tree-lib';
import 'semantic-ui-css/semantic.min.css';
import {
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Label,
  List,
  Tab,
} from 'semantic-ui-react';

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
    // slope: '<70',
  });
  const projection = useMemo(() => project(location, i18n.language), [
    location,
    i18n.language,
  ]);
  document.title = t('app.title');

  const panes = [
    {
      menuItem: t('tab.scenario1'),
      render: () => <Tab.Pane>Coming soon...</Tab.Pane>,
    },
    {
      menuItem: t('tab.scenario2'),
      render: () => (
        <Tab.Pane>
          <Header>
            {projection.target}
            <Header.Subheader>
              zukünftiger Standorttyp unter Annahme der Änderung um eine
              Höhenstufe
            </Header.Subheader>
          </Header>
          <Form>
            <Form.Field>
              <Form.Radio label="bereits heute mögliche Baumarten" checked />
            </Form.Field>
            <Form.Field>
              <Form.Radio
                label="in Zukunft zusätzliche Baumarten"
                checked={false}
              />
            </Form.Field>
          </Form>
          <Divider hidden />
          <Grid stackable columns={3}>
            <Grid.Column>
              <Header color="olive">Fördern</Header>
              <List>
                <List.Item>Spitzahorn</List.Item>
                <List.Item>Bergahorn</List.Item>
                <List.Item>Buche</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column>
              <Header color="grey">Mitnehmen</Header>
              <List>
                <List.Item>Spitzahorn</List.Item>
                <List.Item>Bergahorn</List.Item>
                <List.Item>Buche</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column>
              <Header color="red">Reduzieren</Header>
            </Grid.Column>
          </Grid>
        </Tab.Pane>
      ),
    },
    {
      menuItem: t('tab.scenario3'),
      render: () => <Tab.Pane>Coming soon...</Tab.Pane>,
    },
  ];

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
          clearable
          fluid
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
      </Form>
      {projection.target && (
        <>
          <Divider horizontal>
            <Header color="olive">{t('app.result')}</Header>
          </Divider>
          <Tab panes={panes} defaultActiveIndex={1} />
        </>
      )}
      <Divider hidden />
    </Container>
  );
}

export default App;
