import useStore from "@/store";
import { Location, ProjectionMode, ProjectionResult } from "@/store";

function getRecommendation(
  location: Location,
  projectionMode: ProjectionMode,
  projectionResult: ProjectionResult,
  future: boolean,
  sameAltitudinalZone?: boolean | undefined,
) {
  const { activeProfile, treeClient } = useStore.getState();

  let projections;
  let result;

  if (projectionMode === "f") {
    projections = projectionResult.form.projections?.slice(-1) ?? [];
  } else {
    const { extreme, moderate } = projectionResult;
    projections = [
      ...(moderate.projections ? moderate.projections.slice(-1) : [location]),
      ...(extreme.projections ? extreme.projections.slice(-1) : [location]),
    ];
  }

  try {
    if ((projections && projections.length === 0) || sameAltitudinalZone) {
      result = treeClient.recommend(
        location,
        [location],
        future,
        activeProfile,
      );
    } else {
      result = treeClient.recommend(
        location,
        projections,
        future,
        activeProfile,
      );
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Recommendation error: ", error);
  }
  return result;
}

export default getRecommendation;
