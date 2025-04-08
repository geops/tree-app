import { useTranslation } from "react-i18next";

function NoData({
  className = "",
  height = "100%",
  width = "100%",
}: {
  className?: string;
  height?: number | string;
  width?: number | string;
}) {
  const { t } = useTranslation();
  return (
    <svg height={height} width={width} xmlns="http://www.w3.org/2000/svg">
      <rect
        height={height}
        style={{ fill: "white", opacity: 0.8 }}
        width={width}
        x="0"
        y="0"
      />
      <text className={className} x="50%" y="50%">
        {t("forestTypeDiagram.noData")}
      </text>
    </svg>
  );
}

export default NoData;
