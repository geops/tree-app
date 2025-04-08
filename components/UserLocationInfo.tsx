import { useTranslation } from "react-i18next";

import useStore from "@/store";

function UserLocationInfo({
  className = "",
  needsUrlId = false,
}: {
  className?: string;
  needsUrlId?: boolean;
}) {
  const { t } = useTranslation();
  const id = new URLSearchParams(window.location.search).get("id");
  const selectedFeature = useStore((state) => state.selectedFeature);
  const { comment, creator, timestamp } =
    selectedFeature?.getProperties() ?? {};

  if (
    (needsUrlId && (!id || id !== selectedFeature?.get("id"))) ||
    !selectedFeature
  ) {
    return null;
  }

  return (
    <div className={className}>
      <h4 className="text-primary-500">
        {t("userLocations.date", {
          timestamp: new Date(timestamp as number).toLocaleDateString(),
        })}
      </h4>
      <span className="text-gray-700">
        {t("userLocations.creatorLabel")}: {creator}
      </span>
      {comment && <p>{comment}</p>}
    </div>
  );
}

export default UserLocationInfo;
