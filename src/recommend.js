import checkLanguage from './helper/checkLanguage';

import recommendations from '../data/recommendations.json';

function recommend(forestType, language) {
  checkLanguage(language);

  const [, result] = Object.entries(recommendations).find(
    t => t[0] === forestType,
  );
  return result;
}

export default recommend;
