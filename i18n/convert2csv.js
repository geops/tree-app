/* eslint-disable import/no-extraneous-dependencies */
const path = require("path");
const fs = require("fs").promises;

function flatten(arr) {
  return arr.reduce(
    (a, v) => (Array.isArray(v) ? a.concat(flatten(v)) : a.concat(v)),
    [],
  );
}

const getLines = (de, fr, prefix) => {
  const deData = Object.entries(de);
  const frData = Object.entries(fr);
  return deData.map(([deKey, deValue]) => {
    const [, frValue] = frData.find(([frKey]) => frKey === deKey) || [null, ""];
    const lineKey = prefix ? `${prefix}.${deKey}` : deKey;
    if (typeof deValue === "string") {
      return `${lineKey},"${deValue}","${frValue}"`;
    }
    return getLines(deValue, frValue, lineKey);
  });
};

// eslint-disable-next-line func-names
(async function () {
  const dePath = path.join(__dirname, "resources", "de", "translation.json");
  const frPath = path.join(__dirname, "resources", "fr", "translation.json");
  const de = JSON.parse(await fs.readFile(dePath));
  const fr = JSON.parse(await fs.readFile(frPath));

  const csvPath = path.join(__dirname, "translations.csv");
  const translations = flatten(getLines(de, fr));
  await fs.writeFile(csvPath, ["key,de,fr", ...translations].join("\n"));
})();
