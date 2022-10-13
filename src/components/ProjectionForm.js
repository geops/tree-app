/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Message, Segment } from 'semantic-ui-react';
import { info, utils } from '@geops/tree-lib';

import Button from './Button';
import ChoiceButton from './ChoiceButton';
import Dropdown from './Dropdown';
import { setFormLocation, setForestTypeDescription } from '../store/actions';

import styles from './ProjectionForm.module.css';

const { getMapping } = utils();
const capitalize = (text) => text[0].toUpperCase() + text.slice(1);
const getButtonOptions = (type, lng) => (key) => ({
  key,
  label: info(type, key)[lng],
});
const getDropdownOptions =
  (type, lng, dispatch, includeKey = false) =>
  (key) => ({
    key,
    title: `${key} -${info(type, key)[lng]}`,
    content: dispatch ? (
      <div className={styles.option}>
        <Button
          active
          compact
          icon="info"
          onClick={() => dispatch(setForestTypeDescription(key))}
        />
        <span className={styles.optionLabel}>
          <span>{key}</span>
          <span>-</span>
          <span>{info(type, key)[lng]}</span>
        </span>
      </div>
    ) : (
      info(type, key)[lng]
    ),
    text: includeKey
      ? `${key} - ${info(type, key)[lng]}`
      : info(type, key)[lng],
    value: key,
  });

function ProjectionForm() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const {
    location,
    mapLocation,
    formLocation,
    projectionMode,
    projectionResult,
    activeProfile,
  } = useSelector((state) => ({
    location: state.location,
    mapLocation: state.mapLocation,
    formLocation: state.formLocation,
    projectionMode: state.projectionMode,
    projectionResult: state.projectionResult,
    activeProfile: state.activeProfile,
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
    } else if (options[field]?.includes(location[name])) {
      value = location[name];
    } else if (options[field]?.includes('unknown')) {
      value = 'unknown';
    }
    return value;
  };

  const isDifferent = (field) => mapLocation[field] !== formLocation[field];

  const setLocation = (key, value) => {
    setFieldActive('');
    dispatch(setFormLocation({ [key]: value }));
  };

  const formActive = projectionMode === 'm' || fieldActive;

  const cantonalTransitionForestTypes = useMemo(() => {
    try {
      return getMapping('transition', activeProfile)[
        `${location.forestType}(${location.transitionForestType})`
      ];
    } catch {
      return undefined;
    }
  }, [location, activeProfile]);

  const cantonalForestType = useMemo(() => {
    const ft = location.transition
      ? `${location.forestType}(${location.transitionForestType})`
      : location.forestType;

    return (
      location[`forestType_${activeProfile}`] !== ft &&
      location[`forestType_${activeProfile}`]
    );
  }, [location, activeProfile]);

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
      {cantonalForestType ? (
        <div className={styles.cantonalForestTypes}>
          <label className={styles.cantonalForestTypesLabel}>
            {t('forestType.cantonalForestType')}
          </label>
          <p>{cantonalForestType}</p>
        </div>
      ) : null}
      {options.forestType ? (
        <>
          <Dropdown
            className={styles.forestType}
            clearable
            data-cypress="projectionFormForestType"
            label={t('forestType.label')}
            options={options.forestType.map(
              getDropdownOptions('forestType', i18n.language, dispatch, true),
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
      {location.transition &&
        (options.transitionForestType || options.forestType) && (
          <Segment>
            <Dropdown
              className={styles.forestType}
              data-cypress="projectionFormTransitionForestType"
              clearable={!!formLocation.transitionForestType}
              label={t('forestType.transition')}
              options={(options.transitionForestType || options.forestType).map(
                getDropdownOptions('forestType', i18n.language, dispatch, true),
              )}
              onChange={(e, { value }) =>
                setLocation('transitionForestType', value)
              }
              onBlur={deactivateField}
              onFocus={() => activateField('transitionForestType')}
              placeholder={t('dropdown.placeholder')}
              search
              value={getValue('transitionForestType')}
            />
            <Dropdown
              clearable={!!formLocation.transitionAltitudinalZone}
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
              value={getValue('altitudinalZone', { transition: true })}
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
      {cantonalTransitionForestTypes?.length && (
        <>
          <label className={styles.cantonalForestTypesLabel}>
            {t('forestType.cantonalTransitionForestTypes')}
          </label>
          {cantonalTransitionForestTypes.map((cft) => {
            const cftInfo = info('forestType', cft, activeProfile);
            return (
              <div
                className={styles.cantonalForestTypes}
                key={`cantonal-ft-${cft}`}
              >
                <Button
                  active
                  compact
                  icon="info"
                  onClick={() => dispatch(setForestTypeDescription(cft))}
                />
                {cft}
                {cftInfo[i18n.language] ? ` - ${cftInfo[i18n.language]}` : ''}
              </div>
            );
          })}
        </>
      )}
    </Form>
  );
}

export default ProjectionForm;
