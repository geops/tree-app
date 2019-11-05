/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import { info } from '@geops/tree-lib';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Label } from 'semantic-ui-react';

import ChoiceButton from './ChoiceButton';
import Dropdown from './Dropdown';
import { setFormLocation } from '../store/actions';
import styles from './ProjectionForm.module.css';

const getButtonOptions = (type, lng) => key => ({
  key,
  label: info(type, key)[lng],
});
const getDropdownOptions = (type, lng, includeKey = false) => key => ({
  key,
  text: includeKey ? `${key} - ${info(type, key)[lng]}` : info(type, key)[lng],
  value: key,
});

function ProjectionForm() {
  const dispatch = useDispatch();
  const {
    location,
    mapLocation,
    formLocation,
    projectionMode,
    projectionResult: { options },
  } = useSelector(state => ({
    location: state.location,
    mapLocation: state.mapLocation,
    formLocation: state.formLocation,
    projectionMode: state.projectionMode,
    projectionResult: state.projectionResult,
  }));
  const [fieldActive, setFieldActive] = useState('');
  const activateField = field => setFieldActive(field);
  const deactivateField = () => setFieldActive('');

  const getValue = field =>
    options[field].includes(location[field]) ? location[field] : '';

  const isDifferent = field => mapLocation[field] !== formLocation[field];

  const setLocation = (key, value) => {
    setFieldActive('');
    dispatch(setFormLocation({ [key]: value }));
  };

  const { t, i18n } = useTranslation();

  // Note: remember to keep formLocationFields in reducers.js updated.
  return (
    <Form
      className={
        projectionMode === 'm' || fieldActive ? styles.formActive : styles.form
      }
    >
      {options.forestType && (
        <Form.Field>
          <label>{t('forestType.label')}</label>
          <Dropdown
            className={styles.forestType}
            clearable={projectionMode === 'f' && isDifferent('forestType')}
            options={options.forestType.map(
              getDropdownOptions('forestType', i18n.language, true),
            )}
            onChange={(e, { value }) => setLocation('forestType', value)}
            onBlur={deactivateField}
            onFocus={() => activateField('forestType')}
            placeholder={
              projectionMode === 'm'
                ? t('forestType.hint')
                : t('dropdown.placeholder')
            }
            value={getValue('forestType')}
          />
          {projectionMode === 'm' &&
            location.coordinate &&
            !location.forestType && (
              <Label pointing>
                {t('errorMessage.incompleteLocationInput')}
              </Label>
            )}
        </Form.Field>
      )}
      {projectionMode === 'f' && options.forestEcoregion && (
        <Form.Field>
          <label>{t('forestEcoregion.label')}</label>
          <Dropdown
            clearable={isDifferent('forestEcoregion')}
            options={options.forestEcoregion.map(
              getDropdownOptions('forestEcoregion', i18n.language),
            )}
            onChange={(e, { value }) => setLocation('forestEcoregion', value)}
            onBlur={deactivateField}
            onFocus={() => activateField('forestEcoregion')}
            value={getValue('forestEcoregion')}
          />
        </Form.Field>
      )}
      {projectionMode === 'f' && options.altitudinalZone && (
        <Form.Field>
          <label>{t('altitudinalZone.label')}</label>
          <Dropdown
            clearable={isDifferent('altitudinalZone')}
            options={options.altitudinalZone.map(
              getDropdownOptions('altitudinalZone', i18n.language),
            )}
            onChange={(e, { value }) => {
              setLocation('altitudinalZone', value || undefined);
            }}
            onBlur={deactivateField}
            onFocus={() => activateField('altitudinalZone')}
            value={getValue('altitudinalZone')}
          />
        </Form.Field>
      )}
      {options.slope && options.slope.length > 1 && (
        <ChoiceButton
          label={t('slope.label')}
          options={options.slope.map(getButtonOptions('slope', i18n.language))}
          onChange={(e, { value }) => setLocation('slope', value)}
          value={getValue('slope')}
        />
      )}
      {options.additional && options.additional.length > 1 && (
        <ChoiceButton
          label={t('additional.label')}
          options={options.additional.map(
            getButtonOptions('additional', i18n.language),
          )}
          onChange={(e, { value }) => setLocation('additional', value)}
          value={getValue('additional')}
        />
      )}
      {options.silverFirArea && options.silverFirArea.length > 1 && (
        <ChoiceButton
          label={t('silverFirArea.label')}
          options={options.silverFirArea.map(
            getButtonOptions('silverFirArea', i18n.language),
          )}
          onChange={(e, { value }) => setLocation('silverFirArea', value)}
          value={getValue('silverFirArea')}
        />
      )}
      {options.relief && options.relief.length > 1 && (
        <ChoiceButton
          label={t('relief.label')}
          options={options.relief.map(
            getButtonOptions('relief', i18n.language),
          )}
          onChange={(e, { value }) => setLocation('relief', value)}
          value={getValue('relief')}
        />
      )}
      {projectionMode === 'f' &&
        options.altitudinalZone &&
        options.targetAltitudinalZone &&
        options.targetAltitudinalZone.length >= 1 &&
        options.altitudinalZone !== undefined && (
          <Form.Field>
            <label>{t('targetAltitudinalZone.label')}</label>
            <Dropdown
              clearable={isDifferent('targetAltitudinalZone')}
              upward
              options={options.targetAltitudinalZone.map(
                getDropdownOptions('altitudinalZone', i18n.language),
              )}
              onChange={(e, { value }) => {
                setLocation('targetAltitudinalZone', value || undefined);
              }}
              onBlur={deactivateField}
              onFocus={() => activateField('targetAltitudinalZone')}
              value={
                location.targetAltitudinalZone ||
                options.targetAltitudinalZone[0]
              }
            />
          </Form.Field>
        )}
    </Form>
  );
}

export default ProjectionForm;
