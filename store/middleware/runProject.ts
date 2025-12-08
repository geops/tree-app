import { reduceHochmontanAz, reduceHochmontanSilverFir } from "@geops/tree-lib";

import merge from "@/utils/merge";
import removeIdUrlParam from "@/utils/removeIdUrlParam";

import initialState, { initialProjection } from "../utils";

import type {
  AltitudinalZoneCode,
  LocateResult,
  ProjectResult,
  SilverFirAreaCode,
} from "@geops/tree-lib/types";
import type { StateCreator } from "zustand";

import type { Location } from "../index";
import type { AppStore, ProjectionResult } from "../index";

const triggerFields = [
  "activeProfile",
  "mapLocation",
  "formLocation",
  "projectionMode",
];

function runProject() {
  return (create: StateCreator<AppStore>): StateCreator<AppStore> =>
    (set, get, api) => {
      let prevState = get(); // Store the previous state
      let isMiddlewareUpdating = false; // Flag to track middleware-originated updates
      let isFirstRun = true;

      const wrappedSet: typeof set = (partial, replace) => {
        const result = set(partial, replace as false | undefined);

        if (!isMiddlewareUpdating) {
          const newState = get(); // Get the updated state
          isMiddlewareUpdating = true;
          // Determine updated fields
          const updatedFields = Object.entries(newState).reduce(
            (acc, [key, value]) => {
              if (prevState && prevState[key as keyof AppStore] !== value) {
                return [...acc, key];
              }
              return acc;
            },
            [] as string[],
          );

          // We run the projection when the location data changes and when the app loads
          if (
            triggerFields.some((field) => updatedFields.includes(field)) ||
            isFirstRun
          ) {
            const {
              activeProfile,
              formLocation,
              mapLocation,
              projectionMode,
              setLocation,
              setLocationResult,
              setProjectionResult,
              setSelectedFeature,
              treeClient,
            } = newState;
            const location =
              projectionMode === "m"
                ? { ...mapLocation }
                : (merge(mapLocation, formLocation, false) as Location);

            if (!isFirstRun) {
              removeIdUrlParam();
              setSelectedFeature(undefined);
            }

            if (
              projectionMode === "m" &&
              location.transition &&
              !location.transitionAltitudinalZone
            ) {
              location.transitionAltitudinalZone =
                formLocation.transitionAltitudinalZone;
            }

            if (projectionMode === "m" && !!formLocation.additional) {
              location.additional = formLocation.additional;
            }

            if (
              projectionMode === "m" &&
              mapLocation.altitudinalZone &&
              !mapLocation.forestType &&
              formLocation.forestType
            ) {
              location.forestType = formLocation.forestType;
            }

            if (
              projectionMode === "m" &&
              formLocation.transition &&
              !mapLocation.transition
            ) {
              location.transition = true;
              location.transitionForestType = formLocation.transitionForestType;
              location.transitionAltitudinalZone =
                formLocation.transitionAltitudinalZone;
            }

            if (projectionMode === "m" || !formLocation.silverFirArea) {
              location.silverFirArea = reduceHochmontanSilverFir(
                location.altitudinalZone,
                location.silverFirArea,
              ) as SilverFirAreaCode;
            }
            if (projectionMode === "m" || !formLocation.altitudinalZone) {
              location.altitudinalZone = reduceHochmontanAz(
                location.altitudinalZone,
              ) as AltitudinalZoneCode;
            }

            if (projectionMode === "f" && !formLocation.targetAltitudinalZone) {
              location.targetAltitudinalZone =
                mapLocation.targetAltitudinalZoneModerate;
            }

            if (!location.transition) {
              delete location.transitionForestType;
              delete location.transitionAltitudinalZone;
            }

            setLocation(location);

            const locationResult = treeClient.locate(
              merge(mapLocation, formLocation, false),
              activeProfile,
            ) as LocateResult;

            setLocationResult(locationResult);
            const projectionResult: ProjectionResult = {
              ...initialState.projectionResult,
            };
            try {
              if (projectionMode === "m") {
                const {
                  targetAltitudinalZoneExtreme: targetAZExtreme,
                  targetAltitudinalZoneModerate: targetAZModerate,
                } = mapLocation;
                projectionResult.moderate = (
                  targetAZModerate
                    ? treeClient.project(
                        location,
                        targetAZModerate,
                        undefined,
                        activeProfile,
                      )
                    : initialProjection
                ) as ProjectResult;
                projectionResult.extreme = (
                  targetAZExtreme
                    ? treeClient.project(
                        location,
                        targetAZExtreme,
                        undefined,
                        activeProfile,
                      )
                    : initialProjection
                ) as ProjectResult;
              } else {
                const { targetAltitudinalZone: targetAZForm } = location;
                projectionResult.form = treeClient.project(
                  location,
                  targetAZForm,
                  undefined,
                  activeProfile,
                ) as ProjectResult;
              }
            } catch (error) {
              console.log("Projection error: ", error);
            }
            setProjectionResult(projectionResult);
          }
          isMiddlewareUpdating = false; // Reset the flag
          isFirstRun = false;
          prevState = newState; // Update the previous state
        }
        return result;
      };

      // Return the modified store with the wrapped set function
      return create(wrappedSet, get, api);
    };
}

export default runProject;
