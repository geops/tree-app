import { useEffect, useState } from "react";

import useStore from "@/store";

function useCantonalForestType(): null | string {
  const location = useStore((state) => state.location);
  const activeProfile = useStore((state) => state.activeProfile);
  const [cantonalForestType, setCantonalForestType] = useState<null | string>(
    null,
  );
  useEffect(() => {
    const ft = location.transitionForestType
      ? `${location.forestType}(${location.transitionForestType})`
      : location.forestType;
    const hasCantonalFt =
      ft && location?.forestTypes?.[0]?.[`forestType_${activeProfile}`] !== ft;
    setCantonalForestType(
      hasCantonalFt
        ? (location?.forestTypes?.[0]?.[`forestType_${activeProfile}`] ?? null)
        : null,
    );
  }, [location, activeProfile]);
  return cantonalForestType;
}

export default useCantonalForestType;
