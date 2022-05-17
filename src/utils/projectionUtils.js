import React from 'react';
import { utils } from '@geops/tree-lib';
import styles from '../components/ProjectionResult.module.css';
import { ReactComponent as EarthExtremeIcon } from '../icons/earthExtreme.svg';
import { ReactComponent as EarthModerateIcon } from '../icons/earthModerate.svg';
import { ReactComponent as EarthTodayIcon } from '../icons/earthToday.svg';

const { getResultLocation, getResultKey } = utils();

export const getScenarios = (scenario, t) => {
  const icons = [];
  const names = [];
  if (scenario.toLowerCase().includes('today')) {
    icons.push(<EarthTodayIcon key="today" className={styles.iconToday} />);
    names.push(t('projectionScenario.today'));
  }
  if (scenario.toLowerCase().includes('form')) {
    names.push(t('projectionScenario.manual'));
  }
  if (scenario.toLowerCase().includes('moderateextreme')) {
    icons.push(<EarthModerateIcon key="mod" className={styles.icon} />);
    icons.push(<EarthExtremeIcon key="extreme" className={styles.icon} />);
    names.push(t('projectionScenario.moderateExtreme'));
  } else if (scenario.toLowerCase().includes('moderate')) {
    icons.push(<EarthModerateIcon key="mod" className={styles.icon} />);
    names.push(t('projectionScenario.moderate'));
  } else if (scenario.toLowerCase().includes('extreme')) {
    icons.push(<EarthExtremeIcon key="extreme" className={styles.icon} />);
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

const projectionUtils = {
  getScenarios,
  getScenarioColumns,
};

export default projectionUtils;
