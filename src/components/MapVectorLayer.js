import React, { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Dropdown from './Dropdown';
import mapStyle from '../map/style';
import { LayerContext } from '../spatial/components/layer/Base';
import { setMapLayer } from '../store/actions';
import styles from './MapVectorLayer.module.css';

const { REACT_APP_VECTOR_TILES_ENDPOINT: endpoint } = process.env;
mapStyle.glyphs = `${endpoint}/fonts/{fontstack}/{range}.pbf`;
mapStyle.sources.tree.tiles = [`${endpoint}/tree/{z}/{x}/{y}.pbf`];

const getSourcLayer = layerId =>
  (mapStyle.layers.find(l => l.id === layerId) || {})['source-layer'];

const getStyle = sourceLayer => {
  return {
    ...mapStyle,
    layers: mapStyle.layers.map(layer => ({
      ...layer,
      paint:
        layer.type === 'fill'
          ? {
              ...layer.paint,
              'fill-opacity': layer['source-layer'] === sourceLayer ? 0.5 : 0.0,
            }
          : {
              ...layer.paint,
              'line-opacity': layer['source-layer'] === sourceLayer ? 0.5 : 0.0,
            },
    })),
  };
};
const getLayersByGroup = group =>
  mapStyle.layers.filter(l => l.metadata && l.metadata.group === group);

function MapVectorLayer() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const layer = useContext(LayerContext);
  const mapLayer = useSelector(state => state.mapLayer);
  const sourceLayer = getSourcLayer(mapLayer);
  const style = getStyle(sourceLayer);
  useMemo(() => layer.mapboxMap.setStyle(style), [layer, style]);

  const getDropdownItem = l => (
    <Dropdown.Item
      active={mapLayer === l.id}
      className={styles.item}
      key={l.id}
      onClick={() => dispatch(setMapLayer(l.id))}
    >
      {t(`map.${l['source-layer']}`)}
    </Dropdown.Item>
  );

  return (
    <Dropdown
      fluid={false}
      search={false}
      selection={undefined}
      button
      className={styles.dropdown}
      direction="left"
      pointing
      text={t(`map.${sourceLayer}`)}
    >
      <Dropdown.Menu>
        {getLayersByGroup('main').map(getDropdownItem)}
        <Dropdown.Divider />
        <Dropdown.Header className={styles.header}>
          {t('map.altitudinalZones')}
        </Dropdown.Header>
        {getLayersByGroup('altitudinalZones').map(getDropdownItem)}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default MapVectorLayer;
