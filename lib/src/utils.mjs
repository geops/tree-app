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

/**
 * @param {string} type A type of mapping (see lib/src/mappings.index.mjs)
 * @param {string} profile A valid tree-app profile with relief mapping
 * @returns {array|object} image path
 */
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

/**
 * @param {string} code A valid forest type code
 * @param {string} activeProfile A valid tree-app profile with relief mapping
 * @param {boolean} trimCode Only uses the base code number when set to true (12a => 12)
 * @returns {string} image path
 */
const getReliefImageUrl = (code, profile, trimCode = false) => {
  if (!code || !profile) {
    throw new Error('Code and profile need to be specified.');
  }
  const profileReliefMapping = getMapping('relief', profile);
  if (!profileReliefMapping) {
    throw new Error(`${profile} is not a valid profile for relief.`);
  }
  const imageName = profileReliefMapping.find((string) => {
    let forestTypeCodeNumber = code;
    if (trimCode) {
      forestTypeCodeNumber = code.slice(
        0,
        getFirstLetterIndex(code) || code.length,
      );
    }
    const forestTypes = string.split(',');
    return forestTypes.includes(forestTypeCodeNumber);
  });
  return imageName && `/images/${profile}/relief/${imageName}.png`;
};

/**
 * @param {string} imagePath A valid path to an image
 * @returns {Promise} A promise, resolving in an <img>
 */
const getImageHtml = (imagePath) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject();
    img.src = imagePath;
  });

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

const reduceHochmontanAz = (targetAltitudinalZone) =>
  hochmontanAltitudinalZones.includes(targetAltitudinalZone)
    ? '80'
    : targetAltitudinalZone;

const reduceHochmontanSilverFir = (targetAltitudinalZone, silverFirArea) =>
  hochmontanAltitudinalZones.includes(targetAltitudinalZone)
    ? targetAltitudinalZone.slice(1)
    : silverFirArea;

const reduceHochmontanLocation = (location, targetAltitudinalZone) => ({
  ...location,
  silverFirArea: reduceHochmontanSilverFir(
    targetAltitudinalZone,
    location.silverFirArea,
  ),
  altitudinalZone: reduceHochmontanAz(targetAltitudinalZone),
});

const runProject = (location, targetAltitudinalZone) => {
  const newTargetAltitudinalZone = reduceHochmontanAz(targetAltitudinalZone);
  const newLocation = reduceHochmontanLocation(
    location,
    location.altitudinalZone,
  );
  return project(newLocation, newTargetAltitudinalZone);
};

const getAZ = (altitudinalZone) => reduceHochmontanAz(altitudinalZone);

const getProjectionResultLocation = (scenario, location) =>
  scenario.projections
    ? scenario.projections.slice(-1)[0] || location
    : location;

const getProjectionResultKey = (location) => {
  const { altitudinalZone, forestType, transitionForestType } = location;
  return `${getAZ(altitudinalZone)}|${forestType}|${transitionForestType}`;
};

const allUtils = {
  hochmontanAltitudinalZones,
  getFirstLetterIndex,
  sortForestTypes,
  getMapping,
  getReliefImageUrl,
  getImageHtml,
  sortTreeTypes,
  findForestType,
  reduceHochmontanAz,
  reduceHochmontanSilverFir,
  reduceHochmontanLocation,
  runProject,
  getProjectionResultLocation,
  getProjectionResultKey,
  getAZ,
};

const utils = () => allUtils;

export default utils;
