import React, { useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu } from 'semantic-ui-react';

import { LayerContext } from '../spatial/components/layer/Base';

import mapStyle from '../map/style';

const defaultLayer = 'forest_types';

const getStyle = activeLayer => ({
  ...mapStyle,
  layers: mapStyle.layers.map(l => ({
    ...l,
    paint:
      l.type === 'fill'
        ? {
            ...l.paint,
            'fill-opacity': l['source-layer'] === activeLayer ? 0.5 : 0.0,
          }
        : l.paint,
  })),
});

function MapVectorStyle() {
  const { t } = useTranslation();
  const layer = useContext(LayerContext);
  const [activeLayer, setActiveLayer] = useState(defaultLayer);
  const style = getStyle(activeLayer);
  useMemo(() => layer.mapboxMap.setStyle(style), [layer, style]);
  return (
    <Menu
      compact
      inverted
      vertical
      style={{ position: 'absolute', zIndex: 9, right: '30px', top: '15px' }}
    >
      {style.layers
        .filter(l => l.type === 'fill')
        .map(l => (
          <Menu.Item
            key={l['source-layer']}
            name={l['source-layer']}
            active={activeLayer === l['source-layer']}
            onClick={() => setActiveLayer(l['source-layer'])}
          >
            {t(`map.${l.id}`)}
          </Menu.Item>
        ))}
    </Menu>
  );
}

export default MapVectorStyle;
