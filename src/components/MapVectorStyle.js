import React, { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from 'semantic-ui-react';

import mapStyle from '../map/style';
import { LayerContext } from '../spatial/components/layer/Base';
import { setMapLayer } from '../store/actions';

const getStyle = layerId => {
  const { layers } = mapStyle;
  const sl = (layers.find(l => l.id === layerId) || {})['source-layer'];
  return {
    ...mapStyle,
    layers: layers.map(l => ({
      ...l,
      paint:
        l.type === 'fill'
          ? { ...l.paint, 'fill-opacity': l['source-layer'] === sl ? 0.5 : 0.0 }
          : l.paint,
    })),
  };
};
const polygonLayers = mapStyle.layers.filter(l => l.type === 'fill');

function MapVectorStyle() {
  const dispatch = useDispatch();
  const mapLayer = useSelector(state => state.mapLayer);
  const { t } = useTranslation();
  const layer = useContext(LayerContext);
  const style = getStyle(mapLayer);
  useMemo(() => layer.mapboxMap.setStyle(style), [layer, style]);
  return (
    <Menu
      compact
      inverted
      vertical
      style={{ position: 'absolute', zIndex: 9, right: '30px', top: '15px' }}
    >
      {polygonLayers.map(l => (
        <Menu.Item
          key={l.id}
          active={mapLayer === l.id}
          onClick={() => dispatch(setMapLayer(l.id))}
        >
          {t(`map.${l['source-layer']}`)}
        </Menu.Item>
      ))}
    </Menu>
  );
}

export default MapVectorStyle;
