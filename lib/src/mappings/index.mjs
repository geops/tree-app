import luTransition from './luTransitionMapping.mjs';
import luRelief from './luReliefMapping.mjs';
import luSoil from './luSoilMapping.mjs';
import luTreeTypes from './luTreeTypesMapping.mjs';
import luVegetation from './luVegetationMapping.mjs';
import blRelief from './blReliefMapping.mjs';
import blTransition from './blTransitionMapping.mjs';
import blTreeTypes from './blTreeTypesMapping.mjs';
import blVegetation from './blVegetationMapping.mjs';

const mappings = {
  lu: {
    transition: luTransition,
    relief: luRelief,
    soil: luSoil,
    treeTypes: luTreeTypes,
    vegetation: luVegetation,
  },
  bl: {
    transition: blTransition,
    relief: blRelief,
    treeTypes: blTreeTypes,
    vegetation: blVegetation,
  },
};

export default mappings;
