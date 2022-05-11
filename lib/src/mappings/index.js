import luTransition from './luTransitionMapping';
import luRelief from './luReliefMapping';
import luSoil from './luSoilMapping';
import luTreeTypes from './luTreeTypesMapping';
import luVegetation from './luVegetationMapping';

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
