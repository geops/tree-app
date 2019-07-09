import { recommend, translate } from '@geops/tree-lib';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Header, List } from 'semantic-ui-react';

function Recommendation({ forestType }) {
  const { t, i18n } = useTranslation();
  const recommendations = useMemo(() => recommend(forestType), [forestType]);

  return (
    <Grid stackable>
      <Grid.Column>
        <Header>{t('app.recommendation')}</Header>
        <List>
          {recommendations.map(r => (
            <List.Item key={r}>
              {translate('treeType', r, i18n.language)}
            </List.Item>
          ))}
        </List>
      </Grid.Column>
    </Grid>
  );
}

Recommendation.propTypes = {
  forestType: PropTypes.string.isRequired,
};

export default Recommendation;
