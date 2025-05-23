import { useTranslation } from "react-i18next";

import NoData from "../../NoData";
import styles from "../styles";
import { getStyle } from "../utils";

function SoilDiagram({
  soil,
  soilVariants,
}: {
  soil: number[][];
  soilVariants: number[];
}) {
  const { t } = useTranslation();
  return (
    <svg className={styles.svg} viewBox="0 0 800 470">
      <rect
        className={getStyle(soil, "0.0")}
        height="75.075"
        width="87.891"
        x="229.253"
        y="299.246"
      />
      <rect
        className={getStyle(soil, "1.0")}
        height="75.075"
        width="35.324"
        x="317.144"
        y="299.246"
      />
      <rect
        className={getStyle(soil, "1.1")}
        height="23.781"
        width="35.323"
        x="317.146"
        y="421.978"
      />
      <rect
        className={getStyle(soil, "1.2")}
        height="23.875"
        width="35.324"
        x="317.144"
        y="374.321"
      />
      <rect
        className={getStyle(soil, "2.0")}
        height="75.075"
        width="35.324"
        x="352.468"
        y="299.246"
      />
      <rect
        className={getStyle(soil, "2.1")}
        height="23.781"
        width="35.323"
        x="352.469"
        y="421.978"
      />
      <rect
        className={getStyle(soil, "2.2")}
        height="23.875"
        width="35.324"
        x="352.468"
        y="374.321"
      />
      <rect
        className={getStyle(soil, "3.0")}
        height="75.075"
        width="35.324"
        x="387.792"
        y="299.246"
      />
      <rect
        className={getStyle(soil, "3.1")}
        height="23.781"
        width="35.323"
        x="387.792"
        y="421.978"
      />
      <rect
        className={getStyle(soil, "3.2")}
        height="23.875"
        width="35.324"
        x="387.792"
        y="374.321"
      />
      <rect
        className={getStyle(soil, "4.0")}
        height="75.075"
        width="35.324"
        x="423.115"
        y="299.246"
      />
      <rect
        className={getStyle(soil, "4.1")}
        height="23.781"
        width="35.323"
        x="423.115"
        y="421.978"
      />
      <rect
        className={getStyle(soil, "4.2")}
        height="23.875"
        width="35.324"
        x="423.115"
        y="374.321"
      />
      <rect
        className={getStyle(soil, "5.0")}
        height="75.075"
        width="63.766"
        x="458.439"
        y="299.246"
      />
      <rect
        className={getStyle(soil, "5.1")}
        height="23.781"
        width="63.976"
        x="458.439"
        y="421.978"
      />
      <rect
        className={getStyle(soil, "5.2")}
        height="23.875"
        width="63.766"
        x="458.439"
        y="374.321"
      />
      <rect
        className={getStyle(soil, "6.0")}
        height="75.075"
        width="63.766"
        x="522.205"
        y="299.246"
      />
      <rect
        className={getStyle(soil, "6.1")}
        height="23.781"
        width="63.976"
        x="522.415"
        y="421.978"
      />
      <rect
        className={getStyle(soil, "6.2")}
        height="23.875"
        width="63.766"
        x="522.205"
        y="374.321"
      />
      <rect
        className={getStyle(soil, "7.0")}
        height="75.075"
        width="69.945"
        x="585.971"
        y="299.246"
      />
      <rect
        className={getStyle(soil, "7.1")}
        height="23.875"
        width="69.945"
        x="585.971"
        y="374.321"
      />
      <rect
        className={getStyle(soil, "8.0")}
        height="75.075"
        width="71.454"
        x="655.916"
        y="299.246"
      />
      <rect
        className={getStyle(soil, "8.1")}
        height="23.781"
        width="72.042"
        x="655.916"
        y="421.978"
      />
      <rect
        className={getStyle(soil, "9.0")}
        height="75.075"
        width="71.454"
        x="727.37"
        y="299.246"
      />
      <rect
        className={getStyle(soil, "9.1")}
        height="23.781"
        width="72.042"
        x="727.958"
        y="421.978"
      />
      <rect
        className={getStyle(soilVariants, "3")}
        height="28.902"
        width="28.902"
        x="0"
        y="88.55"
      />
      <rect
        className={getStyle(soilVariants, "0")}
        height="28.902"
        width="28.902"
        x="0"
        y="129.77"
      />
      <rect
        className={getStyle(soilVariants, "4")}
        height="28.902"
        width="28.902"
        x="0"
        y="170.991"
      />
      <rect
        className={getStyle(soilVariants, "1")}
        height="28.902"
        width="28.902"
        x="0"
        y="212.211"
      />
      <rect
        className={getStyle(soilVariants, "2")}
        height="28.902"
        width="28.902"
        x="0"
        y="253.431"
      />{" "}
      <text className={styles.header} y="22">
        {t("forestTypeDiagram.soil.label")}
      </text>
      <text transform="rotate(-90 280 285)" x="280" y="285">
        {t("forestTypeDiagram.soil.rock")}
      </text>
      <text transform="rotate(-90 342 285)" x="342" y="285">
        {t("forestTypeDiagram.soil.ranker")}
      </text>
      <text transform="rotate(-90 376 285)" x="376" y="285">
        {t("forestTypeDiagram.soil.regosol")}
      </text>
      <text transform="rotate(-90 409 285)" x="409" y="285">
        {t("forestTypeDiagram.soil.pararendzina")}
      </text>
      <text transform="rotate(-90 443 285)" x="443" y="285">
        {t("forestTypeDiagram.soil.rendzina")}
      </text>
      <text transform="rotate(-90 496 285)" x="496" y="285">
        {t("forestTypeDiagram.soil.brown")}
      </text>
      <text transform="rotate(-90 563 285)" x="563" y="285">
        {t("forestTypeDiagram.soil.paraBrown")}
      </text>
      <text transform="rotate(-90 618 285)" x="618" y="285">
        {t("forestTypeDiagram.soil.podsol")}
      </text>
      <text transform="rotate(-90 640 285)" x="641" y="285">
        {t("forestTypeDiagram.soil.ironHumusPodsol")}
      </text>
      <text transform="rotate(-90 688 285)" x="688" y="285">
        {t("forestTypeDiagram.soil.tailwater")}
      </text>
      <text transform="rotate(-90 710 285)" x="710" y="285">
        {t("forestTypeDiagram.soil.tailwaterPseudo")}
      </text>
      <text transform="rotate(-90 755 285)" x="755" y="285">
        {t("forestTypeDiagram.soil.groundwater")}
      </text>
      <text transform="rotate(-90 777 285)" x="777" y="285">
        {t("forestTypeDiagram.soil.groundwaterGley")}
      </text>
      <text x="297" y="59">
        {t("forestTypeDiagram.soil.raw")}
      </text>
      <text x="483" y="59">
        {t("forestTypeDiagram.soil.developed")}
      </text>
      <text x="660" y="59">
        {t("forestTypeDiagram.soil.wet")}
      </text>
      <text x="40" y="107">
        {t("forestTypeDiagram.soil.organic")}
      </text>
      <text x="40" y="150">
        {t("forestTypeDiagram.soil.riverside")}
      </text>
      <text x="40" y="193">
        {t("forestTypeDiagram.soil.neutralBrown")}
      </text>
      <text x="40" y="236">
        {t("forestTypeDiagram.soil.brownPodsol")}
      </text>
      <text x="40" y="279">
        {t("forestTypeDiagram.soil.humusPodsol")}
      </text>
      <path
        className={styles.line}
        d="M0 89h29v29H0zM0 130h29v29H0zM0 171h29v29H0zM0 212h29v29H0zM0 253h29v29H0z"
      />
      <text x="488" y="463">
        {t("forestTypeDiagram.soil.podsoled")}
      </text>
      <text x="352" y="463">
        {t("forestTypeDiagram.soil.browned")}
      </text>
      <text x="680" y="463">
        {t("forestTypeDiagram.soil.bleached")}
      </text>
      <text x="236" y="392">
        {t("forestTypeDiagram.soil.weted")}
      </text>
      <path className={styles.line} d="M317 422v24" />
      <path className={styles.line} d="M229 46v329M229 374h570M799 46v329" />
      <path
        className={styles.line}
        d="M229 299h570M317 141v258M656 46v353M458 46v353M586 141v257M800 422v24M317 398h339M656 422h144M656 446h144M458 422v24M586 422v24M656 422v24M317 422h270M317 446h270"
      />
      {!soil && !soilVariants && <NoData height={470} width={800} />}
    </svg>
  );
}

export default SoilDiagram;
