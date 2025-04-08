import useStore from "@/store";

import ProjectedCantonalForestTypeSo from "./so";

import type { AltitudinalZoneCode } from "@geops/tree-lib/types";

export interface ProjectedCantonalForestTypeProps {
  altitudinalZone?: AltitudinalZoneCode;
  forestType: null | string;
  scenario: string;
}

function ProjectedCantonalForestType({
  forestType,
  ...otherProps
}: ProjectedCantonalForestTypeProps) {
  const activeProfile = useStore((state) => state.activeProfile);

  if (activeProfile === "so") {
    return forestType ? (
      <ProjectedCantonalForestTypeSo forestType={forestType} {...otherProps} />
    ) : null;
  }

  return null;
}

export default ProjectedCantonalForestType;
