import { useMemo } from "react";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";

import useStore from "@/store";
import getSortedTreeTypes from "@/utils/getSortedTreeTypes";

import type { TreeAppLanguage } from "@/i18n/i18next";

function TreeTypeList({
  className,
  codes,
}: {
  className?: string;
  codes?: number[];
}) {
  const latinActive = useStore((state) => state.latinActive);
  const { i18n } = useTranslation();

  const treeInfos = useMemo(() => {
    return getSortedTreeTypes(codes, i18n.language as TreeAppLanguage);
  }, [codes, i18n.language]);

  return (
    <span className={`text-xl ${className}`}>
      {(treeInfos ?? []).map((treeInfo) => {
        return (
          <Fragment key={treeInfo.code}>
            {treeInfo[latinActive ? "la" : (i18n.language as TreeAppLanguage)]}
            <sup>
              {treeInfo.endangered ? "†" : null}
              {treeInfo.nonresident ? "°" : null}
              {treeInfo.pioneer ? "*" : null}
            </sup>{" "}
          </Fragment>
        );
      })}
    </span>
  );
}

export default TreeTypeList;
