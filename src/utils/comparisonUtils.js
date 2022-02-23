import { info } from '@geops/tree-lib';
import parse from 'html-react-parser';

export const parseString = (str) =>
  str && parse(str.slice().replace(/\\n/g, '<br>'));

export const getStringWithUnit = (data, unit) => {
  if (Array.isArray(data)) {
    return data.every((val) => val !== null && val !== undefined)
      ? `${data.join(' - ')}${unit || ''}`
      : '-';
  }
  return data ? parseString(`${data}${unit || ''}`) : '-';
};

export const getComparisonForestTypes = (
  previousForestTypes = [],
  newForestType,
) => {
  let comparison = [...new Set([...previousForestTypes, newForestType])];
  if (comparison.length > 4) {
    // If comparison exceeds 4 types, replace the last forest type with the new one
    comparison = [...comparison.slice(0, 3), newForestType];
  }
  return comparison;
};

export const getValidForestTypes = (codes = [], activeProfile = 'ch') =>
  codes.reduce((forestTypes, code) => {
    try {
      const nextFt = info('forestType', code, activeProfile);
      return [...forestTypes, nextFt];
    } catch {
      // eslint-disable-next-line no-console
      console.error(
        new Error(
          `${code} is not a valid forest type in ${activeProfile} profile`,
        ),
      );
      return forestTypes;
    }
  }, []);
