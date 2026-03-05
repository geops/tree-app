import TreeClient from "@geops/tree-lib";

import getIsSSR from "@/utils/getIsSSR";

import { AppStore, ForestTypeModalType, Location, ProjectionMode } from ".";

import type {
  AltitudinalZoneCode,
  ForestEcoregionCode,
  Location as FormLocation,
  ReliefCode,
  SilverFirAreaCode,
  TreeAppProfile,
} from "@geops/tree-lib/types";

export function getInitialValue<T>(
  key: string,
  callback: (value: string | undefined, urlParams: URLSearchParams) => void = (
    value,
  ) => value,
) {
  if (getIsSSR()) return undefined;
  const urlParams = new URLSearchParams(window.location.search);
  const value = urlParams.get(key);
  return callback(value ?? undefined, urlParams) as T;
}

export const SET_FORM_LOCATION = "SET_FORM_LOCATION";
export const SET_MAP_LOCATION = "SET_MAP_LOCATION";
export const SET_PROJECTION_MODE = "SET_PROJECTION_MODE";

export const initialProjection = { options: {}, projections: [] };

export const getFormLocation = (state: AppStore, data: FormLocation) => {
  const formLocation = { ...state.formLocation, ...data };
  const formLocationFields = Object.keys(data);
  for (const fieldName of formLocationFields) {
    const fieldValue = data[fieldName as keyof FormLocation];
    if (
      fieldValue === "" ||
      fieldValue === null ||
      fieldValue === undefined ||
      (Array.isArray(fieldValue) && fieldValue.length === 0)
    ) {
      delete formLocation[fieldName as keyof FormLocation];
    }
  }
  return formLocation;
};

export const emptyFormLocation: FormLocation = {
  altitudinalZone: undefined,
  forestEcoregion: undefined,
  silverFirArea: undefined,
  targetAltitudinalZone: undefined,
  transition: undefined,
};

const initialFormLocation: FormLocation = {
  ...emptyFormLocation,
};

if (getInitialValue<AltitudinalZoneCode>("flaz")) {
  initialFormLocation.altitudinalZone =
    getInitialValue<AltitudinalZoneCode>("flaz");
}

if (getInitialValue<ForestEcoregionCode>("flfe")) {
  initialFormLocation.forestEcoregion =
    getInitialValue<ForestEcoregionCode>("flfe");
}

if (getInitialValue<string>("fla")) {
  initialFormLocation.additional = getInitialValue<string>("fla");
}

if (getInitialValue<SilverFirAreaCode>("flsfa")) {
  initialFormLocation.silverFirArea =
    getInitialValue<SilverFirAreaCode>("flsfa");
}

if (getInitialValue<ReliefCode>("flr")) {
  initialFormLocation.relief = getInitialValue<ReliefCode>("flr");
}

if (getInitialValue<string>("flft")) {
  initialFormLocation.forestType = getInitialValue<string>("flft");
}

if (getInitialValue<AltitudinalZoneCode>("fltaz")) {
  initialFormLocation.targetAltitudinalZone =
    getInitialValue<AltitudinalZoneCode>("fltaz");
}

if (getInitialValue<boolean>("flt", (val) => val === "t")) {
  initialFormLocation.transition = getInitialValue<boolean>(
    "flt",
    (val) => val === "t",
  );
}

if (getInitialValue<string>("fltft")) {
  initialFormLocation.transitionForestType = getInitialValue<string>("fltft");
}

if (getInitialValue<AltitudinalZoneCode>("fltraz")) {
  initialFormLocation.transitionAltitudinalZone =
    getInitialValue<AltitudinalZoneCode>("fltraz");
}

const initialState = {
  activeProfile: getInitialValue<TreeAppProfile>("p", (value) => {
    return value ?? localStorage.getItem("tree.profile") ?? "ch";
  })!,
  azLayer: "azt",
  consentGiven: false,
  forestTypeComparison:
    getInitialValue<string[]>("ftc", (val) => val?.split(",")) ?? [],
  forestTypeDescription: getInitialValue<string>("ftd")!,
  forestTypeModal: getInitialValue<ForestTypeModalType>("ftm")!,
  formLocation: initialFormLocation,
  future: true,
  langOverride: null,
  latinActive: false,
  location: {} as Location,
  locationResult: { ecogram: [], options: {} },
  mapLayers: getInitialValue<string[]>("ml", (val) => val?.split(",")) ?? [
    "ft",
    "cb",
  ],
  mapLocation: getInitialValue<Location>("mp", (val) =>
    val
      ? {
          coordinate: decodeURIComponent(val ?? "")
            ?.split("|")
            .map((c) => parseFloat(c)),
        }
      : {},
  )!,
  mapView: getInitialValue<string>("mv", (val, urlParams) => {
    const mapPosition = urlParams.get("mp")?.split("|");
    const mapView = (val ?? "9|2660013|1185171").split("|");
    // When we have a defined map position we increase the zoom level to 13 so the tile data is loaded for the form
    if (mapPosition && parseInt(mapView[0]) < 13) {
      return [13, ...mapPosition].join("|");
    }
    return val ?? "9|2660013|1185171";
  }),
  profiles: ["ch", "bl", "lu", "so", "vd"],
  projectionMode: getInitialValue<ProjectionMode>("pm") ?? "m",
  projectionResult: {
    extreme: initialProjection,
    form: initialProjection,
    moderate: initialProjection,
  },
  selectedFeature: undefined,
  targetAltitudinalZone: null,
  treeClient: null as unknown as TreeClient,
  userLocations: {},
  welcomeModalOpen: true,
};

export default initialState;
