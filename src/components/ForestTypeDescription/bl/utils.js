export const treeTypeMapping = [
  'Fi',
  'Ta',
  'WFö',
  'BFö',
  'Ei',
  'Lä',
  'Dg',
  'Bu',
  'Es',
  'BAh',
  'SAh',
  'SEi',
  'TEi',
  'WLi',
  'SLi',
  'Ki',
  'BUl',
  'FUl',
  'SEr',
  'GEr',
  'AEr',
  'HBi',
  'TKi',
  'VBe',
  'MBe',
  'Wei',
];

export const soilMapping = ['l', 'f', 'h', 'ahh', 'ah', 'basen', 'feuchte'];
export const vegetationMapping = [
  'A',
  'B1',
  'B2',
  'C1',
  'C2',
  'D1',
  'D2',
  'E1',
  'E2',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N1',
  'N2',
  'N3',
  'O1',
  'O2',
  'O3',
  'O4',
  'O5',
  'O6',
  'O7',
  'O8',
  'P1',
  'P2',
  'P3',
  'P4',
  'Q1',
  'Q2',
  'Q3',
  'R',
  'S',
  'T',
  'U1',
  'U2',
  'U3',
  'V1',
  'V2',
  'W',
  'X1',
  'X2',
  'Y1',
  'Y2',
  'Z1',
  'Z2',
  'Z3',
];

export const getTilleringTreeTypes = (data) =>
  data[0]
    .map((naturalForest, index) => {
      const farmForest = data[1] && data[1][index];
      const type = treeTypeMapping[index];
      return { naturalForest, farmForest, type };
    })
    .filter(
      (r) =>
        (r.naturalForest && r.naturalForest.filter((t) => t).length) ||
        (r.farmForest && r.farmForest.filter((t) => t).length),
    );

const utils = {
  soilMapping,
  vegetationMapping,
  treeTypeMapping,
};
export default utils;
