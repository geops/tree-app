import { getUid } from "ol";
import OLMap from "ol/Map";
import { createContext, useEffect, useMemo, useRef } from "react";

import { OlMapType } from "@/utils/types/definitions";

import "ol/ol.css";

import type { Collection } from "ol";
import type Control from "ol/control/Control";
import type { Interaction } from "ol/interaction";

export const MapContext = createContext<OlMapType>(new OLMap());

interface MapProps {
  children: React.ReactNode;
  className?: string;
  controls?: Collection<Control>;
  interactions?: Collection<Interaction>;
}

function Map({ children, className, ...props }: MapProps) {
  const map = useMemo(
    () => new OLMap(props),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    Object.values(props).map((prop) => getUid(prop)),
  );

  const target = useRef<HTMLDivElement>(null);
  useEffect(() => {
    map.setTarget(target.current!);
    map.updateSize();
  });

  return (
    <MapContext.Provider value={map}>
      <div className={className} ref={target}>
        {children}
      </div>
    </MapContext.Provider>
  );
}

export default Map;
