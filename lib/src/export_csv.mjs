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

function processData(err, rows) {
  const header = rows[0];
  const data = [...rows].splice(1);
  const processed = data.map((row) => {
    const [
      x,
      y,
      forestType,
      transitionForestType,
      altitudinalZone,
      targetAltitudinalZoneModerate,
      targetAltitudinalZoneExtreme,
    ] = row;
    const coordinate = [parseFloat(x), parseFloat(y)];
    const location = {
      coordinate,
      forestType,
      transitionForestType,
      altitudinalZone,
      targetAltitudinalZoneModerate,
      targetAltitudinalZoneExtreme,
    };

    const projected = project(location, '40');
    console.log(projected);
    return {
      coordinate,
      [header[2]]: forestType,
      [header[3]]: transitionForestType,
      [header[4]]: altitudinalZone,
      [header[5]]: targetAltitudinalZoneModerate,
      [header[6]]: targetAltitudinalZoneExtreme,
    };
  });
  // console.log(processed);
}

fs.readFile(inputCsvFile, function (err, fileData) {
  parse(fileData, { columns: false, trim: true, delimiter: ';' }, processData);
});
