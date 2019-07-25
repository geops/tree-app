import { translate } from '@geops/tree-lib';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'semantic-ui-react';

import ChoiceButton from './ChoiceButton';
import { setManualLocation } from '../store/actions';

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

function ProjectionForm() {
  const dispatch = useDispatch();
  const { manualLocation, projectionMode, projectionOptions } = useSelector(
    state => ({
      manualLocation: state.manualLocation,
      projectionMode: state.projectionMode,
      projectionOptions: state.projectionOptions,
    }),
  );
  const setLocation = (key, value) =>
    dispatch(setManualLocation({ ...manualLocation, [key]: value }));

  const { t, i18n } = useTranslation();

  return (
    <>
      <Form>
        {projectionMode === 'manual' && projectionOptions.forestType && (
          <Form.Dropdown
            label={t('forestType.label')}
            search
            selection
            fluid
            clearable
            options={projectionOptions.forestType.map(
              getDropdownOptions('forestType', i18n.language, true),
            )}
            onChange={(e, { value }) => setLocation('forestType', value)}
            value={manualLocation.forestType}
          />
        )}
        {projectionMode === 'manual' && projectionOptions.forestEcoregion && (
          <Form.Dropdown
            label={t('forestEcoregion.label')}
            placeholder={t('dropdownPlaceholder')}
            search
            selection
            clearable
            fluid
            options={projectionOptions.forestEcoregion.map(
              getDropdownOptions('forestEcoregion', i18n.language),
            )}
            onChange={(e, { value }) => setLocation('forestEcoregion', value)}
            value={manualLocation.forestEcoregion}
          />
        )}
        {projectionMode === 'manual' && projectionOptions.altitudinalZone && (
          <Form.Dropdown
            label={t('altitudinalZone.label')}
            placeholder={t('dropdownPlaceholder')}
            search
            selection
            clearable
            fluid
            options={projectionOptions.altitudinalZone.map(
              getDropdownOptions('altitudinalZone', i18n.language),
            )}
            onChange={(e, { value }) => {
              setLocation('altitudinalZone', value || undefined);
            }}
            value={manualLocation.altitudinalZone}
          />
        )}

        {projectionOptions.slope && projectionOptions.slope.length > 1 && (
          <ChoiceButton
            label={t('slope.label')}
            options={projectionOptions.slope.map(
              getButtonOptions('slope', i18n.language),
            )}
            onChange={(e, { value }) => setLocation('slope', value)}
            value={manualLocation.slope}
          />
        )}
        {projectionOptions.additional &&
          projectionOptions.additional.length > 1 && (
            <ChoiceButton
              label={t('additional.label')}
              options={projectionOptions.additional.map(
                getButtonOptions('additional', i18n.language),
              )}
              onChange={(e, { value }) => setLocation('additional', value)}
              value={manualLocation.additional}
            />
          )}
        {projectionOptions.silverFirArea &&
          projectionOptions.silverFirArea.length > 1 && (
            <ChoiceButton
              label={t('silverFirArea.label')}
              options={projectionOptions.silverFirArea.map(
                getButtonOptions('silverFirArea', i18n.language),
              )}
              onChange={(e, { value }) => setLocation('silverFirArea', value)}
              value={manualLocation.silverFirArea}
            />
          )}
        {projectionOptions.relief && projectionOptions.relief.length > 1 && (
          <ChoiceButton
            label={t('relief.label')}
            options={projectionOptions.relief.map(
              getButtonOptions('relief', i18n.language),
            )}
            onChange={(e, { value }) => setLocation('relief', value)}
            value={manualLocation.relief}
          />
        )}
        {projectionMode === 'manual' &&
          projectionOptions.altitudinalZone &&
          projectionOptions.targetAltitudinalZone &&
          projectionOptions.targetAltitudinalZone.length >= 1 &&
          projectionOptions.altitudinalZone !== undefined && (
            <Form.Dropdown
              label={t('targetAltitudinalZone.label')}
              placeholder={t('dropdownPlaceholder')}
              search
              selection
              clearable
              fluid
              options={projectionOptions.targetAltitudinalZone.map(
                getDropdownOptions('altitudinalZone', i18n.language),
              )}
              onChange={(e, { value }) => {
                setLocation('targetAltitudinalZone', value || undefined);
              }}
              value={
                manualLocation.targetAltitudinalZone ||
                projectionOptions.targetAltitudinalZone[0]
              }
            />
          )}
      </Form>
    </>
  );
}

export default ProjectionForm;
