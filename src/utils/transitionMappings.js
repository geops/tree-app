export const luTransitionMapping = {
  '7a(6)': ['7d'],
  '7a(10a)': ['7e'],
  '7a(9a)': ['7f'],
  '8a(8*)': ['8c'],
  '8a(12e)': ['8e'],
  '8a(12a)': ['8f'],
  '18(46)': ['18c'],
  '29h(46)': ['26c'],
  '26(17)': ['26P'],
  '29(46t)': ['29Ls'],
  '50(46)': ['50d'],
  '50(49*Ta)': ['50f'],
  '57S(71)': ['57B'],
  '71(70)': ['71*'],
};

export const blTransitionMapping = {
  '12a(9a)': ['12t'],
  '14(16)': ['14e'],
  '16(48)': ['16l'],
  '7a(10a)': ['7e', '7j', '7td', '7te'],
  '7a(9a)': ['7f', '7tf'],
  '7S(10a)': ['7er', '7ter'],
  '7S(9a)': ['7fr', '7tfr'],
  '8a(12a)': ['8f'],
  '8a(12e)': ['8e', '8j'],
  '9a(11)': ['9b', '9g'],
};

const transitionMappings = {
  lu: luTransitionMapping,
  bl: blTransitionMapping,
};

export default transitionMappings;
