import { recommend, translate } from '@geops/tree-lib';
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Header, List, Tab, Form, Divider } from 'semantic-ui-react';

function Recommendation({
  forestTypeToday,
  forestTypeFuture,
  forest,
  todayFutureToggler,
}) {
  const { t, i18n } = useTranslation();
  const [future, setFuture] = useState(false);
  const recommendations = useMemo(
    () => recommend(forestTypeToday, forestTypeFuture, future),
    [forestTypeToday, forestTypeFuture, future],
  );

  return (
    <Tab.Pane>
      <Header>
        {`${forest} - ${translate(
          'forestType',
          forestTypeToday,
          i18n.language,
        )}`}
      </Header>
      {forest === ''}{' '}
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
  forestTypeToday: PropTypes.string.isRequired,
  forestTypeFuture: PropTypes.string.isRequired,
  forest: PropTypes.string.isRequired,
  todayFutureToggler: PropTypes.string.isRequired,
};

export default Recommendation;
