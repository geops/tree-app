import { reduceHochmontanAz } from "@geops/tree-lib";
import { useTranslation } from "react-i18next";

import useStore from "@/store";
import useIsMobile from "@/utils/hooks/useIsMobile";

import ProjectedCantonalForestType from "./ProjectedCantonalForestType";

import type {
  AltitudinalZone,
  AltitudinalZoneCode,
} from "@geops/tree-lib/types";
import type { ReactNode } from "react";

import type { TreeAppLanguage } from "@/i18n/i18next";

interface ScenarioHeaderContentProps {
  altitudinalZone: AltitudinalZoneCode;
  classNameIcons?: string;
  forestType: string;
  icons: ReactNode[];
  names: string[];
  transitionForestType?: string;
  trimOnMobile?: boolean;
}

export function ScenarioHeaderContent({
  altitudinalZone,
  classNameIcons = "",
  forestType,
  icons,
  names,
  transitionForestType,
  trimOnMobile = true,
}: ScenarioHeaderContentProps) {
  const { i18n } = useTranslation();
  const isMobile = useIsMobile();
  const treeClient = useStore((state) => state.treeClient);
  const reducedAz = reduceHochmontanAz(altitudinalZone) as AltitudinalZoneCode;
  const az = treeClient.getTypes<AltitudinalZone>(
    "altitudinalzone",
    [i18n.language],
    { code: `= '${reducedAz}'` },
  )[0];
  return (
    <>
      <div className={`flex h-6 sm:h-10 ${classNameIcons}`}>{icons}</div>
      <div data-cypress="projectionResultMenuItem">
        {transitionForestType
          ? ` ${forestType} (${transitionForestType}) `
          : ` ${forestType} `}
        {trimOnMobile && isMobile ? null : (
          <>
            <span>{az?.[i18n.language as TreeAppLanguage]}</span>
            <div>{names.join(", ")}</div>
          </>
        )}
      </div>
    </>
  );
}

interface ScenarioHeaderProps extends ScenarioHeaderContentProps {
  scenario: string;
}

function ScenarioHeader({
  altitudinalZone,
  classNameIcons = "",
  forestType,
  icons,
  names,
  scenario,
  transitionForestType,
  trimOnMobile = true,
}: ScenarioHeaderProps) {
  return (
    <div className="flex h-full w-full flex-col justify-between text-xl font-bold">
      <div className="flex items-center gap-2 p-4">
        <ScenarioHeaderContent
          altitudinalZone={altitudinalZone}
          classNameIcons={classNameIcons}
          forestType={forestType}
          icons={icons}
          names={names}
          transitionForestType={transitionForestType}
          trimOnMobile={trimOnMobile}
        />
      </div>
      {forestType ? (
        <ProjectedCantonalForestType
          altitudinalZone={altitudinalZone}
          forestType={forestType}
          scenario={scenario}
        />
      ) : null}
    </div>
  );
}

export default ScenarioHeader;
