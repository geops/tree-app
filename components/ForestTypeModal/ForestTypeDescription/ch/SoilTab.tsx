import Legend from "../Legend";

import Graininess from "./Graininess";
import Humus from "./Humus";
import SkeletalFraction from "./SkeletalFraction";
import SoilDiagram from "./SoilDiagram";
import SoilWetnessGroundwater from "./SoilWetnessGroundwater";
import SoilWetnessTailwater from "./SoilWetnessTailwater";

export interface SoilTabProps {
  data: {
    graininess: number[];
    humus: number[][];
    humusvariants: number[];
    rawmaterial: number[];
    skeletalfractionsoildepth: number[][];
    soil: number[][];
    soilvariants: number[];
    soilwetnessgroundwater: number[][];
    soilwetnesstailwater: number[][];
  };
}

function SoilTab({ data }: SoilTabProps) {
  return (
    <>
      <Legend />
      <Humus humus={data.humus} humusVariants={data.humusvariants} />
      <SoilDiagram soil={data.soil} soilVariants={data.soilvariants} />
      <div className="grid grid-cols-2 gap-y-8">
        <Graininess
          graininess={data.graininess}
          rawMaterial={data.rawmaterial}
        />
        <SkeletalFraction data={data.skeletalfractionsoildepth} />
      </div>
      <div className="flex gap-y-8">
        <SoilWetnessGroundwater data={data.soilwetnessgroundwater} />
        <SoilWetnessTailwater data={data.soilwetnesstailwater} />
      </div>
    </>
  );
}

export default SoilTab;
