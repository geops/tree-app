import fs from 'fs';
import { stringify, parse } from 'csv';
import { register } from 'ol/proj/proj4.js';
import proj4 from 'proj4';
import project from './project.mjs';
import locate from './locate.mjs';
import recommend from './recommend.mjs';
import info from './info.mjs';
import listMethods from './list.mjs';

const { list } = listMethods;
proj4.defs(
  'EPSG:2056',
  '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs',
);
register(proj4);

const recommendationCategories = [
  'Empfohlen_1',
  'Empfohlen_2',
  'empfohlen_zukunft_1',
  'empfohlen_zukunft_2',
  'BedEmpfohlen_1',
  'BedEmpfohlen_2',
  'bedEmpfohlen_zukunft_1',
  'bedEmpfohlen_zukunft_2',
  'gefaehrdet',
  'goetterbaum',
  'goetterbaum_zukunft_1',
];

const projectionsToday = ['dom_heute', 'wichtBeiGem_heute', 'weitere_heute'];

const projectionsModerate = [
  'dom_maessKW',
  'wichtBeiGem_maessKW',
  'weitere_heute',
];

const projectionsExtreme = [
  'dom_starkKW',
  'wichtBeiGem_starkKW',
  'weitere_starkKW',
];
const projectionCategories = [
  ...projectionsToday,
  ...projectionsModerate,
  ...projectionsExtreme,
];

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

const writeRowsByProjection = (
  scenario,
  outputRows,
  outputRowTemplate,
  projectionCatArray,
) => {
  list(scenario, true)
    .slice(0, 3)
    .forEach((treeList) => {
      treeList.forEach((treeId) => {
        const treeInfo = info('treeType', treeId);
        projectionCatArray.forEach((cat) => {
          outputRows.push({
            ...outputRowTemplate,
            kat_empf: cat,
            Baumart_de: treeInfo.de,
            Baumart_lat: treeInfo.la,
          });
        });
      });
    });
};

const LATLON_REGEX_PATTERN = /^[0-9]+.?[0-9]*,\s*[0-9]+.?[0-9]*$/; // Pattern for latLon coordinate

const [inputCsvFile, inputCoordinateArg, inputForestType] =
  process.argv.slice(2);

function processData(err, rows) {
  const data = [...rows].splice(1);
  const processed = data.reduce((finalOutputRows, row) => {
    const [
      x,
      y,
      forestType,
      transitionForestType,
      altitudinalZone,
      targetAltitudinalZoneModerate,
      targetAltitudinalZoneExtreme,
      forestEcoregion,
    ] = row;
    const coordinate = [parseFloat(x), parseFloat(y)];
    const location = {
      coordinate,
      forestType,
      transitionForestType,
      transition: !!transitionForestType,
      altitudinalZone,
      targetAltitudinalZoneModerate,
      targetAltitudinalZoneExtreme,
      forestEcoregion,
    };

    /** First gather all the necessary data using the tree-lib methods  */
    let locateResult = { ...location };
    try {
      locateResult = locate(location);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('project error: ', error);
    }

    const projectionResult = {
      moderate: { options: {}, projections: [] },
      extreme: { options: {}, projections: [] },
    };
    try {
      projectionResult.moderate = runProject(
        { ...location, ...locateResult },
        targetAltitudinalZoneModerate,
      );
      projectionResult.extreme = runProject(
        { ...location, ...locateResult },
        targetAltitudinalZoneExtreme,
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('project error: ', error);
    }

    const projections = [
      ...(projectionResult.moderate.projections
        ? projectionResult.moderate.projections.slice(-1)
        : [location]),
      ...(projectionResult.extreme.projections
        ? projectionResult.extreme.projections.slice(-1)
        : [location]),
    ];

    let recommendation = [];
    try {
      if (projections && projections.length === 0) {
        recommendation = recommend(location, [location]);
      } else {
        recommendation = recommend(location, projections);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('recommendation error: ', error);
    }

    /** Write CSV rows */
    let outputRows = [];
    let outputRowTemplate = {
      X95: x,
      Y95: y,
      NAISTYP_heute: transitionForestType
        ? `${forestType}(${transitionForestType})`
        : forestType,
      NAISTYP_maessKW: projections[0]?.forestType,
      NAISTYP_starkKW: projections[1]?.forestType,
      HOESTUF_heute: altitudinalZone,
      HOESTUF_maessKW: targetAltitudinalZoneModerate,
      HOESTUF_starkKW: targetAltitudinalZoneExtreme,
    };

    /** Create a new row for each output tree type by recommendation */
    recommendation.forEach((treeList, idx) => {
      treeList.forEach((treeId) => {
        const treeInfo = info('treeType', treeId);
        outputRows.push({
          ...outputRowTemplate,
          kat_empf: recommendationCategories[idx],
          Baumart_de: treeInfo.de,
          Baumart_lat: treeInfo.la,
        });
      });
    });

    /** Create a new row for each output tree type by projection */
    const moderate = getResultLocation(projectionResult.moderate, location);
    const extreme = getResultLocation(projectionResult.extreme, location);
    const todayKey = getResultKey(location);
    const moderateKey = getResultKey(moderate);
    const extremeKey = getResultKey(extreme);
    if (moderateKey === extremeKey && todayKey === moderateKey) {
      writeRowsByProjection(
        location,
        outputRows,
        outputRowTemplate,
        projectionCategories,
      );
    } else if (moderateKey === extremeKey) {
      // columns.push(getColumn('today', location, language, t));
      // columns.push(getColumn('moderateExtreme', moderate, language, t));
      writeRowsByProjection(
        location,
        outputRows,
        outputRowTemplate,
        projectionsToday,
      );
      writeRowsByProjection(moderate, outputRows, outputRowTemplate, [
        ...projectionsModerate,
        ...projectionsExtreme,
      ]);
    } else if (todayKey === moderateKey) {
      // columns.push(getColumn('todayModerate', location, language, t));
      // columns.push(getColumn('extreme', extreme, language, t));
      writeRowsByProjection(location, outputRows, outputRowTemplate, [
        ...projectionsToday,
        ...projectionsModerate,
      ]);
      writeRowsByProjection(
        moderate,
        outputRows,
        outputRowTemplate,
        projectionsExtreme,
      );
    } else if (todayKey === extremeKey) {
      // columns.push(getColumn('todayExtreme', location, language, t));
      // columns.push(getColumn('moderate', moderate, language, t));
      writeRowsByProjection(location, outputRows, outputRowTemplate, [
        ...projectionsToday,
        ...projectionsExtreme,
      ]);
      writeRowsByProjection(
        moderate,
        outputRows,
        outputRowTemplate,
        projectionsModerate,
      );
    } else {
      // columns.push(getColumn('today', location, language, t));
      // columns.push(getColumn('moderate', moderate, language, t));
      // columns.push(getColumn('extreme', extreme, language, t));
      writeRowsByProjection(
        location,
        outputRows,
        outputRowTemplate,
        projectionsToday,
      );
      writeRowsByProjection(
        moderate,
        outputRows,
        outputRowTemplate,
        projectionsModerate,
      );
      writeRowsByProjection(
        extreme,
        outputRows,
        outputRowTemplate,
        projectionsExtreme,
      );
    }

    return [...finalOutputRows, ...outputRows];
  }, []);
  stringify(
    processed,
    {
      header: true,
    },
    function (err, output) {
      const filePath = `${process.cwd()}/data/locations/exportedTest.csv`;
      return fs.writeFileSync(filePath, output);
    },
  );
}

fs.readFile(inputCsvFile, function (err, fileData) {
  parse(fileData, { columns: false, trim: true, delimiter: ';' }, processData);
});
