import React from 'react';
import { hochmontanAltitudinalZones } from '../store/enhancers/projection';
import { ReactComponent as EarthExtremeIcon } from '../icons/earthExtreme.svg';
import { ReactComponent as EarthModerateIcon } from '../icons/earthModerate.svg';
import { ReactComponent as EarthTodayIcon } from '../icons/earthToday.svg';

export const getAZ = (altitudinalZone) => {
  if (hochmontanAltitudinalZones.includes(altitudinalZone)) {
    return '80';
  }
  return altitudinalZone;
};

export const getResultLocation = (scenario, location) =>
  scenario.projections
    ? scenario.projections.slice(-1)[0] || location
    : location;

export const getResultKey = (location) => {
  const { altitudinalZone, forestType, transitionForestType } = location;
  return `${getAZ(altitudinalZone)}|${forestType}|${transitionForestType}`;
};

const styleIcon = { fontSize: '0.8em' };

export const getScenarios = (scenario, t) => {
  const icons = [];
  const names = [];
  if (scenario.toLowerCase().includes('today')) {
    icons.push(
      <EarthTodayIcon
        key="today"
        style={{ fontSize: '0.8em', margin: '4px 5px 0 0' }}
      />,
    );
    names.push(t('projectionScenario.today'));
  }
  if (scenario.toLowerCase().includes('form')) {
    names.push(t('projectionScenario.manual'));
  }
  if (scenario.toLowerCase().includes('moderateextreme')) {
    icons.push(<EarthModerateIcon key="mod" style={styleIcon} />);
    icons.push(<EarthExtremeIcon key="extreme" style={styleIcon} />);
    names.push(t('projectionScenario.moderateExtreme'));
  } else if (scenario.toLowerCase().includes('moderate')) {
    icons.push(<EarthModerateIcon key="mod" style={styleIcon} />);
    names.push(t('projectionScenario.moderate'));
  } else if (scenario.toLowerCase().includes('extreme')) {
    icons.push(<EarthExtremeIcon key="extreme" style={styleIcon} />);
    names.push(t('projectionScenario.extreme'));
  }
  return { names, icons };
};

export const getScenarioColumns = (
  location,
  projectionMode,
  projectionResult,
  getColumn,
  language,
  t,
) => {
  const columns = [];
  if (projectionMode === 'f' && projectionResult.form.projections) {
    const form = projectionResult.form.projections.slice(-1)[0] || {};
    columns.push(getColumn('today', location, language, t));
    columns.push(getColumn('form', form, language, t));
  } else {
    const moderate = getResultLocation(projectionResult.moderate, location);
    const extreme = getResultLocation(projectionResult.extreme, location);
    const todayKey = getResultKey(location);
    const moderateKey = getResultKey(moderate);
    const extremeKey = getResultKey(extreme);
    if (moderateKey === extremeKey && todayKey === moderateKey) {
      columns.push(getColumn('todayModerateExtreme', location, language, t));
    } else if (moderateKey === extremeKey) {
      columns.push(getColumn('today', location, language, t));
      columns.push(getColumn('moderateExtreme', moderate, language, t));
    } else if (todayKey === moderateKey) {
      columns.push(getColumn('todayModerate', location, language, t));
      columns.push(getColumn('extreme', extreme, language, t));
    } else if (todayKey === extremeKey) {
      columns.push(getColumn('todayExtreme', location, language, t));
      columns.push(getColumn('moderate', moderate, language, t));
    } else {
      columns.push(getColumn('today', location, language, t));
      columns.push(getColumn('moderate', moderate, language, t));
      columns.push(getColumn('extreme', extreme, language, t));
    }
  }
  return columns;
};

const utils = {
  getAZ,
  getResultKey,
  getResultLocation,
  getScenarios,
  getScenarioColumns,
};

export default utils;
