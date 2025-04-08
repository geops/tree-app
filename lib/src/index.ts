import { version as treeLibVersion } from "../package.json";

import TreeClient from "./TreeClient/index";
import { CantonalMappings } from "./types";
import helpers from "./utils";
import {
  primaryProjectionFields as primary,
  secondaryProjectionFields as secondary,
} from "./utils";
import mappings from "./utils/mappings";

const {
  reduceHochmontanAz: reduceHochmontanAzHelper,
  reduceHochmontanLocation: reduceHochmontanLocationHelper,
  reduceHochmontanSilverFir: reduceHochmontanSilverFirHelper,
  safeJsonParse: jsonParseHelper,
} = helpers;

export const profiles = ["bl", "ch", "lu", "so", "vd"] as const;

export const version = treeLibVersion;
export const safeJsonParse = jsonParseHelper;
export const reduceHochmontanAz = reduceHochmontanAzHelper;
export const reduceHochmontanLocation = reduceHochmontanLocationHelper;
export const reduceHochmontanSilverFir = reduceHochmontanSilverFirHelper;
export const primaryProjectionFields = primary;
export const secondaryProjectionFields = secondary;

export const cantonalMappings: CantonalMappings = mappings;

export default TreeClient;
