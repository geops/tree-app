export const getFirstLetterIndex = (string) => string.match(/\D/)?.index;

export const forestTypeSortFct = (optA, optB) => {
  const numberA = getFirstLetterIndex(optA.code)
    ? optA.code.slice(0, getFirstLetterIndex(optA.code))
    : optA.code;
  const numberB = getFirstLetterIndex(optB.code)
    ? optB.code.slice(0, getFirstLetterIndex(optB.code))
    : optB.code;
  return parseInt(numberA, 10) - parseInt(numberB, 10);
};

export default forestTypeSortFct;
