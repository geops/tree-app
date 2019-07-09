import checkLanguage from './helper/checkLanguage';

import recommendations from '../data/recommendations.json';
import types from '../data/types.json';

function recommend(forestType, language) {
  checkLanguage(language);

  const [, result] = Object.entries(recommendations).find(
    t => t[0] === forestType,
  );
  return result.map(r => types.treeType.find(t => t.key === r)[language]);
}

export default recommend;
