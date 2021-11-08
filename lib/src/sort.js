const getFirstLetterIndex = (string) => {
  const exec = /^[0-9]/i.exec(string);
  return exec?.index;
};

/**
 * This function sorts forest types according to their codes instead of using alphanumeric sorting.
 *
 * @param {array} forestTypes Array of forestType objects with unique code.
 * @returns {array} Array of sorted forest types.
 */
export const sort = (forestTypes) =>
  [...forestTypes].sort((optA, optB) => {
    const numberA = getFirstLetterIndex(optA.code)
      ? optA.code.slice(0, getFirstLetterIndex(optA.code))
      : optA.code;
    const numberB = getFirstLetterIndex(optB.code)
      ? optB.code.slice(0, getFirstLetterIndex(optB.code))
      : optB.code;
    return parseInt(numberA, 10) - parseInt(numberB, 10);
  });

export default sort;
