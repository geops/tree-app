import { transform, get } from 'ol/proj.js';
import { register } from 'ol/proj/proj4.js';
import proj4 from 'proj4';
import { createRequire } from 'module';
// import project from './project.js';
const require = createRequire(import.meta.url);
const project = require('./project.js');

proj4.defs(
  'EPSG:2056',
  '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs',
);

register(proj4);

const to3857 = (coordinate) =>
  transform(coordinate, get('EPSG:2056'), 'EPSG:3857');
const validateCoordinate = (coordString) => /^\d+,\d+$/.test(coordString);

const readInputCoords = () => {
  const args = process.argv.slice(2);
  const [inputCsvFile, inputCoordinateArg] = process.argv.slice(2);

  if (inputCoordinateArg) {
    const coord = validateCoordinate(inputCoordinateArg) && [
      parseInt(inputCoordinateArg.split(',')[0], 0),
      parseInt(inputCoordinateArg.split(',')[1], 0),
    ];
    if (!coord) {
      throw new Error('Input coordinates invalid');
    }
    const projection = project({ coordinate: coord });
    console.log(projection);
  }
};

readInputCoords();
