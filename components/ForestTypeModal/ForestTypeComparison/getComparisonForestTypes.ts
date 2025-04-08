function getComparisonForestTypes(
  previousForestTypes: string[] = [],
  newForestType: string,
) {
  let comparison = [...new Set([newForestType, ...previousForestTypes])];
  if (comparison.length > 4) {
    // If comparison exceeds 4 types, replace the last forest type with the new one
    comparison = [...comparison.slice(0, 3), newForestType];
  }
  return comparison;
}

export default getComparisonForestTypes;
