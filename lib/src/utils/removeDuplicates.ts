import difference from "lodash.difference";

const removeDuplicates = (...nestedArray: number[][]) => {
  const foundItems: number[] = [];
  return nestedArray.map((items) => {
    const uniqueItems = difference(items, foundItems);
    foundItems.push(...items);
    return uniqueItems;
  });
};

export default removeDuplicates;
