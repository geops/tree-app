import { useTranslation } from "react-i18next";

import styles from "./styles";

function Legend({
  medium = true,
  often = true,
  rare = true,
  title = "",
}: {
  medium?: boolean;
  often?: boolean;
  rare?: boolean;
  title?: false | string;
}) {
  const { t } = useTranslation();
  return (
    <div className="mb-8">
      {title !== false && (
        <h3>{title || t("forestTypeDiagram.legend.label")}</h3>
      )}
      <div
        className="flex items-center justify-between"
        style={{
          maxWidth: [rare, medium, often].some((val) => val === false)
            ? 250
            : 400,
        }}
      >
        {often && (
          <svg height="30" viewBox="0 0 160 50">
            <text className={styles.label} x="40" y="18">
              {t("forestTypeDiagram.legend.often")}
            </text>
            <rect
              className={`stroke-[#333] ${styles.often}`}
              height="26.669"
              width="26.669"
            />
          </svg>
        )}
        {medium && (
          <svg height="30" viewBox="0 0 160 50">
            <text className={styles.label} x="40" y="18">
              {t("forestTypeDiagram.legend.medium")}
            </text>
            <rect
              className={`stroke-[#333] ${styles.medium}`}
              height="26.669"
              width="26.669"
            />
          </svg>
        )}
        {rare && (
          <svg height="30" viewBox="0 0 160 50">
            <text className={styles.label} x="40" y="18">
              {t("forestTypeDiagram.legend.rare")}
            </text>
            <rect
              className={`stroke-[#333] ${styles.rare}`}
              height="26.669"
              width="26.669"
            />
          </svg>
        )}
      </div>
    </div>
  );
}

export default Legend;
