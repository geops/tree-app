const validLanguages = ['de'];

function checkLanguage(language) {
  if (!validLanguages.includes(language)) {
    throw new Error(`${language} is not supported.`);
  }
}

export default checkLanguage;
