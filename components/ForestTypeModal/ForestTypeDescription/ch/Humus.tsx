import { Trans, useTranslation } from "react-i18next";

import NoData from "../../NoData";
import styles from "../styles";
import { getStyle } from "../utils";

function Humus({
  humus,
  humusVariants,
}: {
  humus: number[][];
  humusVariants: number[];
}) {
  const { t } = useTranslation();
  return (
    <svg className={styles.svg} viewBox="0 0 800 400">
      <rect
        className={getStyle(humus, "0.0")}
        height="23.812"
        width="94.668"
        x="515.996"
        y="238.102"
      />
      <rect
        className={getStyle(humus, "0.1")}
        height="75.461"
        width="94.668"
        x="515.996"
        y="162.641"
      />
      <rect
        className={getStyle(humus, "0.2")}
        height="23.396"
        width="94.668"
        x="515.996"
        y="139.246"
      />

      <rect
        className={getStyle(humus, "1.0")}
        height="23.812"
        width="94.668"
        x="326.66"
        y="238.102"
      />
      <rect
        className={getStyle(humus, "1.1")}
        height="75.461"
        width="94.668"
        x="326.66"
        y="162.641"
      />
      <rect
        className={getStyle(humus, "1.2")}
        height="23.396"
        width="94.668"
        x="326.66"
        y="139.246"
      />

      <rect
        className={getStyle(humus, "2.0")}
        height="23.812"
        width="94.668"
        x="421.328"
        y="238.102"
      />
      <rect
        className={getStyle(humus, "2.1")}
        height="75.461"
        width="94.668"
        x="421.328"
        y="162.641"
      />
      <rect
        className={getStyle(humus, "2.2")}
        height="23.396"
        width="94.668"
        x="421.328"
        y="139.246"
      />

      <rect
        className={getStyle(humus, "3.0")}
        height="23.812"
        width="94.668"
        x="610.664"
        y="238.102"
      />
      <rect
        className={getStyle(humus, "3.1")}
        height="75.461"
        width="94.668"
        x="610.664"
        y="162.641"
      />
      <rect
        className={getStyle(humus, "3.2")}
        height="23.396"
        width="94.668"
        x="610.664"
        y="139.246"
      />

      <rect
        className={getStyle(humus, "4.0")}
        height="23.812"
        width="94.668"
        x="705.332"
        y="238.102"
      />
      <rect
        className={getStyle(humus, "4.1")}
        height="75.461"
        width="94.668"
        x="705.332"
        y="162.641"
      />
      <rect
        className={getStyle(humus, "4.2")}
        height="23.396"
        width="94.668"
        x="705.332"
        y="139.246"
      />

      <rect
        className={getStyle(humus, "5.0")}
        height="23.812"
        width="94.824"
        x="231.836"
        y="238.102"
      />
      <rect
        className={getStyle(humus, "5.1")}
        height="75.461"
        width="94.824"
        x="231.836"
        y="162.641"
      />
      <rect
        className={getStyle(humus, "5.2")}
        height="23.396"
        width="94.824"
        x="231.836"
        y="139.246"
      />

      <rect
        className={getStyle(humusVariants, "0")}
        height="28.812"
        width="28.812"
        x="234.003"
        y="333.928"
      />
      <rect
        className={getStyle(humusVariants, "4")}
        height="28.812"
        width="28.812"
        x="234.003"
        y="369.759"
      />
      <rect
        className={getStyle(humusVariants, "2")}
        height="28.812"
        width="28.812"
        x="418.378"
        y="334.084"
      />
      <rect
        className={getStyle(humusVariants, "1")}
        height="28.812"
        width="28.812"
        x="418.378"
        y="368.744"
      />
      <rect
        className={getStyle(humusVariants, "3")}
        height="28.812"
        width="28.812"
        x="603.815"
        y="334.095"
      />
      <rect
        className={getStyle(humusVariants, "5")}
        height="28.812"
        width="28.812"
        x="603.815"
        y="369.929"
      />
      <text className={styles.header} x="1" y="20">
        {t("forestTypeDiagram.humus.label")}
      </text>
      <path className={styles.line} d="M232 41v222M231 262h568" />
      <path className={styles.line} d="M231 238h568" />
      <path className={styles.line} d="M800 42v221" />
      <path
        className={styles.line}
        d="M231 163h568M231 139h568M421 73v190M611 42v220M327 42v221M516 73v190"
      />
      <path className={styles.line} d="M705 73v189" />
      <text className={styles.labelMiddleBold} x="280" y="67">
        {t("forestTypeDiagram.humus.mor")}
      </text>
      <text className={styles.labelMiddleBold} x="470" y="67">
        {t("forestTypeDiagram.humus.moder")}
      </text>
      <text className={styles.labelMiddleBold} x="700" y="67">
        {t("forestTypeDiagram.humus.mull")}
      </text>
      <text className={styles.labelMiddle} y="90">
        <Trans i18nKey="forestTypeDiagram.humus.morLike">
          <tspan x="375">mor</tspan>
          <tspan dy="20" x="375">
            like
          </tspan>
          <tspan dy="20" x="375">
            moder
          </tspan>
        </Trans>
      </text>
      <text className={styles.labelMiddle} y="90">
        <Trans i18nKey="forestTypeDiagram.humus.moderLike">
          <tspan x="470">moderLike</tspan>
          <tspan dy="20" x="470">
            moder
          </tspan>
        </Trans>
      </text>
      <text className={styles.labelMiddle} y="90">
        <Trans i18nKey="forestTypeDiagram.humus.mullLike">
          <tspan x="564">mullLike</tspan>
          <tspan dy="20" x="564">
            moder
          </tspan>
        </Trans>
      </text>
      <text className={styles.labelMiddle} x="660" y="107">
        {t("forestTypeDiagram.humus.fmull")}
      </text>
      <text className={styles.labelMiddle} x="750" y="107">
        {t("forestTypeDiagram.humus.lmull")}
      </text>
      <path className={styles.line} d="M0 162h190M0 238h190" />
      <text className={styles.label} x="1" y="129">
        {t("forestTypeDiagram.humus.dry")}
      </text>
      <text className={styles.label} x="1" y="151">
        {t("forestTypeDiagram.humus.xero")}
      </text>
      <text className={styles.label} x="1" y="261">
        {t("forestTypeDiagram.humus.wet")}
      </text>
      <text className={styles.label} x="1" y="283">
        {t("forestTypeDiagram.humus.hydro")}
      </text>
      <text className={styles.label} x="644" y="354">
        {t("forestTypeDiagram.humus.tangel")}
      </text>
      <text className={styles.label} x="644" y="391">
        {t("forestTypeDiagram.humus.eroded")}
      </text>
      <path
        className={styles.line}
        d="M604 334h29v29h-29zM604 370h29v29h-29z"
      />
      <text className={styles.header} x="2" y="352">
        {t("forestTypeDiagram.humus.variants")}
      </text>
      <text className={styles.label} x="458" y="354">
        {t("forestTypeDiagram.humus.limeMull")}
      </text>
      <text className={styles.label} x="458" y="391">
        {t("forestTypeDiagram.humus.limeModer")}
      </text>
      <path
        className={styles.line}
        d="M418 334h29v29h-29zM418 369h29v29h-29z"
      />
      <text className={styles.label} x="273" y="354">
        {t("forestTypeDiagram.humus.halfBog")}
      </text>
      <text className={styles.label} x="273" y="391">
        {t("forestTypeDiagram.humus.turf")}
      </text>
      <path
        className={styles.line}
        d="M234 334h29v29h-29zM234 370h29v29h-29z"
      />
      {!humus && !humusVariants && <NoData height={400} width={800} />}
    </svg>
  );
}

export default Humus;
