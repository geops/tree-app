import { Coordinate } from "ol/coordinate";

import { profiles } from ".";

export type ForestEcoregionCode =
  | "1"
  | "2a"
  | "2b"
  | "3"
  | "4"
  | "5a"
  | "5b"
  | "J"
  | "M"
  | "Me";
export type ReliefCode = "h_and_m" | "kup" | "normal" | "unknown";
export type SlopeCode =
  | "<20"
  | "<60"
  | "<70"
  | ">20"
  | ">60"
  | ">70"
  | "unknown";

export type OneOrTwo = 1 | 2;
export type YesNoUnknown = "no" | "unknown" | "yes";
export type SilverFirAreaCode = "1" | "2" | "3" | "unknown";
export type AltitudinalZoneCode =
  | "0"
  | "10"
  | "100"
  | "20"
  | "30"
  | "40"
  | "50"
  | "60"
  | "70"
  | "80"
  | "90";

export type TreeLocationGroup =
  | "main"
  | "pioneer"
  | "riverside"
  | "special"
  | "volatile";

export type OneTwoThreeNull = 1 | 2 | 3 | null;

export interface Location {
  additional?: string;
  altitudinalZone?: AltitudinalZoneCode;
  aspects?: string[];
  carbonateFine?: YesNoUnknown;
  carbonateRock?: YesNoUnknown;
  coniferTreeHeightMax?: number;
  coordinate?: Coordinate;
  deciduousTreeHeightMax?: number;
  forestEcoregion?: ForestEcoregionCode;
  forestType?: string;
  geomorphologyBlockyRockyLittle?: boolean;
  geomorphologyBlockyRockyStrong?: boolean;
  geomorphologyLimestonePavement?: boolean;
  geomorphologyRockBand?: boolean;
  geomorphologyRocksModeratelyMoved?: boolean;
  geomorphologyRocksStabilised?: boolean;
  geomorphologyRocksStronglyMoved?: boolean;
  groups?: TreeLocationGroup[];
  indicators?: string[];
  relief?: ReliefCode;
  reliefTypeCentralSlope?: boolean;
  reliefTypeDome?: boolean;
  reliefTypeHollow?: boolean;
  reliefTypePlateau?: boolean;
  reliefTypeSteep?: boolean;
  silverFirArea?: SilverFirAreaCode;
  slope?: SlopeCode;
  slopes?: SlopeCode[];
  targetAltitudinalZone?: AltitudinalZoneCode;
  targetAltitudinalZoneExtreme?: AltitudinalZoneCode;
  targetAltitudinalZoneModerate?: AltitudinalZoneCode;
  transition?: boolean;
  transitionAltitudinalZone?: AltitudinalZoneCode;
  transitionForestType?: string;
  treeTypes?: string[];
}

export interface TypesRecord extends Record<string, string> {
  code: string;
}

export interface ForestType {
  altitude?: number[][];
  altitudinalzoneforestecoregion?: number[][];
  aspect?: number[];
  carbonate?: number[];
  code: string;
  de?: string;
  fr?: string;
  geomorphology?: number[];
  graininess?: number[];
  group_main?: boolean;
  group_pioneer?: boolean;
  group_riverside?: boolean;
  group_special?: boolean;
  group_volatile?: boolean;
  height?: number[];
  hummus?: number[][];
  humusvariants?: number[];
  la?: string;
  location_de?: string;
  location_fr?: string;
  naturalforest_de?: string;
  naturalforest_fr?: string;
  process?: number[];
  rawmaterial?: number[];
  relieftype?: number[];
  skeletalfrationsoildepth?: number[][];
  slope?: number[];
  soil?: number[][];
  soilvariants?: number[];
  soilwetnessgroundwater?: number[][];
  soilwetnesstailwater?: number[][];
  water?: number[];
}

export interface LuForestType {
  aptitude: string;
  associationgroupcode: string;
  code: string;
  compactrisk: 1 | 2 | 3 | 4 | 5;
  de?: string;
  description: string;
  expoandaspect: (0 | 1 | 2)[];
  forestrycare: string;
  forestryrejuvdev: string;
  heightdispersion: string;
  la?: string;
  pioneertreetypes: string[];
  priority?: number | string;
  soil: OneTwoThreeNull[];
  tillering: [number[][], null | number[][]];
  tilleringfirwood: string[];
  tilleringhardwood: number[];
  vegetation: string;
  vegetationindicator: OneTwoThreeNull[];
}

export interface LuAssociationGroup {
  aptitudemeaning: string;
  code: string;
  de: string;
  description: string;
  heightdispersion: string;
  la: string;
  location: string;
  soil: string;
}

export interface BlForestType {
  code: string;
  de?: string;
  descriptionnaturalforest: string;
  expoandaspect: (0 | 1 | null)[];
  forestrycare: string;
  forestryrejuvdev: string;
  geology: string;
  heightdispersion: string;
  la?: string;
  location: string;
  properties: string;
  tillering: string;
  tilleringhardwood: string;
  tilleringtreetypes: ("D" | "G" | "N" | "S" | null)[];
  transitions: string[];
  vegetation: string;
  vegetationindicator: OneTwoThreeNull[];
}

export interface BlAssociationGroup {
  areabl: string;
  areablbspercent: string;
  areabs: string;
  category: string;
  de: string;
  description: string;
  forestappearance: string;
  heightdispersion: string;
  locations: string[];
  useandcare: string;
}

export interface SoForestType {
  altitudinalzonefuture: AltitudinalZoneCode;
  code: string;
  codenaisfuture: string;
  codesnaispresent: string[];
  codesofuture: string;
  codessopresent: string[];
  de?: string;
  haspdf: boolean;
}

export interface TranslatedTypeRecord {
  code: string;
  de?: string;
  fr?: string;
}

export interface SilverFirArea extends Omit<TranslatedTypeRecord, "code"> {
  code: SilverFirAreaCode;
}

export interface VegetationInfo {
  bush: number[][];
  herb: number[][];
  moss: number[][];
}

export interface TranslatedTypeRecordLatin extends TranslatedTypeRecord {
  la?: string;
}

export interface Recommendation {
  recommendations: number[][];
}

export interface AltitudinalZone extends Omit<TranslatedTypeRecord, "code"> {
  code: AltitudinalZoneCode;
  id: number;
}

export interface ForestEcoregion extends Omit<TranslatedTypeRecord, "code"> {
  code: ForestEcoregionCode;
}

export interface TreeType extends Omit<TranslatedTypeRecordLatin, "code"> {
  code: number;
  endangered: 0 | 1;
  nonresident: 0 | 1;
  pioneer: 0 | 1;
}

export interface ProjectionQueryResult {
  additional: string;
  altitudinalzone: AltitudinalZoneCode;
  forestecoregion: ForestEcoregionCode;
  foresttype: string;
  relief: ReliefCode;
  silverfirarea: SilverFirAreaCode;
  slope: SlopeCode;
  targetaltitudinalzone: AltitudinalZoneCode;
  targetforesttype: string;
}

export interface ProjectOptions {
  additional?: string[];
  altitudinalZone?: AltitudinalZoneCode[];
  forestEcoregion?: ForestEcoregionCode[];
  forestType?: string[];
  relief?: ReliefCode[];
  silverFirArea?: SilverFirAreaCode[];
  slope?: SlopeCode[];
  targetAltitudinalZone?: AltitudinalZoneCode[];
  transitionAltitudinalZone?: AltitudinalZoneCode[];
  transitionForestType?: string[];
}

export interface LocateOptions {
  altitudinalZone?: AltitudinalZoneCode[];
  forestEcoregion?: ForestEcoregionCode[];
  indicator?: string[];
  silverFirArea?: SilverFirAreaCode[];
  treeType?: string[];
}

export type ProjectOptionKey = keyof ProjectOptions;

export interface ProjectProjection {
  altitudinalZone: AltitudinalZoneCode;
  forestType: string;
}

export interface ProjectResult {
  options: ProjectOptions;
  projections?: ProjectProjection[];
}

export type TreeAppProfile = (typeof profiles)[number];

export interface Ecogram {
  a?: boolean;
  foresttypes: string[];
  h: number;
  id: number;
  ox?: null | number;
  oy?: null | number;
  r?: null | number;
  w: number;
  x: number;
  y: number;
  z: number;
}

export interface LocateResult {
  ecogram: Ecogram[];
  forestTypes?: Record<TreeLocationGroup, string[]>;
  options: LocateOptions;
}

export interface ProfileMappings {
  additionalInfo?: Record<number, string>;
  relief?: string[];
  soil?: string[];
  transition?: Record<string, string[]>;
  treeTypes?: string[];
  vegetation?: string[];
}

export type CantonalMappings = Partial<Record<TreeAppProfile, ProfileMappings>>;
