import { Trans, useTranslation } from "react-i18next";

import useStore from "@/store";

import Recommendation from "./Recommendation";
import Scenarios from "./Scenarios";

import type { ProjectOptionKey } from "@geops/tree-lib/types";

import type { Scenario } from "./Scenarios";

const checkFields: ProjectOptionKey[] = ["slope", "additional", "relief"];

function ProjectionResult({
  sameAltitudinalZone = false,
  scenarios = [],
}: {
  sameAltitudinalZone?: boolean;
  scenarios?: Scenario[];
}) {
  const { t } = useTranslation();
  const location = useStore((state) => state.location);
  const mapLocation = useStore((state) => state.mapLocation);
  const { options } = useStore((state) =>
    state.projectionMode === "m"
      ? state.projectionResult?.extreme
      : state.projectionResult.form,
  );

  const showResult = location.altitudinalZone && location.forestType;
  if (!showResult) return null;

  const showScenarios = sameAltitudinalZone || scenarios.length > 1;
  const checkField =
    showScenarios === false &&
    checkFields.find(
      (field) =>
        Array.isArray(options[field]) &&
        options[field].filter((o) => o !== "unknown").length > 0,
    );
  return (
    <div className="relative z-40 mt-8 grow bg-primary-500 shadow-[0_0_20px_#777]">
      {showScenarios ? (
        <>
          <Scenarios scenarios={scenarios} />
          <Recommendation sameAltitudinalZone={sameAltitudinalZone} />
        </>
      ) : (
        <div className="px-5 py-4 text-white">
          <h3>
            {t(
              checkField
                ? `recommendation.checkField`
                : "recommendation.noProjectionFound",
              { field: t(`${checkField}.label`) },
            )}
          </h3>
          {mapLocation.forestType && (
            <p>
              <Trans i18nKey="recommendation.checkMapLocation" />
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default ProjectionResult;
