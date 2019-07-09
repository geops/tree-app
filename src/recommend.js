import recommendations from '../data/recommendations.json';

function recommend(forestType) {
  const [, result] = Object.entries(recommendations).find(
    t => t[0] === forestType,
  );
  return result;
}

export default recommend;
