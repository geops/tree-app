/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import { translate } from '@geops/tree-lib';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'semantic-ui-react';

import ChoiceButton from './ChoiceButton';
import Dropdown from './Dropdown';
import { setFormLocation } from '../store/actions';
import styles from './ProjectionForm.module.css';

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
  const { location, projectionMode, projectionOptions } = useSelector(
    state => ({
      location: state.location,
      projectionMode: state.projectionMode,
      projectionOptions: state.projectionOptions,
    }),
  );
  const setLocation = (key, value) =>
    dispatch(setFormLocation({ [key]: value }));

  const { t, i18n } = useTranslation();

  // Note: remember to keep formLocationFields in reducers.js updated.
  return (
    <Form className={styles.form}>
      {projectionOptions.forestType && (
        <Form.Field>
          <label>{t('forestType.label')}</label>
          <Dropdown
            className={styles.forestType}
            disabled={projectionMode === 'm'}
            search
            selection
            fluid
            clearable={projectionMode === 'f'}
            options={projectionOptions.forestType.map(
              getDropdownOptions('forestType', i18n.language, true),
            )}
            onChange={(e, { value }) => setLocation('forestType', value)}
            placeholder={
              projectionMode === 'map'
                ? t('forestType.hint')
                : t('dropdownPlaceholder')
            }
            value={location.forestType}
          />
        </Form.Field>
      )}
      {projectionMode === 'f' && projectionOptions.forestEcoregion && (
        <Form.Field>
          <label>{t('forestEcoregion.label')}</label>
          <Dropdown
            placeholder={t('dropdownPlaceholder')}
            search
            selection
            clearable
            fluid
            options={projectionOptions.forestEcoregion.map(
              getDropdownOptions('forestEcoregion', i18n.language),
            )}
            onChange={(e, { value }) => setLocation('forestEcoregion', value)}
            value={location.forestEcoregion}
          />
        </Form.Field>
      )}
      {projectionMode === 'f' && projectionOptions.altitudinalZone && (
        <Form.Field>
          <label>{t('altitudinalZone.label')}</label>
          <Dropdown
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
            value={location.altitudinalZone}
          />
        </Form.Field>
      )}
      {projectionOptions.slope && projectionOptions.slope.length > 1 && (
        <ChoiceButton
          label={t('slope.label')}
          options={projectionOptions.slope.map(
            getButtonOptions('slope', i18n.language),
          )}
          onChange={(e, { value }) => setLocation('slope', value)}
          value={location.slope}
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
            value={location.additional}
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
            value={location.silverFirArea}
          />
        )}
      {projectionOptions.relief && projectionOptions.relief.length > 1 && (
        <ChoiceButton
          label={t('relief.label')}
          options={projectionOptions.relief.map(
            getButtonOptions('relief', i18n.language),
          )}
          onChange={(e, { value }) => setLocation('relief', value)}
          value={location.relief}
        />
      )}
      {projectionMode === 'f' &&
        projectionOptions.altitudinalZone &&
        projectionOptions.targetAltitudinalZone &&
        projectionOptions.targetAltitudinalZone.length >= 1 &&
        projectionOptions.altitudinalZone !== undefined && (
          <Form.Field>
            <label>{t('targetAltitudinalZone.label')}</label>
            <Dropdown
              placeholder={t('dropdownPlaceholder')}
              search
              selection
              clearable
              upward
              fluid
              options={projectionOptions.targetAltitudinalZone.map(
                getDropdownOptions('altitudinalZone', i18n.language),
              )}
              onChange={(e, { value }) => {
                setLocation('targetAltitudinalZone', value || undefined);
              }}
              value={
                location.targetAltitudinalZone ||
                projectionOptions.targetAltitudinalZone[0]
              }
            />
          </Form.Field>
        )}
    </Form>
  );
}

export default ProjectionForm;
