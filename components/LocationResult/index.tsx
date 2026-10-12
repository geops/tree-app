import { useTranslation } from "react-i18next";

import useStore from "@/store";

import Message from "../ui/Message";
import InfoModal from "../ui/Modal";

import Ecogram from "./Ecogram";
import ForestTypeButton from "./ForestTypeButton";

import type { ForestType, TreeLocationGroup } from "@geops/tree-lib/types";

import type { TreeAppLanguage } from "@/i18n/i18next";

const otherForestTypeGroups: TreeLocationGroup[] = [
  "special",
  "volatile",
  "riverside",
  "pioneer",
];

function LocationResult() {
  const { i18n, t } = useTranslation();
  const location = useStore((state) => state.location);
  const formLocation = useStore((state) => state.formLocation);
  const projectionMode = useStore((state) => state.projectionMode);
  const treeClient = useStore((state) => state.treeClient);
  const { ecogram, forestTypes } = useStore((state) => state.locationResult);
  console.log(formLocation);

  const hasMainGroup =
    !formLocation.groups || formLocation.groups?.includes("main");
  const hasOtherGroup =
    !formLocation.groups ||
    formLocation.groups.every((group) => group !== "main");
  const hasRequiredFields =
    projectionMode === "m"
      ? !!(location.altitudinalZone && location.forestEcoregion)
      : !!(formLocation.altitudinalZone && formLocation.forestEcoregion);
  const requirementsMessage =
    projectionMode === "m"
      ? "projection.missingLocation"
      : "location.selectAzAndEcoregion";

  return forestTypes ? (
    <div className="px-5">
      {hasMainGroup && (
        <div className="my-4 flex items-center justify-between">
          <h2>{t("forestType.group.main")}</h2>
          <InfoModal
            className="!max-w-[800px]"
            title={t("forestType.group.main")}
          >
            {t("location.mainResultHelp")}
          </InfoModal>
        </div>
      )}
      {hasMainGroup && ecogram?.length ? <Ecogram data={ecogram} /> : null}
      {hasMainGroup && !ecogram?.length && (
        <Message>{t("location.noEcogram")}</Message>
      )}
      {hasOtherGroup && (
        <>
          <div className="my-4 flex items-center justify-between">
            <h2>{t("forestType.group.other")}</h2>
            <InfoModal
              className="!max-w-[800px]"
              title={t("forestType.group.other")}
            >
              {t("location.otherResultHelp")}
            </InfoModal>
          </div>
          {!hasRequiredFields && (
            <Message className="mb-2">{t(requirementsMessage)}</Message>
          )}
          <div className="flex flex-col gap-4">
            {otherForestTypeGroups
              .filter((group) => forestTypes[group].length > 0)
              .map((group) => (
                <div key={group}>
                  <h4 className="mb-2">{t(`forestType.group.${group}`)}</h4>
                  <ul className="flex flex-col gap-2">
                    {forestTypes[group].map((ftCode) => {
                      const ftInfo = treeClient.getForestTypeByCode<ForestType>(
                        ftCode,
                        ["code", i18n.language as TreeAppLanguage],
                      );
                      return (
                        <li key={ftCode}>
                          <ForestTypeButton
                            className="grid grid-cols-[auto,auto,auto] gap-2 text-left"
                            code={ftCode}
                            disabled={!hasRequiredFields}
                          >
                            <div>{ftCode}</div>
                            <div>-</div>
                            <div>
                              {ftInfo?.[i18n.language as TreeAppLanguage]}
                            </div>
                          </ForestTypeButton>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  ) : null;
}

export default LocationResult;
