import intersection from 'lodash.intersection';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, Form, Header, Label, Segment } from 'semantic-ui-react';
// eslint-disable-next-line import/no-unresolved
import { info } from '@geops/tree-lib';

import Button from './Button';
import Checkbox from './Checkbox';
import Dropdown from './Dropdown';
import HelpModal from './HelpModal';
import Input from './Input';
import styles from './LocationForm.module.css';
import { setFormLocation } from '../store/actions';
import translation from '../i18n/resources/de/translation.json';

const filterFields = [
  'treeTypes',
  'indicators',
  'treeLayerHeightMin',
  'treeLayerHeightMax',
  'coniferTreeHeightMax',
  'deciduousTreeHeightMax',
  'carbonateFine',
  'carbonateRock',
  'geomorphologyRockBand',
  'geomorphologyBlockyRockyStrong',
  'geomorphologyBlockyRockyLittle',
  'geomorphologyLimestonePavement',
  'geomorphologyRocksModeratelyMoved',
  'geomorphologyRocksStronglyMoved',
  'geomorphologyRocksStabilised',
  'reliefTypeCentralSlope',
  'reliefTypeHollow',
  'reliefTypeDome',
  'reliefTypePlateau',
  'reliefTypeSteep',
  'aspects',
  'slopes',
  'forestEcoregion',
  'altitudinalZone',
  'groups',
];

const noLabel = (key) => key !== 'label' && key !== 'other';
const translationOptions = {
  aspect: Object.keys(translation.forestType.aspect).filter(noLabel).sort(),
  group: Object.keys(translation.forestType.group).filter(noLabel),
  slope: Object.keys(translation.forestType.slope).filter(noLabel).sort(),
};

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
  const lng = i18n.language;
  const isDifferent = (field) => mapLocation[field] !== formLocation[field];
  const getTranslatedOption = (category) => (key) => {
    return { key, text: t(`forestType.${category}.${key}`), value: key };
  };

  options.aspect = translationOptions.aspect.map(getTranslatedOption('aspect'));
  options.group = translationOptions.group.map(getTranslatedOption('group'));
  options.slope = translationOptions.slope.map(getTranslatedOption('slope'));

  const panels = [
    {
      key: 'forestType.treeType',
      title: { content: t('forestType.treeType.label') },
      content: {
        content: options && options.treeType && (
          <Dropdown
            multiple
            search
            placeholder={t('forestType.treeType.placeholder')}
            options={options.treeType.map(getDropdownOptions('treeType', lng))}
            onChange={(e, { value: treeTypes }) =>
              dispatch(setFormLocation({ treeTypes }))
            }
            value={formLocation.treeTypes || ''}
          />
        ),
      },
    },
    {
      key: 'forestType.indicator',
      title: { content: t('forestType.indicator.label') },
      content: {
        content: options && options.indicator && (
          <Dropdown
            multiple
            search
            placeholder={t('forestType.indicator.placeholder')}
            options={options.indicator.map(
              getDropdownOptions('indicator', lng),
            )}
            onChange={(e, { value: indicators }) =>
              dispatch(setFormLocation({ indicators }))
            }
            value={formLocation.indicators || ''}
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
            <Input
              label={`${t('forestType.coniferTreeHeightMax')} [m]`}
              onChange={(e, { value: coniferTreeHeightMax }) =>
                dispatch(setFormLocation({ coniferTreeHeightMax }))
              }
              type="number"
              value={formLocation.coniferTreeHeightMax || ''}
            />
            <Input
              label={`${t('forestType.deciduousTreeHeightMax')} [m]`}
              onChange={(e, { value: deciduousTreeHeightMax }) =>
                dispatch(setFormLocation({ deciduousTreeHeightMax }))
              }
              type="number"
              value={formLocation.deciduousTreeHeightMax || ''}
            />
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
              checked={formLocation.carbonateFine || false}
            />
            <Checkbox
              label={t('forestType.carbonate.rock')}
              onChange={(e, { checked: carbonateRock }) =>
                dispatch(setFormLocation({ carbonateRock }))
              }
              checked={formLocation.carbonateRock || false}
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
                checked={formLocation.geomorphologyRockBand || false}
              />
              <Checkbox
                label={t('forestType.geomorphology.blockyRockyStrong')}
                onChange={(e, { checked: geomorphologyBlockyRockyStrong }) =>
                  dispatch(setFormLocation({ geomorphologyBlockyRockyStrong }))
                }
                checked={formLocation.geomorphologyBlockyRockyStrong || false}
              />
              <Checkbox
                label={t('forestType.geomorphology.blockyRockyLittle')}
                onChange={(e, { checked: geomorphologyBlockyRockyLittle }) =>
                  dispatch(setFormLocation({ geomorphologyBlockyRockyLittle }))
                }
                checked={formLocation.geomorphologyBlockyRockyLittle || false}
              />
              <Checkbox
                label={t('forestType.geomorphology.limestonePavement')}
                onChange={(e, { checked: geomorphologyLimestonePavement }) =>
                  dispatch(setFormLocation({ geomorphologyLimestonePavement }))
                }
                checked={formLocation.geomorphologyLimestonePavement || false}
              />
              <Checkbox
                label={t('forestType.geomorphology.rocksModeratelyMoved')}
                onChange={(e, { checked: geomorphologyRocksModeratelyMoved }) =>
                  dispatch(
                    setFormLocation({ geomorphologyRocksModeratelyMoved }),
                  )
                }
                checked={
                  formLocation.geomorphologyRocksModeratelyMoved || false
                }
              />
              <Checkbox
                label={t('forestType.geomorphology.rocksStronglyMoved')}
                onChange={(e, { checked: geomorphologyRocksStronglyMoved }) =>
                  dispatch(setFormLocation({ geomorphologyRocksStronglyMoved }))
                }
                checked={formLocation.geomorphologyRocksStronglyMoved || false}
              />
              <Checkbox
                label={t('forestType.geomorphology.rocksStabilised')}
                onChange={(e, { checked: geomorphologyRocksStabilised }) =>
                  dispatch(setFormLocation({ geomorphologyRocksStabilised }))
                }
                checked={formLocation.geomorphologyRocksStabilised || false}
              />
            </Segment>
            <Segment>
              <Label attached="top">{t('forestType.reliefType.label')}</Label>
              <Checkbox
                label={t('forestType.reliefType.centralSlope')}
                onChange={(e, { checked: reliefTypeCentralSlope }) =>
                  dispatch(setFormLocation({ reliefTypeCentralSlope }))
                }
                checked={formLocation.reliefTypeCentralSlope || false}
              />
              <Checkbox
                label={t('forestType.reliefType.hollow')}
                onChange={(e, { checked: reliefTypeHollow }) =>
                  dispatch(setFormLocation({ reliefTypeHollow }))
                }
                checked={formLocation.reliefTypeHollow || false}
              />
              <Checkbox
                label={t('forestType.reliefType.dome')}
                onChange={(e, { checked: reliefTypeDome }) =>
                  dispatch(setFormLocation({ reliefTypeDome }))
                }
                checked={formLocation.reliefTypeDome || false}
              />
              <Checkbox
                label={t('forestType.reliefType.plateau')}
                onChange={(e, { checked: reliefTypePlateau }) =>
                  dispatch(setFormLocation({ reliefTypePlateau }))
                }
                checked={formLocation.reliefTypePlateau || false}
              />
              <Checkbox
                label={t('forestType.reliefType.steep')}
                onChange={(e, { checked: reliefTypeSteep }) =>
                  dispatch(setFormLocation({ reliefTypeSteep }))
                }
                checked={formLocation.reliefTypeSteep || false}
              />
            </Segment>
          </>
        ),
      },
    },
    {
      key: 'forestType.aspect',
      title: { content: t('forestType.aspect.label') },
      content: {
        content: (
          <Dropdown
            multiple
            search={false}
            options={options.aspect}
            onChange={(e, { value: aspects }) =>
              dispatch(setFormLocation({ aspects }))
            }
            value={formLocation.aspects || ''}
          />
        ),
      },
    },
    {
      key: 'forestType.slope',
      title: { content: t('forestType.slope.label') },
      content: {
        content: (
          <Dropdown
            multiple
            search={false}
            options={options.slope}
            onChange={(e, { value: slopes }) =>
              dispatch(setFormLocation({ slopes }))
            }
            value={formLocation.slopes || ''}
          />
        ),
      },
    },
    {
      key: 'forestType.group',
      title: { content: t('forestType.group.label') },
      content: {
        content: (
          <Dropdown
            multiple
            options={options.group}
            onChange={(e, { value: groups }) =>
              dispatch(setFormLocation({ groups }))
            }
            value={formLocation.groups || ''}
          />
        ),
      },
    },
  ];

  return (
    <Form className={styles.form}>
      {projectionMode === 'm' && (
        <>
          <Input
            disabled
            label={t('forestEcoregion.label')}
            value={
              location.forestEcoregion
                ? info('forestEcoregion', location.forestEcoregion)[lng]
                : '-'
            }
          />
          <Input
            disabled
            label={t('altitudinalZone.label')}
            value={
              location.altitudinalZone
                ? info('altitudinalZone', location.altitudinalZone)[lng]
                : '-'
            }
          />
          <Input
            disabled
            label={t('silverFirArea.label')}
            value={
              location.silverFirArea
                ? info('silverFirArea', location.silverFirArea)[lng]
                : '-'
            }
          />
        </>
      )}
      {projectionMode === 'f' && options.forestEcoregion && (
        <Dropdown
          clearable={isDifferent('forestEcoregion')}
          label={t('forestEcoregion.label')}
          options={options.forestEcoregion.map(
            getDropdownOptions('forestEcoregion', lng),
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
            getDropdownOptions('altitudinalZone', lng),
          )}
          onChange={(e, { value: altitudinalZone }) =>
            dispatch(setFormLocation({ altitudinalZone }))
          }
          value={location.altitudinalZone}
        />
      )}
      {projectionMode === 'f' && options.silverFirArea && (
        <Dropdown
          clearable={isDifferent('silverFirArea')}
          label={t('silverFirArea.label')}
          options={options.silverFirArea.map(
            getDropdownOptions('silverFirArea', lng),
          )}
          onChange={(e, { value: silverFirArea }) =>
            dispatch(setFormLocation({ silverFirArea }))
          }
          value={location.silverFirArea}
        />
      )}
      <div className={styles.help}>
        <HelpModal color="#006268" header={t('location.header')}>
          <Trans i18nKey="location.help" />
        </HelpModal>
      </div>
      <Header>{t('location.header')}</Header>
      <Accordion fluid panels={panels} styled />
      {intersection(Object.keys(formLocation), filterFields).length > 0 && (
        <Button
          active
          className={styles.resetButton}
          onClick={() => {
            const rfl = filterFields.reduce((l, f) => ({ ...l, [f]: '' }), {});
            dispatch(setFormLocation(rfl));
          }}
        >
          {t('location.reset')}
        </Button>
      )}
    </Form>
  );
}

export default LocationForm;
