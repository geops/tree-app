/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import path from "path";
import fs from "fs";
import fastCsv from "fast-csv";
import { fileURLToPath } from "url";

// const types = require("../types.json");

// console.log(`
//   This script reads all geojson files in /data/ecogram/ and aggregate them
//   into two files: /data/ecograms.json & /data/locations.json
// `);

// function validate(type, list, profile = "ch", fallback = false) {
//   if (!list) {
//     throw new Error(`List for ${type} missing!`);
//   }

//   list.forEach((code) => {
//     if (
//       (!fallback && !types[profile][type].find((t) => t.code === code)) ||
//       (fallback &&
//         !types[profile][type].find((t) => t.code === code) &&
//         !types.ch[type].find((t) => t.code === code))
//     ) {
//       throw new Error(`Code ${code} for ${profile}.${type} not valid!`);
//     }
//   });
// }
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // get the name of the directory

function writeCSV(filename, data) {
  const filepath = path.join(__dirname, "../", filename);
  const ws = fs.createWriteStream(filepath);
  fastCsv.write(data, { headers: true, delimiter: ";" }).pipe(ws);
}

const aggregateEcograms = (profile) => {
  const dir = `${__dirname}/${profile}`;
  ecograms[profile] = ecograms[profile] || {};

  fs.readdirSync(dir).forEach((filename) => {
    console.log(`  Start aggregating ${filename} for profile ${profile}`);
    const id = parseInt(path.parse(filename).name, 10);
    const filepath = path.resolve(dir, filename);
    const rawdata = fs.readFileSync(filepath);
    const ecogram = JSON.parse(rawdata);

    const { forestEcoregions, altitudinalZones, silverFirAreas } = {
      silverFirAreas: ["unknown"],
      ...ecogram.properties,
    };

    // validate("forestEcoregion", forestEcoregions);
    // validate("altitudinalZone", altitudinalZones);
    // validate("silverFirArea", silverFirAreas);

    forestEcoregions.forEach((region) => {
      altitudinalZones.forEach((zone) => {
        silverFirAreas.forEach((silverFirArea) => {
          locations.push({
            profile,
            forestEcoregion: region,
            altitudinalZone: zone,
            silverFirArea,
            ecogramId: id,
          });
        });
      });
    });

    const boxes = [];
    ecogram.features.forEach((f) => {
      const forestTypes = f.properties.forestTypes.split(",") || [];
      const otherForestTypes = f.properties.otherForestTypes
        ? f.properties.otherForestTypes.split(",")
        : [];
      const [[x1, y1], , [x2, y2]] = f.geometry.coordinates[0][0];
      const height = 1000 - y1 * 1000 - (1000 - y2 * 1000);
      const ft = [...new Set([...forestTypes, ...otherForestTypes])];
      // validate("forestType", ft, profile, true);

      boxes.push({
        profile,
        id,
        x: Math.round(x1 * 1000),
        y: Math.round(1000 - y1 * 1000 - height),
        w: Math.round(x2 * 1000 - x1 * 1000), // width
        h: Math.round(height),
        r: !isNaN(parseInt(f.properties.rows, 10))
          ? parseInt(f.properties.rows, 10)
          : "",
        ox: !isNaN(parseFloat(f.properties.offsetX))
          ? parseFloat(f.properties.offsetX)
          : "",
        oy: !isNaN(parseFloat(f.properties.offsetY))
          ? parseFloat(f.properties.offsetY)
          : "",
        z: !isNaN(parseInt(f.properties.z, 10))
          ? parseInt(f.properties.z, 10)
          : "", // z-index
        f: ft,
      });
    });

    ecograms.push(...boxes);
  });
};

const ecograms = [];
const locations = [];
aggregateEcograms("ch");
aggregateEcograms("lu");
aggregateEcograms("bl");

writeCSV("locations.csv", locations);
writeCSV("ecograms.csv", ecograms);
