import { recommend, translate } from '@geops/tree-lib';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Header, List } from 'semantic-ui-react';

function RecommendationResult({ forestType }) {
  const { i18n } = useTranslation();
  const recommendations = useMemo(() => recommend(forestType), [forestType]);

  return (
    <Grid stackable columns={3}>
      <Grid.Column>
        <Header color="olive">Fördern</Header>
        <List>
          {recommendations.map(r => (
            <List.Item key={r}>
              {translate('treeType', r, i18n.language)}
            </List.Item>
          ))}
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
  );
}

RecommendationResult.propTypes = {
  forestType: PropTypes.string.isRequired,
};

export default RecommendationResult;
