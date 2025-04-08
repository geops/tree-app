import { useTranslation } from "react-i18next";

import useStore from "@/store";

import Message from "../ui/Message";

function MissingDataMessage() {
  const { t } = useTranslation();
  const projectionMode = useStore((state) => state.projectionMode);
  const mapLocation = useStore((state) => state.mapLocation);
  const { options: opts } = useStore((state) =>
    state.projectionMode === "m"
      ? state.projectionResult?.extreme
      : state.projectionResult.form,
  );

  if (opts?.forestType?.length ?? projectionMode !== "m") return null;

  if (!mapLocation.coordinate) {
    return <Message>{t("projection.missingLocation")}</Message>;
  }

  return (
    <Message>
      {!mapLocation.altitudinalZone
        ? t("projection.missingLocationData")
        : t("projection.missingProjectionData")}
    </Message>
  );
}

export default MissingDataMessage;
