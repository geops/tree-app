/* eslint-disable no-unused-vars */
import { AltitudinalZoneCode, ForestEcoregionCode } from "../types";

type AzLookup = {
  [key in AltitudinalZoneCode]?: string;
};
type AzFeLookup = {
  [key in ForestEcoregionCode]: AzLookup;
};

export const altitudinalZoneForestEcoregionLookup: AzFeLookup = {
  1: {
    100: "2.6",
    20: "2.0",
    40: "2.1",
    50: "2.2",
    60: "2.3",
    80: "2.4",
    90: "2.5",
  },
  "2a": {
    100: "3.6",
    20: "3.0",
    40: "3.1",
    50: "3.2",
    60: "3.3",
    80: "3.4",
    90: "3.5",
  },
  "2b": {
    100: "4.5",
    20: "4.0",
    80: "4.1",
    90: "4.4",
  },
  3: {
    100: "5.2",
    80: "5.0",
    90: "5.1",
  },
  4: {
    100: "6.3",
    40: "6.0",
    80: "6.1",
    90: "6.2",
  },
  "5a": {
    10: "7.0",
    100: "7.6",
    20: "7.1",
    30: "7.2",
    70: "7.3",
    80: "7.4",
    90: "7.5",
  },
  "5b": {
    10: "8.0",
    30: "8.1",
    70: "8.2",
    90: "8.3",
  },
  J: {
    20: "0.0",
    40: "0.1",
    50: "0.2",
    60: "0.3",
    80: "0.4",
  },
  M: {
    20: "1.0",
    40: "1.1",
    50: "1.2",
    60: "1.3",
    80: "1.4",
  },
  Me: {
    10: "9.0",
    30: "9.1",
  },
};
export const aspectLookup = [
  "001-025",
  "026-050",
  "051-075",
  "076-100",
  "101-125",
  "126-150",
  "151-175",
  "176-200",
  "201-225",
  "226-250",
  "251-275",
  "276-300",
  "301-325",
  "326-350",
  "351-375",
  "376-400",
];
export const slopeLookup = [
  "000-010",
  "010-025",
  "025-050",
  "050-075",
  "075-100",
  "100",
];

const lookups = {
  altitudinalZoneForestEcoregionLookup,
  aspectLookup,
  slopeLookup,
};

export default lookups;
