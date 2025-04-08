import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

import useStore from "@/store";

import Button from "../ui/Button";
import Message from "../ui/Message";
import InfoModal from "../ui/Modal";

import Ecogram from "./Ecogram";

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
  const router = useRouter();
  const formLocation = useStore((state) => state.formLocation);
  const treeClient = useStore((state) => state.treeClient);
  const setFormLocation = useStore((state) => state.setFormLocation);
  const { ecogram, forestTypes } = useStore((state) => state.locationResult);
  const hasMainGroup =
    !formLocation.groups || formLocation.groups.includes("main");
  const hasOtherGroup =
    !formLocation.groups ||
    formLocation.groups.filter((group) => group !== "main").length > 0;

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
                      const onClick = () => {
                        setFormLocation({ forestType: ftCode });
                        void router.push(
                          `/projection${window.location.search}`,
                        );
                      };
                      return (
                        <li key={ftCode}>
                          <Button
                            className="grid grid-cols-[auto,auto,auto] gap-2 text-left"
                            onClick={onClick}
                          >
                            <div>{ftCode}</div>
                            <div>-</div>
                            <div>
                              {ftInfo?.[i18n.language as TreeAppLanguage]}
                            </div>
                          </Button>
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
