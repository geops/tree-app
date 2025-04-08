import { useTranslation } from "react-i18next";

import NoData from "../../NoData";
import styles from "../styles";
import { getStyle } from "../utils";

function Graininess({
  graininess,
  rawMaterial,
}: {
  graininess: number[];
  rawMaterial: number[];
}) {
  const { t } = useTranslation();
  return (
    <svg className={styles.svg} viewBox="0 0 400 400">
      <rect
        className={getStyle(graininess, "2")}
        height="148.564"
        width="13.917"
        x="58.282"
        y="203.993"
      />
      <rect
        className={getStyle(graininess, "7")}
        height="148.564"
        width="29.803"
        x="87.101"
        y="203.993"
      />
      <rect
        className={getStyle(graininess, "8")}
        height="148.564"
        width="29.803"
        x="146.707"
        y="203.993"
      />
      <path
        className={getStyle(graininess, "3")}
        d="M206.313,204.31l-0,148.696l147.928,-0.45l-147.928,-148.246Z"
      />
      <path
        className={getStyle(graininess, "6")}
        d="M87.101,84.842l-0,119.149l59.606,0l-0,-59.415l-59.606,-59.734Z"
      />
      <path
        className={getStyle(graininess, "4")}
        d="M87.101,203.991l-0,-119.149l-28.819,-28.88l0,148.029l28.819,0Z"
      />
      <path
        className={getStyle(graininess, "9")}
        d="M146.707,144.576l59.288,59.415l-59.288,0l-0,-59.415Z"
      />
      <rect
        className={getStyle(graininess, "0")}
        height="148.564"
        width="14.902"
        x="72.199"
        y="203.993"
      />
      <rect
        className={getStyle(graininess, "1")}
        height="148.564"
        width="29.803"
        x="116.904"
        y="203.993"
      />
      <rect
        className={getStyle(graininess, "5")}
        height="148.564"
        width="29.803"
        x="176.51"
        y="203.993"
      />
      <text className={styles.label} x="172.752px" y="393.468px">
        {t("forestTypeDiagram.graininess.clay")} [%]
      </text>
      <text
        className={styles.label}
        transform="matrix(-3.82857e-16,-1,1,-3.82857e-16,-247.954,281.83)"
        x="16.938px"
        y="264.892px"
      >
        {t("forestTypeDiagram.graininess.silt")} [%]
      </text>
      <text className={styles.header} x="3.378px" y="22.147px">
        {t("forestTypeDiagram.graininess.label")}
      </text>
      <path
        className={styles.line}
        d="M58.282,55.295l0,297.261l295.959,-0l-296.625,-297.261"
      />
      <path className={styles.thinLine} d="M53.547,203.991l152.766,0" />
      <path className={styles.thinLine} d="M87.101,353.006l-0,-268.17" />
      <path className={styles.thinLine} d="M72.199,353.006l0,-149.016" />
      <path className={styles.thinLine} d="M116.904,353.006l-0,-149.016" />
      <path className={styles.thinLine} d="M146.707,353.006l-0,-208.483" />
      <path className={styles.thinLine} d="M176.509,353.006l0,-149.016" />
      <path className={styles.thinLine} d="M206.313,353.006l-0,-149.016" />
      <path className={styles.thinLine} d="M53.547,55.415l4.994,-0" />
      <text className={styles.label} x="31.189px" y="204.017px">
        50
      </text>
      <text className={styles.label} x="21.446px" y="57.502px">
        100
      </text>
      <text className={styles.label} x="66.89px" y="372.076px">
        5
      </text>
      <text className={styles.label} x="136.964px" y="372.076px">
        30
      </text>
      <text className={styles.label} x="196.132px" y="372.076px">
        50
      </text>
      <text className={styles.label} x="330.814px" y="371.445px">
        100
      </text>
      <rect
        className={getStyle(rawMaterial, "1")}
        height="29.789"
        width="30.14"
        x="202.004"
        y="39.658"
      />
      <rect
        className={getStyle(rawMaterial, "0")}
        height="30.14"
        width="30.14"
        x="202.004"
        y="82.067"
      />
      <text className={styles.header} x="176.845px" y="22.14px">
        {t("forestTypeDiagram.rawMaterial.label")}
      </text>
      <text className={styles.label} x="243.757px" y="62.494px">
        {t("forestTypeDiagram.rawMaterial.acid")}
      </text>
      <text className={styles.label} x="243.757px" y="101.629px">
        {t("forestTypeDiagram.rawMaterial.alkaline")}
      </text>
      <text className={styles.label} x="243.757px" y="140.764px">
        {t("forestTypeDiagram.rawMaterial.unkown")}
      </text>
      <rect
        className={styles.line}
        height="30.183"
        width="30.183"
        x="201.692"
        y="39.532"
      />
      <rect
        className={styles.line}
        height="30.183"
        width="30.183"
        x="201.692"
        y="82.271"
      />
      {!graininess && !rawMaterial && <NoData height={400} width={400} />}
    </svg>
  );
}

export default Graininess;
