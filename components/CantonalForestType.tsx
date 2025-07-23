import { Field } from "@headlessui/react";
import { useTranslation } from "react-i18next";

import useStore from "@/store";
import useCantonalForestType from "@/utils/hooks/useCantonalForestType";
import useHasPdf from "@/utils/hooks/useHasPdf";

import InfoButton from "./ui/InfoButton";
import Label from "./ui/Label";

const soPdfEndpoint = process.env.NEXT_PUBLIC_SO_PDF_ENDPOINT;

function CantonalForestType() {
  const { t } = useTranslation();
  const setForestTypeDescription = useStore(
    (state) => state.setForestTypeDescription,
  );
  const cantonalForestType = useCantonalForestType();
  const hasPdf = useHasPdf(
    cantonalForestType &&
      `${soPdfEndpoint}/${cantonalForestType.replace("*", "stern")}.pdf`,
    ["so"],
  );

  if (!cantonalForestType) return null;

  return (
    <Field className="flex flex-col">
      <Label>{t("forestType.cantonalForestType")}</Label>
      <div className="flex items-center gap-4">
        <InfoButton
          circle={false}
          className="h-8 w-8 rounded bg-primary-500 text-white hover:bg-primary-200 hover:text-white"
          disabled={!hasPdf}
          onClick={() => setForestTypeDescription(cantonalForestType)}
        />
        <h4 className="text-primary-500">{cantonalForestType}</h4>
      </div>
    </Field>
  );
}

export default CantonalForestType;
