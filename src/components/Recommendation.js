import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { project, translate } from '@geops/tree-lib';
import 'semantic-ui-css/semantic.min.css';
import { Divider, Form, Header, Tab } from 'semantic-ui-react';

import ChoiceButton from './ChoiceButton';
import RecommendationResult from './RecommendationResult';

const getButtonOptions = (type, language) => key => ({
  key,
  label: translate(type, key, language),
});
const getDropdownOptions = (type, language, includeKey = false) => key => ({
  key,
  text: includeKey
    ? `${key} - ${translate(type, key, language)}`
    : translate(type, key, language),
  value: key,
});

function Recommendation() {
  const { t, i18n } = useTranslation();
  const [location, setLocation] = useState({
    // forestType: '60*',
    // forestEcoregion: '1',
    // heightLevel: 'SA',
    // slope: '<70',
    // additional: 'unknown',
    // tannenareal: 'unknown',
    // relief: 'unknown',
  });
  const projection = useMemo(() => project(location), [location]);
  document.title = t('app.title');

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
            {translate('forestType', projection.target, i18n.language)}
            <Header.Subheader>
              zukünftiger Standorttyp unter Annahme der Änderung um eine
              Höhenstufe
            </Header.Subheader>
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
          <RecommendationResult forestType={projection.target} />
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
      <Form>
        <Form.Dropdown
          label={t('forestType.label')}
          search
          selection
          fluid
          clearable
          value={location.forestType}
          options={projection.options.forestType.map(
            getDropdownOptions('forestType', i18n.language, true),
          )}
          onChange={(e, { value }) =>
            setLocation({ ...location, forestType: value })
          }
        />
        {projection.options.forestEcoregion && (
          <Form.Dropdown
            label={t('forestEcoregion.label')}
            placeholder={t('dropdownPlaceholder')}
            search
            selection
            clearable
            fluid
            value={location.forestEcoregion}
            options={projection.options.forestEcoregion.map(
              getDropdownOptions('forestEcoregion', i18n.language),
            )}
            onChange={(e, { value }) =>
              setLocation({ ...location, forestEcoregion: value })
            }
          />
        )}
        {projection.options.heightLevel && (
          <Form.Dropdown
            label={t('heightLevel.label')}
            placeholder={t('dropdownPlaceholder')}
            search
            selection
            clearable
            fluid
            value={location.heightLevel}
            options={projection.options.heightLevel.map(
              getDropdownOptions('heightLevel', i18n.language),
            )}
            onChange={(e, { value }) =>
              setLocation({ ...location, heightLevel: value })
            }
          />
        )}
        {projection.options.slope && projection.options.slope.length > 0 && (
          <ChoiceButton
            label={t('slope.label')}
            options={projection.options.slope.map(
              getButtonOptions('slope', i18n.language),
            )}
            onChange={(e, { value }) =>
              setLocation({ ...location, slope: value })
            }
            value={location.slope}
          />
        )}
        {projection.options.additional &&
          projection.options.additional.length > 0 && (
            <ChoiceButton
              label={t('additional.label')}
              options={projection.options.additional.map(
                getButtonOptions('additional', i18n.language),
              )}
              onChange={(e, { value }) =>
                setLocation({ ...location, additional: value })
              }
              value={location.additional}
            />
          )}
        {projection.options.tannenareal &&
          projection.options.tannenareal.length > 0 && (
            <ChoiceButton
              label={t('tannenareal.label')}
              options={projection.options.tannenareal.map(
                getButtonOptions('tannenareal', i18n.language),
              )}
              onChange={(e, { value }) =>
                setLocation({ ...location, tannenareal: value })
              }
              value={location.tannenareal}
            />
          )}
        {projection.options.relief && projection.options.relief.length > 0 && (
          <ChoiceButton
            label={t('relief.label')}
            options={projection.options.relief.map(
              getButtonOptions('relief', i18n.language),
            )}
            onChange={(e, { value }) =>
              setLocation({ ...location, relief: value })
            }
            value={location.relief}
          />
        )}
      </Form>
      {projection.target && (
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

export default Recommendation;
