import Overlay from "ol/Overlay";
import { useContext, useEffect, useRef } from "react";

import { MapContext } from "./Map";

import type {
  ChildrenType,
  CoordinateArrayType,
} from "@/utils/types/definitions";

const overlay = new Overlay({ autoPan: true });

interface PopupProps {
  children: ChildrenType;
  position?: CoordinateArrayType;
}

function Popup({ children, position }: PopupProps) {
  const popup = useRef(null);
  const map = useContext(MapContext);
  useEffect(() => {
    overlay.setElement(popup.current!);
    map?.addOverlay(overlay);
  }, [map]);
  useEffect(() => overlay.setPosition(position), [position]);
  return <div ref={popup}>{children}</div>;
}

export default Popup;
