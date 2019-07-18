import React from 'react';
import { useTranslation } from 'react-i18next';
import 'semantic-ui-css/semantic.min.css';
import { Divider, Grid, Header } from 'semantic-ui-react';

import Recommendation from './components/Recommendation';
import Ribbon from './components/Ribbon';

import Map from './components/Map';

function App() {
  const { t } = useTranslation();
  document.title = t('app.title');

  return (
    <Grid columns={2}>
      <Grid.Row style={{ paddingBottom: 0 }}>
        <Grid.Column>
          <Map />
        </Grid.Column>
        <Grid.Column>
          <Divider hidden />
          <Header size="huge" textAlign="center" color="#055418">
            {t('app.title')}
          </Header>
          <Divider hidden />
          <Recommendation />
          <Divider hidden />
          <Ribbon label={t('app.ribbon')} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default App;
