import React, { useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  Header,
  List,
  Segment,
  Checkbox,
  Popup,
  Menu,
} from 'semantic-ui-react';
// eslint-disable-next-line import/no-unresolved
import { info } from '@geops/tree-lib';

import Button from './Button';
import mapStyle from '../map/style.json';
import { LayerContext } from '../spatial/components/layer/Base';
import { setMapLayers } from '../store/actions';
import styles from './MapVectorLayer.module.css';

const { REACT_APP_VECTOR_TILES_ENDPOINT: endpoint } = process.env;
mapStyle.glyphs = `${endpoint}/fonts/{fontstack}/{range}.pbf`;
mapStyle.sources.tree.tiles = [`${endpoint}/tree/{z}/{x}/{y}.pbf`];

const getLayerStyle = (layerId) =>
  mapStyle.layers.find((l) => l.id === layerId) || {};

const getStyle = (sourceLayers, activeProfile) => ({
  ...mapStyle,
  layers: mapStyle.layers.map((layer) => {
    const isSourceLayer = sourceLayers.includes(layer.id);
    // const isSourceLayer = sourceLayers.includes(layer['source-layer']);
    const paint = { ...layer.paint };
    if (layer.type === 'fill') {
      paint['fill-opacity'] = isSourceLayer ? 0.5 : 0.0;
    } else if (layer.type === 'line') {
      paint['line-opacity'] = isSourceLayer ? 0.8 : 0.0;
    } else if (layer.type === 'symbol') {
      paint['text-opacity'] = isSourceLayer ? 1 : 0.0;
    }
    if (/^ft_label$/.test(layer.id)) {
      // eslint-disable-next-line no-param-reassign
      layer.layout['text-field'] = [
        'case',
        ['has', `code_${activeProfile}`],
        ['get', `code_${activeProfile}`],
        ['get', 'code'],
      ];
    }
    return { ...layer, paint };
  }),
});
const getLayersByGroup = (group) =>
  mapStyle.layers.filter((l) => l.metadata && l.metadata.group === group);

const azLayers = ['azt', 'azm', 'aze'];
const getIsAz = (id) => azLayers.includes(id);

function LayertreeItem({ layerId, label, onChange, active, radio }) {
  if (!label) {
    return null;
  }
  return (
    <Menu.Item
      active={active}
      className={styles.item}
      key={layerId}
      onClick={(evt, item) => onChange(evt, item)}
    >
      <Checkbox
        id={layerId}
        label={
          <label htmlFor={layerId}>{active ? <b>{label}</b> : label}</label>
        }
        radio={radio}
        checked={active}
      />
    </Menu.Item>
  );
}

LayertreeItem.propTypes = {
  layerId: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
  radio: PropTypes.bool,
};

LayertreeItem.defaultProps = {
  layerId: undefined,
  active: false,
  radio: false,
};

function MapVectorLayer() {
  const { t, i18n } = useTranslation();
  const { language: lng } = i18n;
  const i = useMemo(() => (type, code) => info(type, code)[lng], [lng]);
  const [legendVisible, setLegendVisible] = useState(false);
  const dispatch = useDispatch();
  const layer = useContext(LayerContext);
  const mapLayers = useSelector((state) => state.mapLayers);
  const azLayer = useSelector((state) => state.azLayer);
  const activeProfile = useSelector((state) => state.activeProfile);
  const layerStyle = getLayerStyle(mapLayers[0]);
  const style = getStyle(mapLayers, activeProfile);
  useMemo(() => layer.mapboxMap.setStyle(style), [layer, style]);

  const legend = useMemo(() => {
    if (!layerStyle?.metadata) {
      return null;
    }
    let code;
    const { type } = layerStyle.metadata;
    return (
      type &&
      Array.isArray(layerStyle.paint['fill-color']) &&
      layerStyle.paint['fill-color']
        .map((fc) => {
          const row = { color: fc };
          if (typeof fc === 'string' && fc.startsWith('#') && code) {
            row.label =
              type === 'altitudinalZone' && code.startsWith('8')
                ? `${i('altitudinalZone', '80')} ${i('silverFirArea', code[1])}`
                : i(type, code);
            code = null;
          } else {
            code = fc.toString();
          }
          return row;
        })
        .filter((row) => row.label)
    );
  }, [i, layerStyle]);

  return (
    <>
      <Popup
        basic
        className={styles.popup}
        trigger={
          <Button active className={styles.opener}>
            {t('Kartenebenen')}
          </Button>
        }
        on="click"
        hideOnScroll
      >
        <Popup.Content>
          <Menu text vertical className={styles.menu} fluid compact>
            {getLayersByGroup('main').map((lyr) => (
              <LayertreeItem
                label={t(`map.${lyr['source-layer']}`)}
                layerId={lyr.id}
                key={lyr.id}
                active={mapLayers.includes(lyr.id)}
                onChange={(evt, { active }) =>
                  dispatch(
                    setMapLayers(
                      !active
                        ? [...mapLayers, lyr.id]
                        : mapLayers.filter((l) => l !== lyr.id),
                    ),
                  )
                }
              />
            ))}
            <LayertreeItem
              label={t('map.altitudinalZones')}
              active={azLayers.some((l) => mapLayers.includes(l))}
              onChange={(evt, { active }) => {
                dispatch(
                  setMapLayers(
                    active
                      ? mapLayers.filter((l) => !getIsAz(l))
                      : [...mapLayers, azLayer],
                  ),
                );
              }}
            />
            <div className={styles.azLayers}>
              {getLayersByGroup('altitudinalZones').map((lyr) => (
                <LayertreeItem
                  key={lyr.id}
                  label={t(`map.${lyr['source-layer']}`)}
                  layerId={lyr.id}
                  radio
                  active={mapLayers.includes(lyr.id)}
                  onChange={(evt, { active }) => {
                    if (active) {
                      return;
                    }
                    dispatch(
                      setMapLayers(
                        [...mapLayers.filter((l) => !getIsAz(l)), lyr.id],
                        lyr.id,
                      ),
                    );
                  }}
                />
              ))}
            </div>
          </Menu>
        </Popup.Content>
      </Popup>
      {legend && (
        <Button
          active={!legendVisible}
          className={styles.legendButton}
          icon={legendVisible ? 'close' : 'info'}
          onClick={() => setLegendVisible(!legendVisible)}
        />
      )}
      {legend && legendVisible && (
        <Segment className={styles.legendContainer}>
          <Header size="small">{t('map.legend')}</Header>
          <List>
            {legend.map(({ color, label }) => (
              <List.Item>
                <List.Icon name="square" style={{ color }} />
                <List.Content>{label}</List.Content>
              </List.Item>
            ))}
          </List>
        </Segment>
      )}
    </>
  );
}

export default MapVectorLayer;
