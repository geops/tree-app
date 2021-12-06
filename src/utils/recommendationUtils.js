import { recommend } from '@geops/tree-lib';

export const getRecommendation = (
  location,
  projectionResult,
  projectionMode,
  future,
  sameAltitudinalZone,
) => {
  let projections;
  let result;

  if (projectionMode === 'f') {
    projections = projectionResult.form.projections?.slice(-1) || [];
  } else {
    const { moderate, extreme } = projectionResult;
    projections = [
      ...(moderate.projections ? moderate.projections.slice(-1) : [location]),
      ...(extreme.projections ? extreme.projections.slice(-1) : [location]),
    ];
  }

  try {
    if ((projections && projections.length === 0) || sameAltitudinalZone) {
      result = recommend(location, [location], future);
    } else {
      result = recommend(location, projections, future);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Recommendation error: ', error);
  }
  return result;
};

const utils = {
  getRecommendation,
};

export default utils;
