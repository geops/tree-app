import { StateCreator } from "zustand";

import { AppStore } from "..";

type ValueToString<T> = (value: T) => string;

interface ParamsSpec {
  fla: string | undefined;
  flaz: string | undefined;
  flfe: string | undefined;
  flft: string | undefined;
  flr: string | undefined;
  fls: string | undefined;
  flsfa: string | undefined;
  flt: boolean | undefined;
  fltaz: string | undefined;
  fltft: string | undefined;
  fltraz: string | undefined;
  ftc: string[];
  ftd: string | undefined;
  ftm: undefined;
  ml: string[];
  mp: number[];
  mv: string | undefined;
  p: string | undefined;
  pm: string | undefined;
}

export type Params = {
  [K in keyof ParamsSpec]: {
    getValue?: (state: AppStore) => ParamsSpec[K];
    selector: string;
    valueToString?: ValueToString<ParamsSpec[K]>;
  };
};

export const params: Params = {
  fla: {
    getValue: (state: AppStore) => state.formLocation?.additional,
    selector: "formLocation",
  },
  flaz: {
    getValue: (state: AppStore) => state.formLocation?.altitudinalZone,
    selector: "formLocation",
  },
  flfe: {
    getValue: (state: AppStore) => state.formLocation?.forestEcoregion,
    selector: "formLocation",
  },
  flft: {
    getValue: (state: AppStore) => state.formLocation?.forestType,
    selector: "formLocation",
  },
  flr: {
    getValue: (state: AppStore) => state.formLocation?.relief,
    selector: "formLocation",
  },
  fls: {
    getValue: (state: AppStore) => state.formLocation?.slope,
    selector: "formLocation",
  },
  flsfa: {
    getValue: (state: AppStore) => state.formLocation?.silverFirArea,
    selector: "formLocation",
  },
  flt: {
    getValue: (state: AppStore) => state.formLocation?.transition,
    selector: "formLocation",
    //   stringToValue: (value) => value === "t",
    valueToString: (value) => (value ? "t" : "f"),
  },
  fltaz: {
    getValue: (state: AppStore) => state.formLocation?.targetAltitudinalZone,
    selector: "formLocation",
  },
  fltft: {
    getValue: (state: AppStore) => state.formLocation?.transitionForestType,
    selector: "formLocation",
  },
  fltraz: {
    getValue: (state: AppStore) =>
      state.formLocation?.transitionAltitudinalZone,
    selector: "formLocation",
  },
  ftc: {
    selector: "forestTypeComparison",
    //   stringToValue: (value) => value.split(",").filter((v) => v),
    valueToString: (value: string[]) => value?.join(),
  },
  ftd: {
    getValue: (state: AppStore) =>
      state.forestTypeModal === "d" ? state.forestTypeDescription : undefined,
    selector: "forestTypeDescription",
  },
  ftm: {
    selector: "forestTypeModal",
  },
  ml: {
    selector: "mapLayers",
    //   stringToValue: (value) => value?.split(",") || [],
    valueToString: (value: string[]) => value.toString(),
  },
  mp: {
    getValue: (state: AppStore) => state.mapLocation.coordinate,
    selector: "mapLocation",
    // stringToValue: (value) => value.split('|').map(parseFloat),
    valueToString: (value: number[]) =>
      value?.map((c) => Math.round(c)).join("|"),
  },
  mv: {
    selector: "mapView",
  },
  p: {
    selector: "activeProfile",
  },
  pm: {
    selector: "projectionMode",
  },
};

const syncWithQueryString =
  (config: StateCreator<AppStore>): StateCreator<AppStore> =>
  (set, get, api) => {
    const wrappedSet: typeof set = (partial, replace) => {
      set(partial, replace as false | undefined);

      const currentState = get();
      const queryParams = new URLSearchParams(window.location.search);

      Object.entries(params).forEach(
        ([key, { getValue, selector, valueToString }]) => {
          const value = getValue
            ? getValue(currentState)
            : currentState[selector as keyof AppStore];
          // @ts-expect-error dev
          const paramValue = valueToString ? valueToString(value) : value;
          if (!value) {
            queryParams.delete(key);
          } else {
            queryParams.set(key, String(paramValue));
          }
        },
      );
      // Update the URL with the new query string
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?${queryParams.toString()}`,
      );
    };

    return config(wrappedSet, get, api);
  };

export default syncWithQueryString;
