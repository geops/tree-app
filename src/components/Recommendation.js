import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { project, translate } from '@geops/tree-lib';
import 'semantic-ui-css/semantic.min.css';
import { Button, Divider, Form, Header, Tab } from 'semantic-ui-react';

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
    // forestEcoregion: '1',
    // altitudinalZone: '9',
    // forestType: '60*',
  });
  const [targetAltitudinalZone, setTargetAltitudinalZone] = useState();
  const projection = useMemo(() => project(location, targetAltitudinalZone), [
    location,
    targetAltitudinalZone,
  ]);

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
            {translate('forestType', projection.forestType, i18n.language)}
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
          <RecommendationResult forestType={projection.forestType} />
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
        <Form.Group>
          <Button
            content="Karte"
            icon="point"
            label={{
              as: 'a',
              basic: true,
              pointing: 'right',
              content: "622'749 / 215'049",
            }}
            labelPosition="left"
          />
          <Button active icon="edit" content="Manual" />
        </Form.Group>
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
        {projection.options.altitudinalZone && (
          <Form.Dropdown
            label={t('altitudinalZone.label')}
            placeholder={t('dropdownPlaceholder')}
            search
            selection
            clearable
            fluid
            value={location.altitudinalZone}
            options={projection.options.altitudinalZone.map(
              getDropdownOptions('altitudinalZone', i18n.language),
            )}
            onChange={(e, { value }) => {
              setLocation({ ...location, altitudinalZone: value || undefined });
            }}
          />
        )}

        {projection.options.slope && projection.options.slope.length > 1 && (
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
          projection.options.additional.length > 1 && (
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
        {projection.options.silverFirArea &&
          projection.options.silverFirArea.length > 1 && (
            <ChoiceButton
              label={t('silverFirArea.label')}
              options={projection.options.silverFirArea.map(
                getButtonOptions('silverFirArea', i18n.language),
              )}
              onChange={(e, { value }) =>
                setLocation({ ...location, silverFirArea: value })
              }
              value={location.silverFirArea}
            />
          )}
        {projection.options.relief && projection.options.relief.length > 1 && (
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
        {projection.options.altitudinalZone &&
          projection.options.targetAltitudinalZone &&
          projection.options.targetAltitudinalZone.length >= 1 &&
          projection.options.altitudinalZone !== undefined && (
            <Form.Dropdown
              label={t('targetAltitudinalZone.label')}
              placeholder={t('dropdownPlaceholder')}
              search
              selection
              clearable
              fluid
              value={
                targetAltitudinalZone ||
                projection.options.targetAltitudinalZone[0]
              }
              options={projection.options.targetAltitudinalZone.map(
                getDropdownOptions('altitudinalZone', i18n.language),
              )}
              onChange={(e, { value }) => {
                setTargetAltitudinalZone(value || undefined);
              }}
            />
          )}
      </Form>
      {projection.forestType && (
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
