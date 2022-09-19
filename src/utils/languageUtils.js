const langByProfileMapping = {
  vd: 'fr',
};

const getLanguageByProfile = (profile) => langByProfileMapping[profile];

export default getLanguageByProfile;
