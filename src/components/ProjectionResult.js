import { translate } from '@geops/tree-lib';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Divider, Form, Header, Tab } from 'semantic-ui-react';

import Recommendation from './Recommendation';

function ProjectionResult() {
  const { projectionLocation } = useSelector(state => ({
    projectionLocation: state.projectionLocation,
  }));
  const { t, i18n } = useTranslation();

  const panes = [
    {
      menuItem: t('tab.scenario1'),
      render: () => <Tab.Pane>Coming soon...</Tab.Pane>,
    },
    {
      menuItem: t('tab.scenario2'),
      render: () => (
        <Tab.Pane>
          <Header>
            {translate(
              'forestType',
              projectionLocation.forestType,
              i18n.language,
            )}
          </Header>
          <Form>
            <Form.Field>
              <Form.Radio label="bereits heute mögliche Baumarten" checked />
            </Form.Field>
            <Form.Field>
              <Form.Radio
                label="in Zukunft zusätzliche Baumarten"
                checked={false}
              />
            </Form.Field>
          </Form>
          <Divider hidden />
          <Recommendation forestType={projectionLocation.forestType} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: t('tab.scenario3'),
      render: () => <Tab.Pane>Coming soon...</Tab.Pane>,
    },
  ];

  return (
    <>
      {projectionLocation.forestType && (
        <>
          <Divider horizontal>
            <Header color="olive">{t('app.result')}</Header>
          </Divider>
          <Tab panes={panes} defaultActiveIndex={1} />
        </>
      )}
    </>
  );
}

export default ProjectionResult;
