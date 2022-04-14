import { transform, get } from 'ol/proj.js';
import { register } from 'ol/proj/proj4.js';
import proj4 from 'proj4';
import project from './project.mjs';;

proj4.defs(
  'EPSG:2056',
  '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs',
);

register(proj4);

const LATLON_REGEX_PATTERN = /^[0-9]+.?[0-9]*,\s*[0-9]+.?[0-9]*$/ // Pattern for latLon coordinate

const to3857 = (coordinate) =>
  transform(coordinate, get('EPSG:2056'), 'EPSG:3857');

const validateCoordinate = (coordString) => LATLON_REGEX_PATTERN.test(coordString);

const processInputLine = (coordinateString, forestType) => {
  const args = process.argv.slice(2);
  let coord;
  if (!forestType) {
    throw new Error('Forest type undefined');
  }
  if (!coordinateString) {
    throw new Error('Input coordinates invalid');
  }
  if (coordinateString) {
    coord = validateCoordinate(coordinateString) && [
      parseInt(coordinateString.split(',')[0], 0),
      parseInt(coordinateString.split(',')[1], 0),
    ];
    if (!coord) {
      throw new Error('Input coordinates invalid');
    }
  }
  const projection = project({ coord, forestType: forestType }, '40');
  console.log(projection);
};

const [inputCsvFile, inputCoordinateArg, inputForestType] = process.argv.slice(2);
processInputLine(inputCoordinateArg, inputForestType);
