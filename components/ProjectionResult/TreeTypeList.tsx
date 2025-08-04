import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import useStore from "@/store";
import getSortedTreeTypes from "@/utils/getSortedTreeTypes";
import getTreeTypePdfUrl from "@/utils/getTreeTypePdfUrl";
import useHasPdf from "@/utils/hooks/useHasPdf";
import useIsMobile from "@/utils/hooks/useIsMobile";

import type { TreeType as Tree } from "@geops/tree-lib/types";

import type { TreeAppLanguage } from "@/i18n/i18next";

const TreeTypePdfModal = dynamic(() => import("./TreeTypePdfModal"), {
  ssr: false,
}); // Needs to be dynamic due to react-pdf

function TreeType(
  props: {
    onTouchStart?: (e: React.TouchEvent, name?: number) => void;
    showPopover?: boolean;
  } & Tree,
) {
  const latinActive = useStore((state) => state.latinActive);
  const { i18n, t } = useTranslation();
  const {
    endangered,
    [i18n.language as TreeAppLanguage]: lang,
    la,
    nonresident,
    onTouchStart = () => void 0,
    pioneer,
    showPopover,
  } = props;
  const pdfUrl = getTreeTypePdfUrl(la?.replace(/ /g, "_") ?? "");
  const hasPdf = useHasPdf(pdfUrl);

  const content = useMemo(() => {
    return (
      <div className="relative inline-block overflow-visible">
        {hasPdf && showPopover ? (
          <div className="absolute bottom-6 left-1/2 z-50 mb-2 w-[max-content] -translate-x-1/2">
            <div className="relative rounded bg-white/90 px-3 py-2 text-sm text-primary-600 shadow-md">
              {t("recommendation.treeTapPopover")}
              <div
                className="absolute -bottom-2 left-1/2 h-2 w-3 -translate-x-1/2"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
                  clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)",
                }}
              ></div>
            </div>
          </div>
        ) : null}
        <span
          className={`inline-block ${hasPdf && !showPopover ? "cursor-pointer hover:underline" : ""}`}
          onTouchStart={onTouchStart}
        >
          {latinActive ? la : lang}
          <sup>
            {endangered ? "†" : null}
            {nonresident ? "°" : null}
            {pioneer ? "*" : null}
          </sup>
        </span>
        &nbsp;
      </div>
    );
  }, [
    t,
    showPopover,
    latinActive,
    la,
    lang,
    hasPdf,
    onTouchStart,
    endangered,
    nonresident,
    pioneer,
  ]);

  if (hasPdf && pdfUrl) {
    return (
      <TreeTypePdfModal
        href={pdfUrl}
        name={`${lang} (${la})`}
        triggerProps={{ children: content }}
      />
    );
  }

  return <span>{content}</span>;
}

const LARGEST_MOBILE_WIDTH = 1367; // iPad Pro landscape width + 1px

function TreeTypeList({
  className,
  codes,
}: {
  className?: string;
  codes?: number[];
}) {
  const { i18n } = useTranslation();
  const isMobile = useIsMobile(LARGEST_MOBILE_WIDTH);

  const treeInfos = useMemo(() => {
    return getSortedTreeTypes(codes, i18n.language as TreeAppLanguage);
  }, [codes, i18n.language]);

  const [showPopover, setShowPopover] = useState<number | undefined>(undefined);

  const handleTouchStart = (e: React.TouchEvent, name?: number) => {
    if (isMobile) {
      setShowPopover(name);
      setTimeout(() => setShowPopover(undefined), 1000);
    }
  };

  return (
    <span className={`w-full text-xl ${className}`}>
      {(treeInfos ?? []).map((treeInfo) => {
        return (
          <TreeType
            key={treeInfo.code}
            {...treeInfo}
            onTouchStart={(e: React.TouchEvent) =>
              handleTouchStart(e, treeInfo.code)
            }
            showPopover={showPopover === treeInfo.code}
          />
        );
      })}
    </span>
  );
}

export default TreeTypeList;
