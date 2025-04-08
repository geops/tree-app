import { cantonalMappings } from "@geops/tree-lib";

import type { TreeAppProfile } from "@geops/tree-lib/types";

const getFirstLetterIndex = (string: string) => string.match(/\D/)?.index;

/**
 * @param {string} code A valid forest type code
 * @param {string} activeProfile A valid tree-app profile with relief mapping
 * @param {boolean} trimCode Only uses the base code number when set to true (12a => 12)
 * @returns {string} image path
 */
const getReliefImageUrl = (
  code: string,
  profile: TreeAppProfile,
  trimCode = false,
) => {
  if (!code || !profile) {
    throw new Error("Code and profile need to be specified.");
  }
  const profileReliefMapping = cantonalMappings?.[profile]?.relief;
  if (!profileReliefMapping) {
    throw new Error(`${profile} is not a valid profile for relief.`);
  }
  const imageName = profileReliefMapping.find((string) => {
    let forestTypeCodeNumber = code;
    if (trimCode) {
      forestTypeCodeNumber = code.slice(
        0,
        getFirstLetterIndex(code) ?? code.length,
      );
    }
    const forestTypes = string.split(",");
    return forestTypes.includes(forestTypeCodeNumber);
  });
  return imageName && `/images/${profile}/relief/${imageName}.png`;
};

export default getReliefImageUrl;
