/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Message, Segment } from 'semantic-ui-react';
// eslint-disable-next-line import/no-unresolved
import { info } from 'lib/src';

import ChoiceButton from './ChoiceButton';
import Dropdown from './Dropdown';
import ForestTypeModal from './ForestTypeModal';
import { setFormLocation } from '../store/actions';
import styles from './ProjectionForm.module.css';

const capitalize = (text) => text[0].toUpperCase() + text.slice(1);
const getButtonOptions = (type, lng) => (key) => ({
  key,
  label: info(type, key)[lng],
});
const getDropdownOptions = (type, lng, includeKey = false) => (key) => ({
  key,
  content: includeKey ? (
    <>
      <ForestTypeModal data={info(type, key)} />
      {key} - {info(type, key)[lng]}
    </>
  ) : (
    info(type, key)[lng]
  ),
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
    projectionResult,
  } = useSelector((state) => ({
    location: state.location,
    mapLocation: state.mapLocation,
    formLocation: state.formLocation,
    projectionMode: state.projectionMode,
    projectionResult: state.projectionResult,
  }));
  const options =
    projectionMode === 'm'
      ? projectionResult.extreme.options
      : projectionResult.form.options;

  const [fieldActive, setFieldActive] = useState('');
  const activateField = (field) => setFieldActive(field);
  const deactivateField = () => setFieldActive('');

  const getValue = (field, { first, transition } = {}) => {
    const name = transition ? `transition${capitalize(field)}` : field;
    let value = '';
    if (first && options[field] && !location[name]) {
      [value] = options[field];
    } else if (options[field].includes(location[name])) {
      value = location[name];
    } else if (options[field].includes('unknown')) {
      value = 'unknown';
    }
    return value;
  };

  const isDifferent = (field) => mapLocation[field] !== formLocation[field];

  const setLocation = (key, value) => {
    setFieldActive('');
    dispatch(setFormLocation({ [key]: value }));
  };

  const { t, i18n } = useTranslation();
  const formActive = projectionMode === 'm' || fieldActive;

  return (
    <Form className={formActive ? styles.formActive : styles.form}>
      {projectionMode === 'f' && options.forestEcoregion && (
        <Dropdown
          clearable={isDifferent('forestEcoregion')}
          data-cypress="projectionFormForestEcoregion"
          label={t('forestEcoregion.label')}
          options={options.forestEcoregion.map(
            getDropdownOptions('forestEcoregion', i18n.language),
          )}
          onChange={(e, { value }) => setLocation('forestEcoregion', value)}
          onBlur={deactivateField}
          onFocus={() => activateField('forestEcoregion')}
          value={getValue('forestEcoregion')}
        />
      )}
      {projectionMode === 'f' && options.altitudinalZone && (
        <Dropdown
          clearable={isDifferent('altitudinalZone')}
          data-cypress="projectionFormAltitudinalZone"
          label={t('altitudinalZone.label')}
          options={options.altitudinalZone.map(
            getDropdownOptions('altitudinalZone', i18n.language),
          )}
          onChange={(e, { value }) => setLocation('altitudinalZone', value)}
          onBlur={deactivateField}
          onFocus={() => activateField('altitudinalZone')}
          value={getValue('altitudinalZone')}
        />
      )}
      {options.forestType ? (
        <>
          <Dropdown
            className={styles.forestType}
            clearable
            data-cypress="projectionFormForestType"
            label={t('forestType.label')}
            options={options.forestType.map(
              getDropdownOptions('forestType', i18n.language, true),
            )}
            onChange={(e, { value }) => setLocation('forestType', value)}
            onBlur={deactivateField}
            onFocus={() => activateField('forestType')}
            placeholder={t('dropdown.placeholder')}
            search
            value={getValue('forestType')}
          />
          <ChoiceButton
            data-cypress="projectionFormTransition"
            label={t('projection.transition.label')}
            options={[false, true].map((key) => ({
              key: key.toString(),
              label: t(`projection.transition.${key}`),
            }))}
            onChange={(e, { value }) =>
              setLocation('transition', value === 'true')
            }
            value={(location.transition || false).toString()}
          />
        </>
      ) : (
        projectionMode === 'm' && (
          <Message className={styles.message} size="big">
            {(() => {
              if (!mapLocation.coordinate) {
                return t('projection.missingLocation');
              }
              return !mapLocation.altitudinalZone
                ? t('projection.missingLocationData')
                : t('projection.missingProjectionData');
            })()}
          </Message>
        )
      )}
      {location.transition && options.forestType && (
        <Segment>
          <Dropdown
            className={styles.forestType}
            data-cypress="projectionFormTransitionForestType"
            clearable
            label={t('forestType.transition')}
            options={options.forestType.map(
              getDropdownOptions('forestType', i18n.language, true),
            )}
            onChange={(e, { value }) =>
              setLocation('transitionForestType', value)
            }
            onBlur={deactivateField}
            onFocus={() => activateField('transitionForestType')}
            placeholder={t('dropdown.placeholder')}
            search
            value={getValue('forestType', { transition: true })}
          />
          <Dropdown
            clearable
            data-cypress="projectionFormTransitionAltitudinalZone"
            label={t('altitudinalZone.transition')}
            options={options.altitudinalZone.map(
              getDropdownOptions('altitudinalZone', i18n.language),
            )}
            onChange={(e, { value }) => {
              setLocation('transitionAltitudinalZone', value);
            }}
            onBlur={deactivateField}
            onFocus={() => activateField('transitionAltitudinalZone')}
            value={
              getValue('altitudinalZone', { transition: true }) ||
              getValue('altitudinalZone')
            }
          />
        </Segment>
      )}
      {options.slope && options.slope.length > 1 && (
        <ChoiceButton
          label={t('slope.label')}
          options={options.slope.map(getButtonOptions('slope', i18n.language))}
          onChange={(e, { value }) => setLocation('slope', value)}
          value={getValue('slope', { first: true })}
        />
      )}
      {options.additional && options.additional.length > 1 && (
        <ChoiceButton
          label={t('additional.label')}
          options={options.additional
            .sort()
            .map(getButtonOptions('additional', i18n.language))}
          onChange={(e, { value }) => setLocation('additional', value)}
          value={getValue('additional', { first: true })}
        />
      )}
      {projectionMode === 'f' &&
        options.silverFirArea &&
        options.silverFirArea.length > 1 && (
          <ChoiceButton
            label={t('silverFirArea.label')}
            options={options.silverFirArea
              .sort()
              .map(getButtonOptions('silverFirArea', i18n.language))}
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
        options.forestType &&
        options.targetAltitudinalZone &&
        options.targetAltitudinalZone.length >= 1 && (
          <Dropdown
            clearable={isDifferent('targetAltitudinalZone')}
            data-cypress="projectionFormTargetAltitudinalZone"
            label={t('targetAltitudinalZone.label')}
            options={options.targetAltitudinalZone.map(
              getDropdownOptions('altitudinalZone', i18n.language),
            )}
            onChange={(e, { value }) => {
              setLocation('targetAltitudinalZone', value || undefined);
            }}
            onBlur={deactivateField}
            onFocus={() => activateField('targetAltitudinalZone')}
            upward
            value={getValue('targetAltitudinalZone')}
          />
        )}
    </Form>
  );
}

export default ProjectionForm;
