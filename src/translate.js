import types from '../data/types.json';

const validLanguages = ['de'];

function translate(type, key, language) {
  if (!validLanguages.includes(language)) {
    throw new Error(`${language} is not supported.`);
  }

  if (!types[type]) {
    throw new Error(`${type} is not a valid type.`);
  }

  const translation = types[type].find(t => t.key === key);

  if (!translation) {
    throw new Error(`Translation for ${type}.${key} not found.`);
  }

  return translation[language];
}

export default translate;
