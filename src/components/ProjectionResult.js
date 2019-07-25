import { translate } from '@geops/tree-lib';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Divider, Form, Header, Tab } from 'semantic-ui-react';

import Recommendation from './Recommendation';

function ProjectionResult() {
  const { projectionLocation, location } = useSelector(state => ({
    projectionLocation: state.projectionLocation,
    location: state.location,
  }));
  const { t, i18n } = useTranslation();

  const [future, setFuture] = useState(false);

  const panes = [
    {
      menuItem: t('tab.scenario1'),
      render: () => (
        <Tab.Pane>
          {' '}
          <Header>
            {`${projectionLocation.forestType} - ${translate(
              'forestType',
              projectionLocation.forestType,
              i18n.language,
            )}`}
          </Header>
          <Divider hidden />
          <Recommendation
            forestTypeToday={location.forestType}
            forestTypeFuture={projectionLocation.forestType}
            future={future}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: t('tab.scenario2'),
      render: () => (
        <Tab.Pane>
          <Header>
            {`${projectionLocation.forestType} - ${translate(
              'forestType',
              projectionLocation.forestType,
              i18n.language,
            )}`}
          </Header>
          <Form>
            <Form.Field>
              <Form.Radio
                label="bereits heute mögliche Baumarten"
                name="radioGroup"
                checked={future === false}
                onChange={() => setFuture(false)}
              />
            </Form.Field>
            <Form.Field>
              <Form.Radio
                label="in Zukunft zusätzliche Baumarten"
                name="radioGroup"
                checked={future === true}
                onChange={() => setFuture(true)}
              />
            </Form.Field>
          </Form>
          <Divider hidden />
          <Recommendation
            forestTypeToday={location.forestType}
            forestTypeFuture={projectionLocation.forestType}
            future={future}
          />
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
          <Tab
            panes={panes}
            defaultActiveIndex={1}
            onTabChange={(e, data) =>
              console.log(data.panes[data.activeIndex].menuItem)
            }
          />
        </>
      )}
    </>
  );
}

export default ProjectionResult;
