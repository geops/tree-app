import { info } from '@geops/tree-lib';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, Form, Label, Segment } from 'semantic-ui-react';

import Dropdown from './Dropdown';
import Input from './Input';
import styles from './LocationForm.module.css';
import { setFormLocation } from '../store/actions';

const forestTypeGroups = [
  'main',
  'special',
  'volatile',
  'riverside',
  'pioneer',
];

const getDropdownOptions = (type, lng, includeKey = false) => (key) => ({
  key,
  text: includeKey ? `${key} - ${info(type, key)[lng]}` : info(type, key)[lng],
  value: key,
});

function LocationForm() {
  const dispatch = useDispatch();
  const {
    formLocation,
    locationResult: { options },
    location,
    mapLocation,
    projectionMode,
  } = useSelector((state) => ({
    formLocation: state.formLocation,
    locationResult: state.locationResult,
    location: state.location,
    mapLocation: state.mapLocation,
    projectionMode: state.projectionMode,
  }));
  const { t, i18n } = useTranslation();
  const isDifferent = (field) => mapLocation[field] !== formLocation[field];

  const panels = [
    {
      key: 'forestType.group.label',
      title: { content: t('forestType.group.label') },
      content: {
        content: (
          <Dropdown
            options={forestTypeGroups.map((key) => ({
              key,
              text: t(`forestType.group.${key}`),
              value: key,
            }))}
            onChange={(e, { value: forestTypeGroup }) =>
              dispatch(setFormLocation({ forestTypeGroup }))
            }
            value={formLocation.forestTypeGroup}
          />
        ),
      },
    },
    {
      key: 'indicator.label',
      title: { content: t('indicator.label') },
      content: {
        content: options && (
          <Dropdown
            multiple
            options={options.indicator.map(
              getDropdownOptions('indicator', i18n.language),
            )}
            onChange={(e, { value: indicators }) =>
              dispatch(setFormLocation({ indicators }))
            }
            value={formLocation.indicators}
          />
        ),
      },
    },
    {
      key: 'forestType.treeHeight',
      title: { content: t('forestType.treeHeight') },
      content: {
        content: (
          <>
            <Segment>
              <Label attached="top">{t('forestType.treeLayerHeight')}</Label>
              <Input
                label={t('forestType.treeLayerHeightMin')}
                onChange={(e, { value: treeLayerHeightMin }) =>
                  dispatch(setFormLocation({ treeLayerHeightMin }))
                }
                type="number"
                value={formLocation.treeLayerHeightMin}
              />
              <Input
                label={t('forestType.treeLayerHeightMax')}
                onChange={(e, { value: treeLayerHeightMax }) =>
                  dispatch(setFormLocation({ treeLayerHeightMax }))
                }
                type="number"
                value={formLocation.treeLayerHeightMax}
              />
            </Segment>
            <Segment>
              <Label attached="top">{t('forestType.treeHeightMax')}</Label>
              <Input
                label={t('forestType.coniferTreeHeightMax')}
                onChange={(e, { value: coniferTreeHeightMax }) =>
                  dispatch(setFormLocation({ coniferTreeHeightMax }))
                }
                type="number"
                value={formLocation.coniferTreeHeightMax}
              />
              <Input
                label={t('forestType.deciduousTreeHeightMax')}
                onChange={(e, { value: deciduousTreeHeightMax }) =>
                  dispatch(setFormLocation({ deciduousTreeHeightMax }))
                }
                type="number"
                value={formLocation.deciduousTreeHeightMax}
              />
            </Segment>
          </>
        ),
      },
    },
  ];

  return (
    <Form className={styles.form}>
      {projectionMode === 'f' && options.forestEcoregion && (
        <Dropdown
          clearable={isDifferent('forestEcoregion')}
          label={t('forestEcoregion.label')}
          options={options.forestEcoregion.map(
            getDropdownOptions('forestEcoregion', i18n.language),
          )}
          onChange={(e, { value: forestEcoregion }) =>
            dispatch(setFormLocation({ forestEcoregion }))
          }
          value={location.forestEcoregion}
        />
      )}
      {projectionMode === 'f' && options.altitudinalZone && (
        <Dropdown
          clearable={isDifferent('altitudinalZone')}
          label={t('altitudinalZone.label')}
          options={options.altitudinalZone.map(
            getDropdownOptions('altitudinalZone', i18n.language),
          )}
          onChange={(e, { value: altitudinalZone }) =>
            dispatch(setFormLocation({ altitudinalZone }))
          }
          value={location.altitudinalZone}
        />
      )}
      <Accordion fluid panels={panels} styled />
    </Form>
  );
}

export default LocationForm;
