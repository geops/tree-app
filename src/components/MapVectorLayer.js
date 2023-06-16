import React, { useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  Header,
  List,
  Checkbox,
  Popup,
  Menu,
  Modal,
  Button as SUIButton,
} from 'semantic-ui-react';
// eslint-disable-next-line import/no-unresolved
import { info } from '@geops/tree-lib';

import Button from './Button';
import mapStyle from '../map/style.json';
import { LayerContext } from '../spatial/components/layer/Base';
import { setMapLayers } from '../store/actions';
import getIsAz, { azLayers } from '../utils/getIsAz';
import styles from './MapVectorLayer.module.css';

const { REACT_APP_VECTOR_TILES_ENDPOINT: endpoint } = process.env;
mapStyle.glyphs = `${endpoint}/fonts/{fontstack}/{range}.pbf`;
mapStyle.sources.tree.tiles = [`${endpoint}/tree/{z}/{x}/{y}.pbf`];

const getLayerStyle = (layerId) =>
  mapStyle.layers.find((l) => l.id === layerId) || {};

const getStyle = (sourceLayers, activeProfile) => ({
  ...mapStyle,
  layers: mapStyle.layers.map((layer) => {
    const currentSourceLayers = mapStyle.layers.filter((l) =>
      sourceLayers.includes(l.id),
    );
    const isSourceLayer = !!currentSourceLayers.find(
      (l) => l['source-layer'] === layer['source-layer'],
    );
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

function LegendModal({ legendId, onClose }) {
  const { t, i18n } = useTranslation();
  const { language: lng } = i18n;
  const i = useMemo(() => (type, code) => info(type, code)[lng], [lng]);
  const layerStyle = getLayerStyle(legendId);
  const legend = useMemo(() => {
    if (!layerStyle?.metadata) {
      return null;
    }
    let code;
    const { type } = layerStyle.metadata;
    return layerStyle.paint['fill-color']
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
      .filter((row) => row.label);
  }, [i, layerStyle.metadata, layerStyle.paint]);
  return (
    <Modal
      closeIcon
      open={!!legendId}
      onClose={onClose}
      className={styles.modal}
    >
      <Header
        content={`${t('map.legend')} - ${t(
          legendId === 'azt'
            ? 'map.altitudinalZones'
            : `map.${layerStyle['source-layer']}`,
        )}`}
      />
      <Modal.Content>
        {legend.map(({ color, label }) => (
          <List.Item className={styles.legendItem} key={label}>
            <List.Icon
              style={{ backgroundColor: color }}
              className={styles.legendIcon}
            />
            <List.Content>{label}</List.Content>
          </List.Item>
        ))}
      </Modal.Content>
    </Modal>
  );
}

LegendModal.propTypes = {
  legendId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

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

function LegendTrigger({ onClick, ...otherProps }) {
  return (
    <SUIButton
      size="small"
      basic
      compact
      className={styles.legendTrigger}
      icon="info"
      onClick={onClick}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
    />
  );
}

LegendTrigger.propTypes = {
  onClick: PropTypes.func.isRequired,
};

function MapVectorLayer() {
  const { t } = useTranslation();
  const [legendId, setLegendId] = useState();
  const dispatch = useDispatch();
  const layer = useContext(LayerContext);
  const [layertreeOpen, setLayertreeOpen] = useState(false);
  const mapLayers = useSelector((state) => state.mapLayers);
  const azLayer = useSelector((state) => state.azLayer);
  const activeProfile = useSelector((state) => state.activeProfile);
  const style = getStyle(mapLayers, activeProfile);
  useMemo(() => layer.mapboxMap.setStyle(style), [layer, style]);

  return (
    <>
      <Popup
        style={{ zIndex: 500 }}
        position="bottom right"
        className={styles.popup}
        trigger={
          <Button
            active
            className={styles.opener}
            onClick={() => setLayertreeOpen(true)}
          >
            {t('map.layers')}
          </Button>
        }
        open={layertreeOpen}
        on="click"
        onClose={() => {
          if (legendId) return;
          setLayertreeOpen(false);
        }}
      >
        <Popup.Content>
          <Menu text vertical className={styles.menu} fluid compact>
            {getLayersByGroup('main').map((lyr) => {
              const layerStyle = getLayerStyle(lyr.id);
              const hasLegend =
                layerStyle?.metadata &&
                layerStyle.metadata.type &&
                Array.isArray(layerStyle.paint['fill-color']);
              return (
                <div className={styles.labelWrapper} key={lyr.id}>
                  <LayertreeItem
                    label={t(`map.${lyr['source-layer']}`)}
                    layerId={lyr.id}
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
                  {hasLegend && (
                    <LegendTrigger
                      onClick={() => setLegendId(legendId ? null : lyr.id)}
                    />
                  )}
                </div>
              );
            })}
            <div className={styles.labelWrapper}>
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
              <LegendTrigger
                onClick={() => setLegendId(legendId ? null : 'azt')}
              />
            </div>
            <div className={styles.azLayers}>
              {getLayersByGroup('altitudinalZones').map((lyr) => (
                <LayertreeItem
                  key={lyr.id}
                  label={t(`map.${lyr['source-layer']}`)}
                  layerId={lyr.id}
                  radio
                  active={mapLayers.includes(lyr.id)}
                  onChange={(evt, { active }) => {
                    if (active) return;
                    dispatch(
                      setMapLayers([
                        ...mapLayers.filter((l) => !getIsAz(l)),
                        lyr.id,
                      ]),
                    );
                  }}
                />
              ))}
            </div>
          </Menu>
        </Popup.Content>
      </Popup>
      {legendId ? (
        <LegendModal
          legendId={legendId}
          onClose={() => {
            setLegendId(null);
            setLayertreeOpen(true);
          }}
        />
      ) : null}
    </>
  );
}

export default MapVectorLayer;
