import Geolocation from "ol/Geolocation";
import { useContext, useMemo } from "react";

import getIsMobileDevice from "../utils/getIsMobileDevice";

import GeolocationIcon from "./icons/GeolocationIcon";
import { MapContext } from "./spatial/components/Map";
import Button from "./ui/Button";

function MapGeolocation() {
  const map = useContext(MapContext);
  const projection = map?.getView().getProjection();
  const geoloc = useMemo(
    () =>
      new Geolocation({
        projection,
        trackingOptions: {
          enableHighAccuracy: true,
        },
      }),
    [projection],
  );

  geoloc.on("change:position", () => {
    const coordinate = geoloc.getPosition();
    // @ts-expect-error - MapEvent type doesn't accept coordinate
    map?.dispatchEvent({ coordinate, type: "singleclick" });
    map?.getView().setCenter(coordinate);
    geoloc.setTracking(false);
  });

  return getIsMobileDevice() ? (
    <div className="absolute bottom-28 right-5 z-50 flex items-center rounded p-1 backdrop-blur-sm">
      <Button
        className="flex h-[34px] !w-[34px] items-center justify-center bg-white !px-0 !py-0 !text-primary-500 hover:bg-white hover:!text-primary-200"
        onClick={() => geoloc.setTracking(true)}
      >
        <GeolocationIcon className="h-4 w-4" />
      </Button>
    </div>
  ) : null;
}

export default MapGeolocation;
