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
    set(de, key.split('.'), german);
    set(fr, key.split('.'), french);
  });
  const dePath = path.join(__dirname, 'resources', 'de', 'translation.json');
  const frPath = path.join(__dirname, 'resources', 'fr', 'translation.json');
  await fs.writeFile(dePath, JSON.stringify(de, null, 2));
  await fs.writeFile(frPath, JSON.stringify(fr, null, 2));
})();
