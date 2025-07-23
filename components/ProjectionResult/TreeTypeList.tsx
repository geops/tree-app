import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import useStore from "@/store";
import getSortedTreeTypes from "@/utils/getSortedTreeTypes";
import getTreeTypePdfUrl from "@/utils/getTreeTypePdfUrl";
import useHasPdf from "@/utils/hooks/useHasPdf";

import type { TreeType as Tree } from "@geops/tree-lib/types";

import type { TreeAppLanguage } from "@/i18n/i18next";

const TreeTypePdfModal = dynamic(() => import("./TreeTypePdfModal"), {
  ssr: false,
}); // Needs to be dynamic due to react-pdf

function TreeType(props: Tree) {
  const latinActive = useStore((state) => state.latinActive);
  const { i18n } = useTranslation();
  const {
    endangered,
    [i18n.language as TreeAppLanguage]: lang,
    la,
    nonresident,
    pioneer,
  } = props;
  const pdfUrl = getTreeTypePdfUrl(la?.replace(/ /g, "_") ?? "");
  const hasPdf = useHasPdf(pdfUrl);

  const content = useMemo(() => {
    return (
      <>
        <span
          className={`inline-block ${hasPdf ? "cursor-pointer hover:underline" : ""}`}
        >
          {latinActive ? la : lang}
          <sup>
            {endangered ? "†" : null}
            {nonresident ? "°" : null}
            {pioneer ? "*" : null}
          </sup>
        </span>
        &nbsp;
      </>
    );
  }, [latinActive, la, lang, endangered, nonresident, pioneer, hasPdf]);

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

function TreeTypeList({
  className,
  codes,
}: {
  className?: string;
  codes?: number[];
}) {
  const { i18n } = useTranslation();

  const treeInfos = useMemo(() => {
    return getSortedTreeTypes(codes, i18n.language as TreeAppLanguage);
  }, [codes, i18n.language]);

  return (
    <span className={`w-full text-xl ${className}`}>
      {(treeInfos ?? []).map((treeInfo) => {
        return <TreeType key={treeInfo.code} {...treeInfo} />;
      })}
    </span>
  );
}

export default TreeTypeList;
