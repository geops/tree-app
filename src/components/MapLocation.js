import { Point } from 'ol/geom';
import { transform } from 'ol/proj';
import { Style, Icon } from 'ol/style';
import OLFeature from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { List, Modal } from 'semantic-ui-react';
import { info } from '@geops/tree-lib';

import { EPSG2056 } from '../map/projection';
import { layers } from '../map/style.json';
import mapPositionIcon from '../icons/mapPosition.svg';
import { MapContext } from '../spatial/components/Map';
import Mapbox from '../spatial/components/layer/Mapbox';
import Vector from '../spatial/components/layer/Vector';
import { setMapLocation } from '../store/actions';
import styles from './MapLocation.module.css';
import translation from '../i18n/resources/de/translation.json';

const getKey = (sl) =>
  (
    layers.find((l) => l['source-layer'] === sl && l.metadata) || {
      metadata: {},
    }
  ).metadata.mapping;

const getHasTransition = (code) => code.includes('(') && code.endsWith(')');

const featuresToLocation = (location, f) => {
  const key = getKey(f.sourceLayer) || f.sourceLayer;
  const value = f.properties.code.toString();
  const transition = getHasTransition(value);

  if (f.sourceLayer === 'forest_types') {
    let forestType = value;
    let transitionForestType = null;
    if (transition) {
      [, forestType, transitionForestType] = value.match(/(.*)\((.*)\)/);
    }
    let forestTypeInfo;
    try {
      forestTypeInfo = info('forestType', forestType);
    } catch (error) {
      // ignore missing forest types
    }

    const cantonalData = Object.keys(translation.profiles).reduce(
      (allCantonalData, profile) => ({
        ...allCantonalData,
        [`forestType_${profile}`]: f.properties[`code_${profile}`],
        [`info_${profile}`]: f.properties[`info_${profile}`],
      }),
      {},
    );

    if (
      forestTypeInfo &&
      !location.forestTypes.find((t) => t.forestType === forestType)
    ) {
      return {
        ...location,
        forestTypes: [
          ...location.forestTypes,
          {
            forestType,
            transitionForestType,
            transition,
            info: forestTypeInfo,
            ...cantonalData,
          },
        ],
      };
    }
    return { ...location, ...cantonalData };
  }

  if (f.sourceLayer.startsWith('altitudinal_zones_')) {
    if (value === '-10') {
      return { ...location, [key]: null };
    }
    if (transition) {
      const [, azValue, transAzValue] = value.match(/(.*)\((.*)\)/);
      return {
        ...location,
        [key]: azValue,
        transitionAltitudinalZone: transAzValue,
      };
    }
  }

  return { ...location, [key]: value };
};

const to2056 = (coordinate) => transform(coordinate, 'EPSG:3857', EPSG2056);
const to3857 = (coordinate) => transform(coordinate, EPSG2056, 'EPSG:3857');

const iconFeature = new OLFeature({ geometry: new Point([0, 0]) });
iconFeature.setStyle(
  new Style({
    image: new Icon({
      anchor: [0.5, 1],
      src: mapPositionIcon,
      scale: 0.1,
    }),
  }),
);
const vectorSource = new VectorSource({
  features: [iconFeature],
});

function MapLocation() {
  const map = useContext(MapContext);
  const dispatch = useDispatch();
  const history = useHistory();
  const mapLocation = useSelector((state) => state.mapLocation);
  const activeProfile = useSelector((state) => state.activeProfile);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const handleCoords = ({ coordinate }, resetFormLocation = true) => {
      iconFeature.getGeometry().setCoordinates(coordinate);
      const pixel = map.getPixelFromCoordinate(coordinate);
      const features = map.getFeaturesAtPixel(pixel) || [];
      let location = features
        .filter((feature) => feature.properties?.code !== undefined)
        .reduce(featuresToLocation, {
          forestTypes: [],
        });
      location.coordinate = to2056(coordinate);
      if (location.forestTypes.length === 1) {
        location = { ...location, ...location.forestTypes[0] };
      } else {
        location.forestType = null;
        location.transitionForestType = null;
        location.transition = null;
      }
      dispatch(setMapLocation(location, resetFormLocation));
      history.push(`/projection${window.location.search}`);
      if (!location.altitudinalZone) {
        dispatch(setMapLocation(location, true, true, 'f'));
      }
    };
    const waitForLoad = () => {
      const mapboxLayer = map
        .getLayers()
        .getArray()
        .find((layer) => layer instanceof Mapbox.Layer);
      if (mapboxLayer && mapLocation && mapLocation.coordinate) {
        const coordinate = to3857(mapLocation.coordinate);
        mapboxLayer.on('loadend', () => handleCoords({ coordinate }, false));
        map.getLayers().un('propertychange', waitForLoad);
      }
    };
    map.getLayers().on('propertychange', waitForLoad);
    map.on('singleclick', handleCoords);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, activeProfile, dispatch]);

  return (
    <>
      <Vector source={vectorSource} zIndex={999} />
      <Modal
        className={styles.modal}
        closeIcon
        open={!mapLocation.forestType && mapLocation.forestTypes?.length > 1}
        onClose={() =>
          dispatch(setMapLocation({ ...mapLocation, forestTypes: [] }))
        }
      >
        <Modal.Header>{t('forestType.select')}</Modal.Header>
        <Modal.Content>
          <List divided selection>
            {mapLocation.forestTypes?.map((ft) => {
              const cantonalFt = ft[`forestType_${activeProfile}`];
              return (
                ft.info && (
                  <List.Item
                    className={styles.item}
                    description={ft.info[i18n.language]}
                    header={`${
                      ft.transition
                        ? `${cantonalFt || ft.forestType} (${
                            ft.transitionForestType
                          })`
                        : cantonalFt || ft.forestType
                    }`}
                    key={ft.forestType}
                    onClick={() => {
                      dispatch(setMapLocation({ ...mapLocation, ...ft }, true));
                      history.push(`/projection${window.location.search}`);
                    }}
                  />
                )
              );
            })}
          </List>
        </Modal.Content>
      </Modal>
    </>
  );
}

export default MapLocation;
