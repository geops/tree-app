import fs from 'fs';
import { stringify, parse } from 'csv';
import locate from '../../src/locate.mjs';
import recommend from '../../src/recommend.mjs';
import info from '../../src/info.mjs';
import listUtils from '../../src/list.mjs';
import utils from '../../src/utils/index.mjs';

const { projection: projectionUtils } = utils;
const { getResultLocation, getResultKey, runProject } = projectionUtils;
const { list } = listUtils;

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
  'weitere_maessKW',
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

const [inputCsvFile] = process.argv.slice(2);

function processData(err, rows) {
  const data = [...rows].splice(1);
  const processed = data.reduce((finalOutputRows, row) => {
    const [
      ,
      clnr,
      x,
      y,
      ip5areproz,
      ip50proz,
      customForestType,
      customTransitionForestType,
      forestType,
      transitionForestType,
      altitudinalZone,
      targetAltitudinalZoneModerate,
      targetAltitudinalZoneExtreme,
      forestEcoregion,
      silverFirArea,
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
      silverFirArea,
    };

    if (
      projectionUtils.hochmontanAltitudinalZones.includes(
        location.altitudinalZone,
      )
    ) {
      if (projectionMode === 'm' || !formLocation.silverFirArea) {
        location.silverFirArea = location.altitudinalZone.slice(1);
      }
      if (projectionMode === 'm' || !formLocation.altitudinalZone) {
        location.altitudinalZone = '80';
      }
    }

    /** First gather all the necessary data using the tree-lib methods  */
    let locateResult = { ...location };
    try {
      locateResult = locate(location);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('locate error: ', error);
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
      console.log('recommend error: ', error);
    }

    /** Write CSV rows */
    let outputRows = [];
    let outputRowTemplate = {
      CLNR: clnr,
      IP5AREPROZ: ip5areproz,
      IP50PROZ: ip50proz,
      NAISTYPDOM: customForestType,
      NAISTYPUEB: customTransitionForestType,
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
  stringify(processed, { header: true }, function (err, output) {
    const filePath = `${process.cwd()}/exportedTreeRecommendations.csv`;
    return fs.writeFileSync(filePath, output);
  });
}

fs.readFile(inputCsvFile, function (err, fileData) {
  parse(fileData, { columns: false, trim: true, delimiter: ';' }, processData);
});
