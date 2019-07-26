import { recommend, translate } from '@geops/tree-lib';
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Grid, Header, List, Tab, Form, Divider } from 'semantic-ui-react';

function Recommendation({ todayFutureToggler }) {
  const { t, i18n } = useTranslation();
  const [future, setFuture] = useState(false);
  const { projectionLocation, location, recommendationMode } = useSelector(
    state => ({
      projectionLocation: state.projectionLocation,
      location: state.location,
      recommendationMode: state.recommendationMode,
    }),
  );
  const recommendations = useMemo(
    () => recommend(location.forestType, projectionLocation.forestType, future),
    [location.forestType, projectionLocation.forestType, future],
  );

  const forest =
    recommendationMode === 'today'
      ? location.forestType
      : projectionLocation.forestType;

  return (
    <Tab.Pane>
      <Header>
        {`${forest} - ${translate('forestType', forest, i18n.language)}`}
      </Header>
      {todayFutureToggler && (
        <Form>
          <Form.Field>
            <Form.Radio
              label={t('radioButtonLabel.today')}
              name="radioGroup"
              checked={future === false}
              onChange={() => setFuture(false)}
            />
          </Form.Field>
          <Form.Field>
            <Form.Radio
              label={t('radioButtonLabel.future')}
              name="radioGroup"
              checked={future === true}
              onChange={() => setFuture(true)}
            />
          </Form.Field>
        </Form>
      )}
      <Divider hidden />
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
    </Tab.Pane>
  );
}

Recommendation.propTypes = {
  todayFutureToggler: PropTypes.string.isRequired,
};

export default Recommendation;
