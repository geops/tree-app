import { defaults as controlDefaults, ScaleLine } from "ol/control";
import { defaults as interactionDefaults } from "ol/interaction";

import useIsMobile from "@/utils/hooks/useIsMobile";

import MapGeolocation from "./MapGeolocation";
import MapLayersMenu from "./MapLayersMenu";
import MapLocation from "./MapLocation";
import MapUserLocations from "./MapUserLocations";
import MapView from "./MapView";
import LayersProvider from "./spatial/components/layer/LayersProvider";
import Map from "./spatial/components/Map";

import "ol/ol.css";

const scaleLine = new ScaleLine();
// const zoomSlider = new ZoomSlider();
const controls = controlDefaults({ rotate: false }).extend([
  scaleLine,
  // zoomSlider,
]);
const interactions = interactionDefaults({
  altShiftDragRotate: false,
  pinchRotate: false,
});

function AppMap({ className = "" }: { className?: string }) {
  const isMobile = useIsMobile();
  return (
    <Map
      className={`map ${isMobile ? "h-[calc(100%-4rem)]" : ""} relative ${className}`}
      controls={controls}
      interactions={interactions}
    >
      <LayersProvider>
        <MapLayersMenu />
        <MapLocation />
        <MapUserLocations />
      </LayersProvider>
      <MapView />
      <MapGeolocation />
    </Map>
  );
}

export default AppMap;
