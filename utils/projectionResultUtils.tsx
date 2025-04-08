import { reduceHochmontanAz } from "@geops/tree-lib";

import EarthExtreme from "@/components/icons/EarthExtreme";
import EarthModerate from "@/components/icons/EarthModerate";
import EarthToday from "@/components/icons/EarthToday";

import capitalize from "./capitalize";

import type { ProjectResult } from "@geops/tree-lib/types";

import type { TreeAppLanguage } from "@/i18n/i18next";
import type { Location, ProjectionMode, ProjectionResult } from "@/store";

type ProjectionScenarioString = "extreme" | "form" | "moderate";

export type LocationSubset = Pick<
  Location,
  | "altitudinalZone"
  | "forestType"
  | "targetAltitudinalZone"
  | "targetAltitudinalZoneExtreme"
  | "targetAltitudinalZoneModerate"
  | "transitionForestType"
>;

type Translate = (key: string) => string;

export function getProjectionResultLocation(
  scenario: ProjectResult,
  location: Location,
) {
  return scenario.projections
    ? scenario.projections.slice(-1)[0] || location
    : location;
}

function getProjectionResultKey(
  location: LocationSubset,
  projectionResult?: ProjectionResult,
  scenarioString?: ProjectionScenarioString,
) {
  const { altitudinalZone, forestType, transitionForestType } = location;
  const key = `${reduceHochmontanAz(altitudinalZone)}|${forestType}|${transitionForestType}`;

  if (!projectionResult || !scenarioString) {
    return key;
  }
  const projection = projectionResult?.[scenarioString];
  /**
   * By default we fall back to the current (today) location in getProjectionResultLocation,
   * which can result in different map TAZ and projectionResult AZ. Here we check for two conditions:
   * - No projections were found for the scenario
   * - The fallback AZ is different to the map TAZ
   * If the conditions are met we return null and surpress the scenario column creation
   */
  return !(
    projection &&
    !projection.projections?.slice(-1)[0] &&
    location.altitudinalZone !==
      location[
        `targetAltitudinalZone${capitalize(scenarioString)}` as keyof LocationSubset
      ]
  )
    ? key
    : null;
}

export function getScenarios<T>(
  location: Location,
  projectionMode: ProjectionMode,
  projectionResult: ProjectionResult,
  language: TreeAppLanguage,
  t: Translate,
  scenarioCallback: (
    scenario: string,
    location: LocationSubset,
    language: TreeAppLanguage,
    t: Translate,
  ) => null | T = () => null,
): T[] {
  const scenarios: T[] = [];
  if (projectionMode === "f" && projectionResult.form.projections) {
    const form = projectionResult.form.projections.slice(-1)[0] || {};
    scenarios.push(scenarioCallback("today", location, language, t)!);
    scenarios.push(scenarioCallback("form", form, language, t)!);
  } else {
    const moderate = getProjectionResultLocation(
      projectionResult.moderate,
      location,
    );
    const extreme = getProjectionResultLocation(
      projectionResult.extreme,
      location,
    );

    const todayKey = getProjectionResultKey(location);
    const moderateKey = getProjectionResultKey(
      moderate,
      projectionResult,
      "moderate",
    );
    const extremeKey = getProjectionResultKey(
      extreme,
      projectionResult,
      "extreme",
    );
    if (
      (!moderateKey && !extremeKey) ||
      (!projectionResult.moderate.projections &&
        !projectionResult.extreme.projections)
    ) {
      return scenarios;
    }

    if (moderateKey === extremeKey && todayKey === moderateKey) {
      scenarios.push(
        scenarioCallback("todayModerateExtreme", location, language, t)!,
      );
    } else if (moderateKey === extremeKey) {
      scenarios.push(scenarioCallback("today", location, language, t)!);
      scenarios.push(
        scenarioCallback("moderateExtreme", moderate, language, t)!,
      );
    } else if (todayKey === moderateKey) {
      scenarios.push(scenarioCallback("todayModerate", location, language, t)!);
      scenarios.push(scenarioCallback("extreme", extreme, language, t)!);
    } else if (todayKey === extremeKey) {
      scenarios.push(scenarioCallback("todayExtreme", location, language, t)!);
      scenarios.push(scenarioCallback("moderate", moderate, language, t)!);
    } else if (!extremeKey && moderateKey === todayKey) {
      scenarios.push(scenarioCallback("todayModerate", location, language, t)!);
    } else if (!moderateKey && extremeKey === todayKey) {
      scenarios.push(scenarioCallback("todayExtreme", location, language, t)!);
    } else if (!extremeKey && moderateKey) {
      scenarios.push(scenarioCallback("today", location, language, t)!);
      scenarios.push(scenarioCallback("moderate", moderate, language, t)!);
    } else if (extremeKey && !moderateKey) {
      scenarios.push(scenarioCallback("today", location, language, t)!);
      scenarios.push(scenarioCallback("extreme", moderate, language, t)!);
    } else {
      scenarios.push(scenarioCallback("today", location, language, t)!);
      scenarios.push(scenarioCallback("moderate", moderate, language, t)!);
      scenarios.push(scenarioCallback("extreme", extreme, language, t)!);
    }
  }
  return scenarios;
}

export function getScenarioButtonContent(scenario: string, t: Translate) {
  const icons = [];
  const names = [];
  if (scenario.toLowerCase().includes("today")) {
    icons.push(<EarthToday key="today" />);
    names.push(t("projectionScenario.today"));
  }
  if (scenario.toLowerCase().includes("form")) {
    names.push(t("projectionScenario.manual"));
  }
  if (scenario.toLowerCase().includes("moderateextreme")) {
    icons.push(<EarthModerate key="mod" />);
    icons.push(<EarthExtreme key="extreme" />);
    names.push(t("projectionScenario.moderateExtreme"));
  } else if (scenario.toLowerCase().includes("moderate")) {
    icons.push(<EarthModerate key="mod" />);
    names.push(t("projectionScenario.moderate"));
  } else if (scenario.toLowerCase().includes("extreme")) {
    icons.push(<EarthExtreme key="extreme" />);
    names.push(t("projectionScenario.extreme"));
  }
  return { icons, key: scenario, names };
}
