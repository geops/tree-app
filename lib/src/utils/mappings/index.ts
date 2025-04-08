import { CantonalMappings } from "../../types";

import blRelief from "./blReliefMapping.js";
import blTransition from "./blTransitionMapping.js";
import blTreeTypes from "./blTreeTypesMapping.js";
import blVegetation from "./blVegetationMapping.js";
import luRelief from "./luReliefMapping.js";
import luSoil from "./luSoilMapping.js";
import luTransition from "./luTransitionMapping.js";
import luTreeTypes from "./luTreeTypesMapping.js";
import luVegetation from "./luVegetationMapping.js";
import vdAdditionalInfo from "./vdAdditionalInfoMapping.js";

const mappings: CantonalMappings = {
  bl: {
    relief: blRelief,
    transition: blTransition,
    treeTypes: blTreeTypes,
    vegetation: blVegetation,
  },
  lu: {
    relief: luRelief,
    soil: luSoil,
    transition: luTransition,
    treeTypes: luTreeTypes,
    vegetation: luVegetation,
  },
  vd: {
    additionalInfo: vdAdditionalInfo,
  },
};

export default mappings;
