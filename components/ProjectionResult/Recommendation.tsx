import { cantonalMappings } from "@geops/tree-lib";
import { Button as HuiButton } from "@headlessui/react";
import { useMemo } from "react";
import { Trans, useTranslation } from "react-i18next";

import useStore from "@/store";
import exportRecommendation from "@/utils/docx/exportRecommendation";
import getRecommendation from "@/utils/getRecommendation";

import ExportButton from "../ExportButton";
import AttentionIcon from "../icons/RecommendationAttention";
import NegativeIcon from "../icons/RecommendationNegative";
import NeutralIcon from "../icons/RecommendationNeutral";
import PositiveIcon from "../icons/RecommendationPositive";
import Checkbox from "../ui/Checkbox";
import Message from "../ui/Message";
import InfoModal from "../ui/Modal";
import Table from "../ui/Table";

import TreeTypeList from "./TreeTypeList";

import type { TreeAppLanguage } from "@/i18n/i18next";

const infoBtnClasses =
  "h-12 w-12 p-2 rounded-full border-2 border-primary-500 bg-white text-primary-500 outline-2 outline-white hover:outline";

function PositiveInfoBtn({ onClick }: { onClick: () => void }) {
  return (
    <HuiButton onClick={onClick}>
      <PositiveIcon className={infoBtnClasses} />
    </HuiButton>
  );
}

function NeutralInfoBtn({ onClick }: { onClick: () => void }) {
  return (
    <HuiButton onClick={onClick}>
      <NeutralIcon className={infoBtnClasses} />
    </HuiButton>
  );
}

function NegativeInfoBtn({ onClick }: { onClick: () => void }) {
  return (
    <HuiButton onClick={onClick}>
      <NegativeIcon className={infoBtnClasses} />
    </HuiButton>
  );
}

function AttentionInfoBtn({ onClick }: { onClick: () => void }) {
  return (
    <HuiButton onClick={onClick}>
      <AttentionIcon className={`${infoBtnClasses} !p-0`} />
    </HuiButton>
  );
}

function Recommendation({
  sameAltitudinalZone,
}: {
  sameAltitudinalZone: boolean;
}) {
  const { i18n, t } = useTranslation();
  const setFuture = useStore((state) => state.setFuture);
  const activeProfile = useStore((state) => state.activeProfile);
  const latinActive = useStore((state) => state.latinActive);
  const setLatinActive = useStore((state) => state.setLatinActive);
  const projectionResult = useStore((state) => state.projectionResult);
  const projectionMode = useStore((state) => state.projectionMode);
  const location = useStore((state) => state.location);
  const future = useStore((state) => state.future);

  const r = useMemo(() => {
    return getRecommendation(
      location,
      projectionMode,
      projectionResult,
      future,
      sameAltitudinalZone,
    );
  }, [location, projectionMode, projectionResult, future, sameAltitudinalZone]);

  const additionalInfo = useMemo(() => {
    const addInfoKey = location[`info_${activeProfile}`];
    return cantonalMappings?.[activeProfile]?.additionalInfo?.[
      addInfoKey as unknown as number
    ];
  }, [location, activeProfile]);

  return (
    <div className="p-5 text-white @container/main">
      <div className="items-center justify-between @[500px]/main:flex">
        <h2>{t("recommendation.header")}</h2>
        <div className="mt-2 flex flex-col gap-1 @[500px]/main:max-w-3/5 @[500px]/main:flex-row @[500px]/main:items-center">
          <Checkbox
            checked={future}
            classNameCheckbox="scale-[0.8]"
            colorBackground="#006268"
            colorBorder="#fbf0b2"
            colorCheckmark="#fbf0b2"
            label={
              <span
                className={`text-sm ${future ? "text-sm font-bold text-[#fbf0b2]" : "text-gray-300"}`}
              >
                {t("recommendation.future")}
              </span>
            }
            onChange={setFuture}
          />
          <Checkbox
            checked={latinActive}
            classNameCheckbox="scale-[0.8]"
            colorBackground="#006268"
            colorBorder="white"
            colorCheckmark="white"
            label={
              <span
                className={`text-sm ${latinActive ? "font-bold text-white" : "text-gray-300"}`}
              >
                {t("app.latinActiveShort")}
              </span>
            }
            onChange={setLatinActive}
          />
        </div>
      </div>
      <Table className="my-10 border-none" stackable={false}>
        <Table.Row className="grid grid-cols-[min-content,auto] items-center border-none">
          <Table.Cell>
            <InfoModal
              title={t("help.recommendationPositiveHeader")}
              Trigger={PositiveInfoBtn}
            >
              <Trans i18nKey="help.recommendationPositive">help text</Trans>
            </InfoModal>
          </Table.Cell>
          <Table.Cell>
            <div>
              <TreeTypeList className="font-bold" codes={r?.[0]} />
              <TreeTypeList codes={r?.[1]} />
            </div>
            <div className="text-recommendation-yellow">
              <TreeTypeList className="font-bold" codes={r?.[2]} />
              <TreeTypeList codes={r?.[3]} />
            </div>
          </Table.Cell>
        </Table.Row>

        <Table.Row className="grid grid-cols-[min-content,auto] items-center border-none">
          <Table.Cell>
            <InfoModal
              title={t("help.recommendationNeutralHeader")}
              Trigger={NeutralInfoBtn}
            >
              <Trans i18nKey="help.recommendationNeutral">help text</Trans>
            </InfoModal>
          </Table.Cell>
          <Table.Cell>
            <div>
              <TreeTypeList className="font-bold" codes={r?.[4]} />
              <TreeTypeList codes={r?.[5]} />
            </div>
            <div className="text-recommendation-yellow">
              <TreeTypeList className="font-bold" codes={r?.[6]} />{" "}
              <TreeTypeList codes={r?.[7]} />
            </div>
          </Table.Cell>
        </Table.Row>

        <Table.Row className="grid grid-cols-[min-content,auto] items-center border-none">
          <Table.Cell>
            <InfoModal
              title={t("help.recommendationNegativeHeader")}
              Trigger={NegativeInfoBtn}
            >
              <Trans i18nKey="help.recommendationNegative">help text</Trans>
            </InfoModal>
          </Table.Cell>
          <Table.Cell>
            <TreeTypeList className="font-bold" codes={r?.[8]} />
          </Table.Cell>
        </Table.Row>

        {((r?.[9].length ?? 0) > 0 || (r?.[10].length ?? 0) > 0) && (
          <Table.Row className="grid grid-cols-[min-content,auto] items-center border-none">
            <Table.Cell>
              <InfoModal
                title={t("help.recommendationAttentionHeader")}
                Trigger={AttentionInfoBtn}
              >
                <Trans i18nKey="help.recommendationAttention">
                  help text{" "}
                  <a
                    href="https://www.bafu.admin.ch/bafu/de/home/themen/wald/publikationen-studien/publikationen/vollzugshilfe-waldschutz.html"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    link
                  </a>
                </Trans>
              </InfoModal>
            </Table.Cell>
            <Table.Cell>
              <div>
                <TreeTypeList className="font-bold" codes={r?.[9]} />
                <div className="text-recommendation-yellow">
                  <TreeTypeList className="font-bold" codes={r?.[10]} />
                </div>
              </div>
            </Table.Cell>
          </Table.Row>
        )}
      </Table>
      {sameAltitudinalZone && (
        <Message className="border-white bg-primary-600 text-white">
          {t("recommendation.sameAltitudinalZone")}
        </Message>
      )}
      {additionalInfo && (
        <Message className="border-white bg-primary-600 text-white">
          {additionalInfo}
        </Message>
      )}
      <div className="my-2 mt-5 flex justify-end">
        <ExportButton
          className="bg-primary-700"
          onClick={() =>
            exportRecommendation(i18n.language as TreeAppLanguage, t)
          }
        >
          {t("export.exportRecommendation")}
        </ExportButton>
      </div>
    </div>
  );
}

export default Recommendation;
