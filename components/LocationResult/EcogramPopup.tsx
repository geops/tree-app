import { useRouter } from "next/router";
import { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Tooltip, TooltipRefProps } from "react-tooltip";

import useStore from "@/store";

import Button from "../ui/Button";
import InfoButton from "../ui/InfoButton";

import type { ForestType } from "@geops/tree-lib/types";

import type { TreeAppLanguage } from "@/i18n/i18next";

function EcogramPopup({ forestTypes }: { forestTypes: string[] }) {
  const { i18n, t } = useTranslation();
  const router = useRouter();
  const activeProfile = useStore((state) => state.activeProfile);
  const treeClient = useStore((state) => state.treeClient);
  const setForestTypeDescription = useStore(
    (state) => state.setForestTypeDescription,
  );
  const setFormLocation = useStore((state) => state.setFormLocation);
  const refTooltip = useRef<TooltipRefProps>(null);

  const forestTypeInfos: ForestType[] = useMemo(() => {
    return forestTypes.reduce((fts, ftCode) => {
      let ftInfo;
      try {
        ftInfo = treeClient.getForestTypeByCode<ForestType>(
          ftCode,
          ["code", i18n.language],
          activeProfile,
        );
        throw new Error(
          `No forest type ${ftCode} for ${activeProfile} profile`,
        );
      } catch {
        ftInfo = treeClient.getForestTypeByCode<ForestType>(ftCode, [
          "code",
          i18n.language,
        ]);
        if (!ftInfo) {
          console.error(`Could not find forest type ${ftCode}`);
        }
      }

      return ftInfo ? [...fts, ftInfo] : fts;
    }, [] as ForestType[]);
  }, [forestTypes, i18n.language, activeProfile, treeClient]);

  return (
    <Tooltip
      className={`pointer-events-auto flex !max-w-full flex-col border border-gray-200 !bg-white !opacity-100 drop-shadow-[0_15px_15px_rgba(0,0,0,0.25)] !transition-none ${!forestTypeInfos?.length ? "hidden" : ""}`}
      classNameArrow="!bg-white"
      clickable
      globalCloseEvents={{
        clickOutsideAnchor: true,
        resize: true,
        scroll: true,
      }}
      id="ecogram-popup"
      openEvents={{ click: true }}
      openOnClick
      ref={refTooltip}
    >
      <ul>
        {forestTypeInfos.map((ftInfo) => {
          const { code, [i18n.language as TreeAppLanguage]: name } = ftInfo;
          return (
            <li className="flex gap-2 py-2" key={code}>
              <InfoButton
                circle={false}
                className="h-12 w-12 min-w-12 rounded bg-primary-500 text-white hover:bg-primary-200 hover:text-white"
                onClick={() => setForestTypeDescription(code)}
              />
              <Button
                className="truncate"
                onClick={() => {
                  setFormLocation({ forestType: code });
                  void router.push(`/projection${window.location.search}`);
                }}
                title={`${code} - ${name}`}
              >
                {code} - {name}
              </Button>
            </li>
          );
        })}
      </ul>
      <Button
        className="bg-gray-400 text-white hover:bg-gray-200"
        onClick={() => {
          refTooltip?.current?.close();
        }}
      >
        {t("forestType.cancel")}
      </Button>
    </Tooltip>
  );
}

export default EcogramPopup;
