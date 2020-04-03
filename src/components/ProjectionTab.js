import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Header, Tab } from 'semantic-ui-react';
import { list } from '../../lib/src';

import TreeTypeList from './TreeTypeList';

function ProjectionTab({ location }) {
  const [one, two, three] = useMemo(() => list(location), [location]);
  const { t } = useTranslation();
  return (
    <Tab.Pane>
      <Grid columns={2} padded verticalAlign="middle">
        <Grid.Row>
          <Grid.Column>
            <Header inverted>{t('projection.treeTypesOne')}</Header>
          </Grid.Column>
          <Grid.Column>
            <TreeTypeList codes={one} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header inverted>{t('projection.treeTypesTwo')}</Header>
          </Grid.Column>
          <Grid.Column>
            <TreeTypeList codes={two} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header inverted>{t('projection.treeTypesThree')}</Header>
          </Grid.Column>
          <Grid.Column>
            <TreeTypeList codes={three} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Tab.Pane>
  );
}

ProjectionTab.propTypes = {
  location: PropTypes.objectOf({}).isRequired,
};

export default ProjectionTab;
