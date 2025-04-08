import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { LayersContext } from "./spatial/components/layer/LayersProvider";
import ButtonGroup from "./ui/ButtonGroup";

export const BASELAYER_GRAY =
  "https://wmts10.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-grau/default/current/3857/{z}/{x}/{y}.jpeg";
export const BASELAYER_AERIAL =
  "https://wmts10.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/{z}/{x}/{y}.jpeg";

function MapBaselayerSwitcher() {
  const { t } = useTranslation();
  const { baseLayer: layer } = useContext(LayersContext);
  const [url, setUrl] = useState<string>(
    layer?.getSource()?.getUrls()?.[0] ?? BASELAYER_GRAY,
  );

  useEffect(() => {
    layer?.getSource()?.setUrl(url);
  }, [layer, url]);

  return (
    <ButtonGroup
      className="w-full font-bold"
      items={[
        {
          active: url === BASELAYER_GRAY,
          className: "flex-1 px-0",
          label: t("map.baseLayer.map"),
          onClick: () => setUrl(BASELAYER_GRAY),
        },
        {
          active: url === BASELAYER_AERIAL,
          className: "flex-1",
          label: t("map.baseLayer.aerial"),
          onClick: () => setUrl(BASELAYER_AERIAL),
        },
      ]}
      label={t("map.baseLayer.label")}
    />
  );
}

export default MapBaselayerSwitcher;
