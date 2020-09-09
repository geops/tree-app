/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const fs = require('fs').promises;
const parse = require('csv-parse/lib/sync');
const set = require('lodash.set');

const de = {};
const fr = {};

// eslint-disable-next-line func-names
(async function () {
  const data = await fs.readFile(path.join(__dirname, 'translations.csv'));
  const records = parse(data);
  records.shift(); // remove header
  await records.forEach(([key, german, french]) => {
    const keys = key.split('.');
    // handle digit keys
    if (keys[keys.length - 1].match(/^\d*$/)) {
      keys[keys.length - 1] = `"${keys[keys.length - 1]}"`;
    }
    set(de, keys, german);
    set(fr, keys, french);
  });
  const dePath = path.join(__dirname, 'resources', 'de', 'translation.json');
  const frPath = path.join(__dirname, 'resources', 'fr', 'translation.json');
  await fs.writeFile(dePath, JSON.stringify(de, null, 2).replace(/\\"/g, ''));
  await fs.writeFile(frPath, JSON.stringify(fr, null, 2).replace(/\\"/g, ''));
})();
