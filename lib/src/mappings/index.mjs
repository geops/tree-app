import luTransition from './luTransitionMapping.mjs';
import luRelief from './luReliefMapping.mjs';
import luSoil from './luSoilMapping.mjs';
import luTreeTypes from './luTreeTypesMapping.mjs';
import luVegetation from './luVegetationMapping.mjs';

const mappings = {
  lu: {
    transition: luTransition,
    relief: luRelief,
    soil: luSoil,
    treeTypes: luTreeTypes,
    vegetation: luVegetation,
  },
};

export default mappings;
