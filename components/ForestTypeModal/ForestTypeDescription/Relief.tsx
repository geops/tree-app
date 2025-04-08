import Image from "next/image";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import useStore from "@/store";
import getReliefImageUrl from "@/utils/getReliefImageUrl";

import { labelMiddleBold } from "./styles";

function Relief({
  code,
  trimCode = false,
}: {
  code: string;
  trimCode?: boolean;
}) {
  const { t } = useTranslation();
  const activeProfile = useStore((state) => state.activeProfile);
  const imageUrl = useMemo(
    () => getReliefImageUrl(code, activeProfile, trimCode),
    [code, activeProfile, trimCode],
  );
  return imageUrl ? (
    <Image
      alt={`${code}-relief`}
      className="h-full max-h-52 w-auto max-w-full object-contain"
      height={200}
      src={imageUrl}
      width={200}
    />
  ) : (
    <span className={labelMiddleBold}>{t("forestTypeDiagram.noData")}</span>
  );
}

export default Relief;
