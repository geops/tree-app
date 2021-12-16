import parse from 'html-react-parser';

export const parseString = (str) => parse(str.slice().replace(/\\n/g, '<br>'));

export const getStringWithUnit = (data, unit) => {
  if (Array.isArray(data)) {
    return data.every((val) => val !== null && val !== undefined)
      ? `${data.join(' - ')}${unit || ''}`
      : '-';
  }
  return data ? parseString(`${data}${unit || ''}`) : '-';
};
const getValueIsSame = (arr1, arr2) =>
  getStringWithUnit(arr1) === getStringWithUnit(arr2) &&
  getStringWithUnit(arr1) !== '-';

export const getHasSameValues = (currentInfo, infoArray, field) =>
  infoArray.some(
    (ft) =>
      currentInfo.code !== ft.code &&
      getValueIsSame(currentInfo[field], ft[field]),
  );
