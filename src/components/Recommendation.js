import { recommend, translate } from '@geops/tree-lib';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Header, List } from 'semantic-ui-react';

function Recommendation({ forestTypeToday, forestTypeFuture, future }) {
  const { i18n } = useTranslation();
  const recommendations = useMemo(
    () => recommend(forestTypeToday, forestTypeFuture, future),
    [forestTypeToday, forestTypeFuture, future],
  );

  return (
    <Grid stackable columns={3}>
      <Grid.Column>
        <Header color="olive">Fördern</Header>
        <List>
          {recommendations.positive.map(r => (
            <List.Item key={r}>
              {translate('treeType', r, i18n.language)}
            </List.Item>
          ))}
        </List>
      </Grid.Column>
      <Grid.Column>
        <Header color="grey">Mitnehmen</Header>
        <List>
          {recommendations.neutral.map(r => (
            <List.Item key={r}>
              {translate('treeType', r, i18n.language)}
            </List.Item>
          ))}
        </List>
      </Grid.Column>
      <Grid.Column>
        <Header color="red">Reduzieren</Header>
        <List>
          {recommendations.negative.map(r => (
            <List.Item key={r}>
              {translate('treeType', r, i18n.language)}
            </List.Item>
          ))}
        </List>
      </Grid.Column>
      <Grid.Column>
        <Header color="green">Achtung</Header>
        <List>
          {[] ||
            recommendations.attention.map(r => (
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
  forestTypeToday: PropTypes.string.isRequired,
  forestTypeFuture: PropTypes.string.isRequired,
  future: PropTypes.bool.isRequired,
};

export default Recommendation;
