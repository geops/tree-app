import project from './project.mjs';
import mappings from './mappings/index.mjs';
import types from '../data/types.json';

const { ch } = types;
const hochmontanAltitudinalZones = ['81', '82', '83'];

const getFirstLetterIndex = (string) => string.match(/\D/)?.index;

const sortForestTypes = (optA, optB) => {
  const numberA = getFirstLetterIndex(optA.code)
    ? optA.code.slice(0, getFirstLetterIndex(optA.code))
    : optA.code;
  const numberB = getFirstLetterIndex(optB.code)
    ? optB.code.slice(0, getFirstLetterIndex(optB.code))
    : optB.code;
  return parseInt(numberA, 10) - parseInt(numberB, 10);
};

const getMapping = (type, profile) => {
  if (!type || !profile) {
    throw new Error('type and profile need to be specified.');
  }
  let result = mappings[profile];
  if (!result) {
    throw new Error(`${profile} is not a valid profile for ${type}.`);
  }
  result = result[type];
  if (!result) {
    throw new Error(`${type} is not a valid type.`);
  }
  return result;
};

const getReliefImageUrl = (code, profile) => {
  if (!code || !profile) {
    throw new Error('Code and profile need to be specified.');
  }
  const profileReliefMapping = getMapping('relief', profile);
  if (!profileReliefMapping) {
    throw new Error(`${profile} is not a valid profile for relief.`);
  }
  const imageName = profileReliefMapping.find((string) => {
    const forestTypeCodeNumber = code.slice(
      0,
      getFirstLetterIndex(code) || code.length,
    );
    const forestTypes = string.split(',');
    return forestTypes.includes(forestTypeCodeNumber);
  });
  return imageName && `/images/${profile}/relief/${imageName}.png`;
};

const getAZ = (altitudinalZone) => {
  if (hochmontanAltitudinalZones.includes(altitudinalZone)) {
    return '80';
  }
  return altitudinalZone;
};

const getResultLocation = (scenario, location) =>
  scenario.projections
    ? scenario.projections.slice(-1)[0] || location
    : location;

const getResultKey = (location) => {
  const { altitudinalZone, forestType, transitionForestType } = location;
  return `${getAZ(altitudinalZone)}|${forestType}|${transitionForestType}`;
};

const runProject = (location, targetAltitudinalZone) => {
  let newTargetAltitudinalZone = targetAltitudinalZone;
  let { silverFirArea } = location;
  if (hochmontanAltitudinalZones.includes(targetAltitudinalZone)) {
    silverFirArea = targetAltitudinalZone.slice(1);
    newTargetAltitudinalZone = '80';
  }
  const newLocation = { ...location, silverFirArea };
  return project(newLocation, newTargetAltitudinalZone);
};

const nonresidents = (c) => ch.treeType.find((t) => t.code === c).nonresident;
const residents = (c) => !ch.treeType.find((t) => t.code === c).nonresident;
const sortTreeTypes = (lists) =>
  lists.map((trees) =>
    trees
      .sort((a, b) => a - b) // by number
      .filter(residents)
      .concat(trees.filter(nonresidents)),
  );

const findForestType = (c) => ch.forestType.find((f) => f.code === c);

const allUtils = {
  hochmontanAltitudinalZones,
  getFirstLetterIndex,
  sortForestTypes,
  getMapping,
  getReliefImageUrl,
  getAZ,
  getResultLocation,
  getResultKey,
  runProject,
  sortTreeTypes,
  findForestType,
};

const utils = () => allUtils;

export default utils;
