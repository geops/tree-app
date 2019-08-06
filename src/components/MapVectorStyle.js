import { useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';

import mapStyle from '../map/style';
import { LayerContext } from '../spatial/components/layer/Base';

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

function MapVectorStyle() {
  const mapLayer = useSelector(state => state.mapLayer);
  const layer = useContext(LayerContext);
  const style = getStyle(mapLayer);
  useMemo(() => layer.mapboxMap.setStyle(style), [layer, style]);
  return null;
}

export default MapVectorStyle;
