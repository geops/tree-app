import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, Form, Label, Segment } from 'semantic-ui-react';
import { info } from '@geops/tree-lib/src';

import Checkbox from './Checkbox';
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
      key: 'forestType.group',
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
      key: 'forestType.treeType',
      title: { content: t('forestType.treeType') },
      content: {
        content: options && options.treeType && (
          <Dropdown
            multiple
            options={options.treeType.map(
              getDropdownOptions('treeType', i18n.language),
            )}
            onChange={(e, { value: treeTypes }) =>
              dispatch(setFormLocation({ treeTypes }))
            }
            value={formLocation.treeTypes}
          />
        ),
      },
    },
    {
      key: 'indicator',
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
    {
      key: 'forestType.carbonate',
      title: { content: t('forestType.carbonate.label') },
      content: {
        content: (
          <>
            <Checkbox
              label={t('forestType.carbonate.fine')}
              onChange={(e, { checked: carbonateFine }) =>
                dispatch(setFormLocation({ carbonateFine }))
              }
              value={location.carbonateFine}
            />
            <Checkbox
              label={t('forestType.carbonate.rock')}
              onChange={(e, { checked: carbonateRock }) =>
                dispatch(setFormLocation({ carbonateRock }))
              }
              value={location.carbonateRock}
            />
          </>
        ),
      },
    },
    {
      key: 'forestType.geomorphologyReliefType',
      title: {
        content: `${t('forestType.geomorphology.label')} & ${t(
          'forestType.reliefType.label',
        )}`,
      },
      content: {
        content: (
          <>
            <Segment>
              <Label attached="top">
                {t('forestType.geomorphology.label')}
              </Label>
              <Checkbox
                label={t('forestType.geomorphology.rockBand')}
                onChange={(e, { checked: geomorphologyRockBand }) =>
                  dispatch(setFormLocation({ geomorphologyRockBand }))
                }
                value={location.geomorphologyRockBand}
              />
              <Checkbox
                label={t('forestType.geomorphology.blockyRockyStrong')}
                onChange={(e, { checked: geomorphologyBlockyRockyStrong }) =>
                  dispatch(setFormLocation({ geomorphologyBlockyRockyStrong }))
                }
                value={location.geomorphologyBlockyRockyStrong}
              />
              <Checkbox
                label={t('forestType.geomorphology.blockyRockyLittle')}
                onChange={(e, { checked: geomorphologyBlockyRockyLittle }) =>
                  dispatch(setFormLocation({ geomorphologyBlockyRockyLittle }))
                }
                value={location.geomorphologyBlockyRockyLittle}
              />
              <Checkbox
                label={t('forestType.geomorphology.limestonePavement')}
                onChange={(e, { checked: geomorphologyLimestonePavement }) =>
                  dispatch(setFormLocation({ geomorphologyLimestonePavement }))
                }
                value={location.geomorphologyLimestonePavement}
              />
              <Checkbox
                label={t('forestType.geomorphology.rocksModeratelyMoved')}
                onChange={(e, { checked: geomorphologyRocksModeratelyMoved }) =>
                  dispatch(
                    setFormLocation({ geomorphologyRocksModeratelyMoved }),
                  )
                }
                value={location.geomorphologyRocksModeratelyMoved}
              />
              <Checkbox
                label={t('forestType.geomorphology.rocksStronglyMoved')}
                onChange={(e, { checked: geomorphologyRocksStronglyMoved }) =>
                  dispatch(setFormLocation({ geomorphologyRocksStronglyMoved }))
                }
                value={location.geomorphologyRocksStronglyMoved}
              />
              <Checkbox
                label={t('forestType.geomorphology.rocksStabilised')}
                onChange={(e, { checked: geomorphologyRocksStabilised }) =>
                  dispatch(setFormLocation({ geomorphologyRocksStabilised }))
                }
                value={location.geomorphologyRocksStabilised}
              />
            </Segment>
            <Segment>
              <Label attached="top">{t('forestType.reliefType.label')}</Label>
              <Checkbox
                label={t('forestType.reliefType.centralSlope')}
                onChange={(e, { checked: reliefTypeCentralSlope }) =>
                  dispatch(setFormLocation({ reliefTypeCentralSlope }))
                }
                value={location.reliefTypeCentralSlope}
              />
              <Checkbox
                label={t('forestType.reliefType.hollow')}
                onChange={(e, { checked: reliefTypeHollow }) =>
                  dispatch(setFormLocation({ reliefTypeHollow }))
                }
                value={location.reliefTypeHollow}
              />
              <Checkbox
                label={t('forestType.reliefType.dome')}
                onChange={(e, { checked: reliefTypeDome }) =>
                  dispatch(setFormLocation({ reliefTypeDome }))
                }
                value={location.reliefTypeDome}
              />
              <Checkbox
                label={t('forestType.reliefType.plateau')}
                onChange={(e, { checked: reliefTypePlateau }) =>
                  dispatch(setFormLocation({ reliefTypePlateau }))
                }
                value={location.reliefTypePlateau}
              />
              <Checkbox
                label={t('forestType.reliefType.steep')}
                onChange={(e, { checked: reliefTypeSteep }) =>
                  dispatch(setFormLocation({ reliefTypeSteep }))
                }
                value={location.reliefTypeSteep}
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
