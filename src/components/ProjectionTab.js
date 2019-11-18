import { list } from '@geops/tree-lib';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Header, Tab } from 'semantic-ui-react';

import TreeTypeList from './TreeTypeList';

function ProjectionTab({ forestType }) {
  const treeTypes = useMemo(() => list(forestType), [forestType]);
  const { t } = useTranslation();
  return (
    <Tab.Pane>
      <Grid columns={2} padded verticalAlign="middle">
        <Grid.Row>
          <Grid.Column>
            <Header inverted>{t('projection.treeTypesOne')}</Header>
          </Grid.Column>
          <Grid.Column>
            <TreeTypeList codes={treeTypes[0]} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header inverted>{t('projection.treeTypesTwo')}</Header>
          </Grid.Column>
          <Grid.Column>
            <TreeTypeList codes={treeTypes[1]} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header inverted>{t('projection.treeTypesThree')}</Header>
          </Grid.Column>
          <Grid.Column>
            <TreeTypeList codes={treeTypes[2]} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Tab.Pane>
  );
}

ProjectionTab.propTypes = {
  forestType: PropTypes.string.isRequired,
};

export default ProjectionTab;
