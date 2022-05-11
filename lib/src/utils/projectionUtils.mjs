import project from '../project.mjs';

const hochmontanAltitudinalZones = ['81', '82', '83'];

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

const utils = {
  hochmontanAltitudinalZones,
  getAZ,
  getResultLocation,
  getResultKey,
  runProject,
};

export default utils;
