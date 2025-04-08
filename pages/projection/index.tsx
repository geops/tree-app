import { reduceHochmontanAz } from "@geops/tree-lib";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import ProjectionMode from "@/components/FormHeader";
import ProjectionForm from "@/components/ProjectionForm";
import MissingDataMessage from "@/components/ProjectionForm/MissingDataMessage";
import ProjectionResult from "@/components/ProjectionResult";
import UserLocationInfo from "@/components/UserLocationInfo";
import useStore from "@/store";
import { getScenarios } from "@/utils/projectionResultUtils";

import type { AltitudinalZoneCode } from "@geops/tree-lib/types";

import type { Scenario } from "@/components/ProjectionResult/Scenarios";
import type { TreeAppLanguage } from "@/i18n/i18next";

function Projection() {
  const location = useStore((state) => state.location);
  const projectionResult = useStore((state) => state.projectionResult);
  const projectionMode = useStore((state) => state.projectionMode);
  const { i18n, t } = useTranslation();

  const AZToday = reduceHochmontanAz(
    location.altitudinalZone,
  ) as AltitudinalZoneCode;
  const TAZModerate = reduceHochmontanAz(
    location.targetAltitudinalZoneModerate,
  ) as AltitudinalZoneCode;
  const TAZExtreme = reduceHochmontanAz(
    location.targetAltitudinalZoneExtreme,
  ) as AltitudinalZoneCode;
  const sameAltitudinalZone = AZToday === TAZModerate && AZToday === TAZExtreme;

  const scenarios = useMemo(
    () =>
      getScenarios<Scenario>(
        location,
        projectionMode,
        projectionResult,
        i18n.language as TreeAppLanguage,
        t,
        (scenario, projection) => ({
          name: scenario,
          projection: projection,
        }),
      ),
    [i18n.language, location, projectionMode, projectionResult, t],
  );
  const foundProjection =
    location.altitudinalZone && (sameAltitudinalZone || scenarios.length > 2);

  return (
    <div className="flex h-full flex-col">
      <ProjectionMode />
      {!foundProjection && (
        <div className="px-4">
          <MissingDataMessage />
        </div>
      )}
      <UserLocationInfo className="mb-4 px-5" needsUrlId />
      <ProjectionForm />
      <ProjectionResult
        sameAltitudinalZone={sameAltitudinalZone}
        scenarios={scenarios}
      />
    </div>
  );
}

export default Projection;
