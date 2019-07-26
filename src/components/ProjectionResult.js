import { translate } from '@geops/tree-lib';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Divider, Form, Header, Tab } from 'semantic-ui-react';

import { setRecommendationMode } from '../store/actions';
import Recommendation from './Recommendation';

function ProjectionResult() {
  const dispatch = useDispatch();
  const { projectionLocation, location } = useSelector(state => ({
    projectionLocation: state.projectionLocation,
    location: state.location,
  }));
  const { t, i18n } = useTranslation();

  const [future, setFuture] = useState(false);

  const panes = [
    {
      menuItem: t('recommendationMode.today'),
      recommendationMode: 'today',
      render: () => (
        <Tab.Pane>
          {' '}
          <Header>
            {`${location.forestType} - ${translate(
              'forestType',
              location.forestType,
              i18n.language,
            )}`}
          </Header>
          <Divider hidden />
          <Recommendation forestTypeToday={location.forestType} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: t('recommendationMode.moderate'),
      recommendationMode: 'moderate',
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
      menuItem: t('recommendationMode.extreme'),
      recommendationMode: 'extreme',
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
            onTabChange={(e, data) => {
              const { recommendationMode } = data.panes[data.activeIndex];
              dispatch(setRecommendationMode(recommendationMode));
            }}
          />
        </>
      )}
    </>
  );
}

export default ProjectionResult;
