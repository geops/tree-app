import { Field } from "@headlessui/react";
import { useTranslation } from "react-i18next";

import InfoButton from "@/components/ui/InfoButton";
import Label from "@/components/ui/Label";
import { useModalContext } from "@/components/ui/Modal";
import useStore from "@/store";
import useHasPdf from "@/utils/hooks/useHasPdf";

import type {
  AltitudinalZone,
  AltitudinalZoneCode,
  SoForestType,
} from "@geops/tree-lib/types";

import type { ProjectedCantonalForestTypeProps } from "../ProjectedCantonalForestType";

function useProjectedFt(
  code: string,
  altitudinalZoneCode: AltitudinalZoneCode,
  filterAttribute: "codenaisfuture" | "codessopresent" = "codenaisfuture",
  mapForestType: string,
) {
  if (!code) return null;
  const treeClient = useStore.getState().treeClient;
  let ftInfo;
  console.log(filterAttribute);

  try {
    const ftInfos = treeClient
      .getTypes<SoForestType>("so_foresttype", undefined)
      ?.filter((ft) => {
        if (Array.isArray(ft[filterAttribute])) {
          return ft[filterAttribute].includes(code);
        }
        return ft[filterAttribute] === code;
      });
    if (!altitudinalZoneCode) {
      ftInfo =
        ftInfos.find((ft) => ft.codessopresent?.includes(mapForestType)) ??
        ftInfos[0];
    } else {
      const altitudinalZone = treeClient.getTypes<AltitudinalZone>(
        "altitudinalZone",
        undefined,
        { code: `= '${altitudinalZoneCode}'` },
      )?.[0];
      ftInfo = ftInfos?.find(
        (ft) => ft.altitudinalzonefuture === altitudinalZone?.de,
      );
      if (!ftInfo) {
        ftInfo = ftInfos?.find((ft) => ft.code === mapForestType);
      }
      if (!ftInfo) {
        ftInfo =
          ftInfos?.find((ft) => ft.codessopresent?.includes(mapForestType)) ??
          ftInfos[0];
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`No forest type found for ${code}`, error);
  }

  return ftInfo?.codesofuture ? ftInfo.codesofuture : mapForestType;
}

const soPdfEndpoint = process.env.NEXT_PUBLIC_SO_PDF_ENDPOINT;

function ProjectionCantonalForestType({
  altitudinalZone,
  forestType,
  scenario,
}: ProjectedCantonalForestTypeProps) {
  const { t } = useTranslation();
  const mapLocation = useStore((state) => state.mapLocation);
  const setForestTypeDescription = useStore(
    (state) => state.setForestTypeDescription,
  );
  const projectedFt = useProjectedFt(
    forestType!,
    altitudinalZone!,
    /today/.test(scenario) ? "codessopresent" : undefined,
    mapLocation.forestType_so!,
  );
  const hasPdf = useHasPdf(
    projectedFt && `${soPdfEndpoint}/${projectedFt.replace("*", "stern")}.pdf`,
    ["so"],
  );
  const { closeModal } = useModalContext();

  return (
    <Field className="mt-auto flex w-full flex-col justify-center bg-primary-400 p-4">
      <Label className="text-white">{t("forestType.cantonalForestType")}</Label>
      <div className="flex items-center gap-2">
        <InfoButton
          circle={false}
          className="h-8 w-8 rounded border border-white bg-primary-500 text-white hover:bg-primary-200 hover:text-white"
          disabled={!hasPdf}
          onClick={() => {
            closeModal();
            setForestTypeDescription(projectedFt!);
          }}
        />
        <h4 className="text-white">{projectedFt}</h4>
      </div>
    </Field>
  );
}

export default ProjectionCantonalForestType;
