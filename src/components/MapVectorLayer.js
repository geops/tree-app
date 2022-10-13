import React, { useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Header, List, Segment } from 'semantic-ui-react';
// eslint-disable-next-line import/no-unresolved
import { info } from '@geops/tree-lib';

import Button from './Button';
import Dropdown from './Dropdown';
import mapStyle from '../map/style.json';
import { LayerContext } from '../spatial/components/layer/Base';
import { setMapLayer } from '../store/actions';
import styles from './MapVectorLayer.module.css';

const { REACT_APP_VECTOR_TILES_ENDPOINT: endpoint } = process.env;
mapStyle.glyphs = `${endpoint}/fonts/{fontstack}/{range}.pbf`;
mapStyle.sources.tree.tiles = [`${endpoint}/tree/{z}/{x}/{y}.pbf`];

const getLayerStyle = (layerId) =>
  mapStyle.layers.find((l) => l.id === layerId) || {};

const getStyle = (sourceLayer, activeProfile) => ({
  ...mapStyle,
  layers: mapStyle.layers.map((layer) => {
    const isSourceLayer = layer['source-layer'] === sourceLayer;
    const paint = { ...layer.paint };
    if (layer.type === 'fill') {
      paint['fill-opacity'] = isSourceLayer ? 0.5 : 0.0;
    } else if (layer.type === 'line') {
      paint['line-opacity'] = isSourceLayer ? 0.5 : 0.0;
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

function MapVectorLayer() {
  const { t, i18n } = useTranslation();
  const { language: lng } = i18n;
  const i = useMemo(() => (type, code) => info(type, code)[lng], [lng]);
  const [legendVisible, setLegendVisible] = useState(false);
  const dispatch = useDispatch();
  const layer = useContext(LayerContext);
  const mapLayer = useSelector((state) => state.mapLayer);
  const activeProfile = useSelector((state) => state.activeProfile);
  const layerStyle = getLayerStyle(mapLayer);
  const style = getStyle(layerStyle['source-layer'], activeProfile);
  useMemo(() => layer.mapboxMap.setStyle(style), [layer, style]);

  const getDropdownItem = (l, indent) => (
    <Dropdown.Item
      active={mapLayer === l.id}
      className={styles.item}
      key={l.id}
      onClick={() => dispatch(setMapLayer(l.id))}
    >
      {/* The indent hack is due to Semantic React UI using dropdown item padding with !important */}
      {indent ? <span>{'      '}</span> : null}
      {t(`map.${l['source-layer']}`)}
    </Dropdown.Item>
  );

  const legend = useMemo(() => {
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
      <Dropdown
        fluid={false}
        search={false}
        selection={undefined}
        button
        className={styles.dropdown}
        direction="left"
        pointing
        text={t(`map.${layerStyle['source-layer']}`)}
      >
        <Dropdown.Menu>
          {getLayersByGroup('main').map((lyr) => getDropdownItem(lyr))}
          <Dropdown.Header className={styles.header}>
            {t('map.altitudinalZones')}
          </Dropdown.Header>
          {getLayersByGroup('altitudinalZones').map((lyr) =>
            getDropdownItem(lyr, true),
          )}
        </Dropdown.Menu>
      </Dropdown>
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
