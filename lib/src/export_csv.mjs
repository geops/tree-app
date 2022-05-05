import fs from 'fs';
import parse from 'csv-parse';
import { transform, get } from 'ol/proj.js';
import { register } from 'ol/proj/proj4.js';
import proj4 from 'proj4';
import project from './project.mjs';

proj4.defs(
  'EPSG:2056',
  '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs',
);

register(proj4);

const LATLON_REGEX_PATTERN = /^[0-9]+.?[0-9]*,\s*[0-9]+.?[0-9]*$/; // Pattern for latLon coordinate

const to3857 = (coordinate) =>
  transform(coordinate, get('EPSG:2056'), 'EPSG:3857');

const validateCoordinate = (coordString) =>
  LATLON_REGEX_PATTERN.test(coordString);

const [inputCsvFile, inputCoordinateArg, inputForestType] =
  process.argv.slice(2);

function processRows(err, rows) {
  const header = rows[0];
  const data = [...rows].splice(1);
  const processed = data.map((row) => {
    return {
      coordinate: to3857([parseFloat(row[0]), parseFloat(row[1])]),
      [header[2]]: row[2],
      [header[3]]: row[3],
      [header[4]]: row[4],
      [header[5]]: row[5],
    };
  });
  console.log(processed);
}

fs.readFile(inputCsvFile, function (err, fileData) {
  parse(fileData, { columns: false, trim: true, delimiter: ';' }, processRows);
});
