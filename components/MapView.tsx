import { ProjectionLike, transform } from "ol/proj";
import View from "ol/View";
import { useContext, useEffect } from "react";
// import { useDispatch, useSelector } from 'react-redux';

import useStore from "@/store";

import { EPSG2056 } from "../map/projection";

import { MapContext } from "./spatial/components/Map";
// import { setMapView } from '../store/actions';

const getMapViewString = (view: View) => {
  const [lon, lat] = transform(
    view.getCenter() as number[],
    "EPSG:3857",
    EPSG2056 as ProjectionLike,
  );
  const zoom = Math.round(view.getZoom() ?? 0);
  return [zoom, Math.round(lon), Math.round(lat)].join("|");
};
const parseMapViewString = (mapViewString: string) => {
  const [zoom, lon, lat] = mapViewString.split("|").map((i) => parseInt(i, 10));
  const center = transform([lon, lat], EPSG2056 as ProjectionLike, "EPSG:3857");
  return { center, zoom };
};

// Swiss extent in EPSG:3857
const extent = [660000, 5740000, 1180000, 6110000];
const maxZoom = 20;
const minZoom = 2;

function MapView() {
  const map = useContext(MapContext);
  const { mapView: mapViewString, setMapView } = useStore();

  useEffect(() => {
    const { center, zoom } = parseMapViewString(mapViewString);
    const view = new View({
      center,
      extent,
      maxZoom,
      minZoom,
      zoom,
    });
    map?.on("moveend", () => setMapView(getMapViewString(view)));

    map?.setView(view);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export default MapView;
