import { list, translate } from '@geops/tree-lib';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Header, Tab } from 'semantic-ui-react';

import { ReactComponent as InfoIcon } from '../icons/info.svg';
import styles from './Recommendation.module.css';

function ProjectionTab({ forestType }) {
  const treeTypes = useMemo(() => list(forestType), [forestType]);
  const { i18n, t } = useTranslation();
  return (
    <Tab.Pane>
      <Grid columns={3} padded verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={1}>
            <InfoIcon fill="white" className={styles.infoIcon} />
          </Grid.Column>
          <Grid.Column width={7}>
            <Header inverted>{t('projection.treeTypesOne')}</Header>
          </Grid.Column>
          <Grid.Column width={8}>
            {treeTypes.one
              .map(tt => translate('treeType', tt, i18n.language))
              .join(' ')}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={1}>
            <InfoIcon fill="white" className={styles.infoIcon} />
          </Grid.Column>
          <Grid.Column width={7}>
            <Header inverted>{t('projection.treeTypesTwo')}</Header>
          </Grid.Column>
          <Grid.Column width={8}>
            {treeTypes.two
              .map(tt => translate('treeType', tt, i18n.language))
              .join(' ')}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={1}>
            <InfoIcon fill="white" className={styles.infoIcon} />
          </Grid.Column>
          <Grid.Column width={7}>
            <Header inverted>{t('projection.treeTypesThree')}</Header>
          </Grid.Column>
          <Grid.Column width={8}>
            {treeTypes.three
              .map(tt => translate('treeType', tt, i18n.language))
              .join(' ')}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Tab.Pane>
  );
}

ProjectionTab.propTypes = {
  forestType: PropTypes.string,
};

ProjectionTab.defaultProps = {
  forestType: '',
};

export default ProjectionTab;