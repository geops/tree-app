import React, { useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu } from 'semantic-ui-react';

import { LayerContext } from '../spatial/components/layer/Base';

import mapStyle from '../map/style';

const defaultLayer = 'altitudinal_zones_1995';

const getStyle = activeLayer => ({
  ...mapStyle,
  layers: mapStyle.layers.map(l => ({
    ...l,
    paint:
      l.type === 'fill'
        ? { ...l.paint, 'fill-opacity': l.id === activeLayer ? 0.5 : 0.0 }
        : l.paint,
  })),
});

function MapVectorStyle() {
  const { t } = useTranslation();
  const layer = useContext(LayerContext);
  const [activeLayer, setActiveLayer] = useState(defaultLayer);
  const style = getStyle(activeLayer);
  // eslint-disable-next-line no-underscore-dangle
  useMemo(() => layer.mapboxMap.setStyle(style), [layer, style]);
  return (
    <Menu
      inverted
      vertical
      style={{ position: 'absolute', zIndex: 9, right: '30px', top: '15px' }}
    >
      {style.layers.map(l => (
        <Menu.Item
          key={l.id}
          name={l.id}
          active={activeLayer === l.id}
          onClick={() => setActiveLayer(l.id)}
        >
          {t(`map.${l.id}`)}
        </Menu.Item>
      ))}
    </Menu>
  );
}

export default MapVectorStyle;
