import parse from 'html-react-parser';

export const parseString = (str) =>
  str && parse(str.slice().replace(/\\n/g, '<br>'));

export const getStringWithUnit = (data, unit) => {
  if (Array.isArray(data)) {
    return data.every((val) => val !== null && val !== undefined)
      ? `${data.join(' - ')}${unit || ''}`
      : '-';
  }
  return data ? parseString(`${data}${unit || ''}`) : '-';
};
