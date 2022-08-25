const langByProfileMapping = {
  va: 'fr',
};

const getLanguageByProfile = (profile) => langByProfileMapping[profile];

export default getLanguageByProfile;
