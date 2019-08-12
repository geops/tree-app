import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { LayerContext } from '../spatial/components/layer/Base';
import Button from './Button';
import styles from './MapBaseLayer.module.css';

const getUrl = baseLayer => {
  const layer =
    baseLayer === 'map'
      ? 'ch.swisstopo.pixelkarte-grau'
      : 'ch.swisstopo.swissimage';
  return `https://wmts10.geo.admin.ch/1.0.0/${layer}/default/current/3857/{z}/{x}/{y}.jpeg`;
};

const toggle = baseLayer => (baseLayer === 'map' ? 'aerial' : 'map');

function MapBaseLayer() {
  const { t } = useTranslation();
  const layer = useContext(LayerContext);
  const [baseLayer, setBaseLayer] = useState('aerial');
  useEffect(() => layer.getSource().setUrl(getUrl(baseLayer)));
  return (
    <Button
      active
      className={styles.button}
      onClick={() => setBaseLayer(toggle(baseLayer))}
    >
      {t(`map.baseLayer.${toggle(baseLayer)}`)}
    </Button>
  );
}

export default MapBaseLayer;
