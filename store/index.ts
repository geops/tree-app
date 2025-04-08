"use client";

import TreeClient from "@geops/tree-lib";
import { create } from "zustand";

import getIsAz from "@/utils/getIsAzLayer";

import translation from "../i18n/resources/de/translation.json";

import syncWithQueryString from "./middleware/querySync";
import runProject from "./middleware/runProject";
import initialState, { emptyFormLocation, getFormLocation } from "./utils";

import type {
  ForestType,
  Location as FormLocation,
  LocateResult,
  ProjectResult,
} from "@geops/tree-lib/types";
import type { Coordinate } from "ol/coordinate";
import type { FeatureLike } from "ol/Feature";

import type { UserLocationData } from "@/pages/api/userlocations";
import type { TreeAppProfile } from "@/utils/types/definitions";

interface LocationCantonal {
  forestType: string;
  forestType_bl?: string;
  forestType_ch?: string;
  forestType_lu?: string;
  forestType_so?: string;
  forestType_vd?: string;
  info?: ForestType;
  info_bl?: string;
  info_ch?: string;
  info_lu?: string;
  info_so?: string;
  info_vd?: string;
  transition?: boolean;
  transitionForestType?: string;
}

export interface Location
  extends FormLocation,
    Omit<LocationCantonal, "forestType"> {
  coordinate: Coordinate;
  forestTypes?: LocationCantonal[];
}

export type ProjectionMode = "f" | "m";
export type ForestTypeModalType = "" | "c" | "d";
export interface ProjectionResult {
  extreme: ProjectResult;
  form: ProjectResult;
  moderate: ProjectResult;
}

export interface AppStore {
  activeProfile: TreeAppProfile;
  azLayer: string;
  consentGiven?: boolean | undefined;
  forestTypeComparison: string[];
  forestTypeDescription?: string;
  forestTypeModal: ForestTypeModalType;
  formLocation: FormLocation;
  future: boolean;
  langOverride: boolean | null;
  latinActive: boolean;
  location: Location;
  locationResult: LocateResult;
  mapLayers: string[];
  mapLocation: Location;
  mapView: string;
  profiles: string[];
  projectionMode: ProjectionMode;
  projectionResult: ProjectionResult;
  selectedFeature: FeatureLike | undefined;
  setActiveProfile: (data: TreeAppProfile) => void;
  setConsentGiven: (data: boolean) => void;
  setForestTypeComparison: (data: string[]) => void;
  setForestTypeDescription: (data: string) => void;
  setForestTypeModal: (data: ForestTypeModalType) => void;
  setFormLocation: (
    data: FormLocation,
    projectionMode?: ProjectionMode,
  ) => void;
  setFuture: (data: boolean) => void;
  setLatinActive: (data: boolean) => void;
  setLocation: (data: Location) => void;
  setLocationResult: (data: LocateResult) => void;
  setMapLayers: (data: string[]) => void;
  setMapLocation: (
    data: Partial<Location>,
    resetFormLocation?: boolean,
    resetMapLocation?: boolean,
    projectionMode?: ProjectionMode,
  ) => void;
  setMapView: (data: string) => void;
  setProjectionMode: (data: ProjectionMode) => void;
  setProjectionResult: (data: ProjectionResult) => void;
  setSelectedFeature: (data: FeatureLike | undefined) => void;
  setTargetAltitudinalZone: (data: string) => void;
  setTreeClient: (data: TreeClient) => void;
  setUserLocations: (data: UserLocationData) => void;
  setWelcomeModalOpen: (data: boolean) => void;
  targetAltitudinalZone: null | string;
  treeClient: TreeClient;
  userLocations: UserLocationData;
  welcomeModalOpen?: boolean;
}

const useStore = create<AppStore>(
  syncWithQueryString(
    runProject()((set) => {
      const isSSR = typeof window === "undefined";
      const lsConsentGiven = !isSSR
        ? localStorage.getItem("tree.consentGiven") === "true"
        : false;

      return {
        ...initialState,
        consentGiven: lsConsentGiven,
        setActiveProfile: (data) =>
          set(() => {
            window?.localStorage.setItem("tree.profile", data);
            return {
              activeProfile: data,
            };
          }),
        setConsentGiven: (data) => {
          window?.localStorage.setItem(
            "tree.consentGiven",
            data ? "true" : "false",
          );
          set(() => ({ consentGiven: data }));
        },
        setForestTypeComparison: (data, openModal = true) => {
          if (data?.length > 4) {
            data.splice(3, 1);
          }
          set((state: AppStore) => ({
            forestTypeComparison: data,
            forestTypeModal: data && openModal ? "c" : state.forestTypeModal,
          }));
        },
        setForestTypeDescription: (data, openModal = true) => {
          set((state: AppStore) => {
            const modalMode = data && openModal ? "d" : state.forestTypeModal;
            return {
              forestTypeDescription: data,
              forestTypeModal: modalMode,
            };
          });
        },
        setForestTypeModal: (data) => set(() => ({ forestTypeModal: data })),
        setFormLocation: (data, projectionMode) =>
          set((state: AppStore) => {
            const formLocation = getFormLocation(state, data);
            return {
              formLocation,
              projectionMode: projectionMode ?? state.projectionMode,
            };
          }),
        setFuture: (data) => set(() => ({ future: data })),
        setLatinActive: (data) => set(() => ({ latinActive: data })),
        setLocation: (data) => set(() => ({ location: data })),
        setLocationResult: (data) => set(() => ({ locationResult: data })),
        setMapLayers: (data: string[]) => {
          const azLayer = data.find((id) => getIsAz(id));
          set(() =>
            azLayer ? { azLayer, mapLayers: data } : { mapLayers: data },
          );
        },
        setMapLocation: (
          data,
          resetFormLocation,
          resetMapLocation,
          projectionMode,
        ) => {
          set((state: AppStore) => {
            const mapLocation: Location = resetMapLocation
              ? (data as Location)
              : { ...state.mapLocation, ...data };
            if (!mapLocation.forestType) {
              Object.keys(translation.profiles).forEach((profile) => {
                // Remove cantonal data when no forestType found
                delete mapLocation[`forestType_${profile as TreeAppProfile}`];
                delete mapLocation[`info_${profile as TreeAppProfile}`];
              });
            }

            return {
              formLocation: resetFormLocation
                ? emptyFormLocation
                : state.formLocation,
              mapLocation,
              projectionMode: projectionMode ?? "m",
            };
          });
        },
        setMapView: (data) => set(() => ({ mapView: data })),
        setProjectionMode: (data) => set(() => ({ projectionMode: data })),
        setProjectionResult: (data) => set(() => ({ projectionResult: data })),
        setSelectedFeature: (data) => {
          set(() => ({ selectedFeature: data }));
        },
        setTargetAltitudinalZone: (data) =>
          set(() => ({ targetAltitudinalZone: data })),
        setTreeClient: (data) => {
          set(() => ({ treeClient: data }));
        },
        setUserLocations: (data) => {
          set(() => ({ userLocations: data }));
        },
        setWelcomeModalOpen: (data) => {
          window?.localStorage.setItem(
            "tree.welcomeModal",
            data ? "open" : "close",
          );
          set(() => ({ welcomeModalOpen: data }));
        },
      };
    }),
  ),
);

export default useStore;
