import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Header, Tab } from 'semantic-ui-react';
// eslint-disable-next-line import/no-unresolved
import { list } from '@geops/tree-lib';

import TreeTypeList from './TreeTypeList';

import styles from './ProjectionTab.module.css';

function ProjectionTab({ location }) {
  const [one, two, three] = useMemo(() => list(location, true), [location]);
  const { t } = useTranslation();
  return (
    <Tab.Pane>
      <Grid columns={2} padded verticalAlign="middle">
        <Grid.Row>
          <Grid.Column>
            <Header inverted>{t('projection.treeTypesOne')}</Header>
          </Grid.Column>
          <Grid.Column>
            <TreeTypeList codes={one} className={styles.medium} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header inverted>{t('projection.treeTypesTwo')}</Header>
          </Grid.Column>
          <Grid.Column>
            <TreeTypeList codes={two} className={styles.medium} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header inverted>{t('projection.treeTypesThree')}</Header>
          </Grid.Column>
          <Grid.Column>
            <TreeTypeList codes={three} className={styles.medium} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Tab.Pane>
  );
}

ProjectionTab.propTypes = {
  location: PropTypes.objectOf({ forestType: PropTypes.string }).isRequired,
};

export default ProjectionTab;
