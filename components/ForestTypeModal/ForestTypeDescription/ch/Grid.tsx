import NoData from "../../NoData";
import styles from "../styles";
import { getStyle } from "../utils";

function Grid({
  data,
  header,
  headerX,
  headerY,
  labelX,
  labelY,
}: {
  data: object;
  header: string;
  headerX: string;
  headerY: string;
  labelX: string[];
  labelY: string[];
}) {
  return (
    <svg className={styles.svg} viewBox="0 0 400 400">
      <text className={styles.header} x="10" y="13">
        {header}
      </text>
      <text className={styles.labelBold} x="10" y="45">
        {headerX}
      </text>
      <text transform="rotate(-45 23 114)" x="23" y="118">
        {labelX[0]}
      </text>
      <text transform="rotate(-45 67 114)" x="68" y="118">
        {labelX[1]}
      </text>
      <text transform="rotate(-45 116 115)" x="116" y="118">
        {labelX[2]}
      </text>
      <text transform="rotate(-45 161 115)" x="161" y="118">
        {labelX[3]}
      </text>
      <text transform="rotate(-45 208 112)" x="208" y="118">
        {labelX[4]}
      </text>
      <text transform="rotate(-45 255 114)" x="255" y="118">
        {labelX[5]}
      </text>
      <path className={getStyle(data, "0.0")} d="M1 121h46v46H1z" />
      <path className={getStyle(data, "0.1")} d="M47 121h47v46H47z" />
      <path className={getStyle(data, "0.2")} d="M93 121h47v46H93z" />
      <path className={getStyle(data, "0.3")} d="M140 121h47v46h-47z" />
      <path className={getStyle(data, "0.4")} d="M187 121h47v46h-47z" />
      <path className={getStyle(data, "0.5")} d="M233 121h47v46h-46z" />
      <path className={getStyle(data, "1.0")} d="M1 167h46v47H1z" />
      <path className={getStyle(data, "1.1")} d="M47 167h47v47H47z" />
      <path className={getStyle(data, "1.2")} d="M93 167h47v47H93z" />
      <path className={getStyle(data, "1.3")} d="M140 167h47v47h-47z" />
      <path className={getStyle(data, "1.4")} d="M187 167h47v47h-47z" />
      <path className={getStyle(data, "1.5")} d="M233 167h47v47h-46z" />
      <path className={getStyle(data, "2.0")} d="M1 213h46v47H1z" />
      <path className={getStyle(data, "2.1")} d="M47 213h47v47H47z" />
      <path className={getStyle(data, "2.2")} d="M93 213h47v47H93z" />
      <path className={getStyle(data, "2.3")} d="M140 213h47v47h-47z" />
      <path className={getStyle(data, "2.4")} d="M187 213h47v47h-47z" />
      <path className={getStyle(data, "2.5")} d="M233 213h47v47h-46z" />
      <path className={getStyle(data, "3.0")} d="M1 260h46v47H1z" />
      <path className={getStyle(data, "3.1")} d="M47 260h47v47H47z" />
      <path className={getStyle(data, "3.2")} d="M93 260h47v47H93z" />
      <path className={getStyle(data, "3.3")} d="M140 260h47v47h-47z" />
      <path className={getStyle(data, "3.4")} d="M187 260h47v47h-47z" />
      <path className={getStyle(data, "3.5")} d="M233 260h47v47h-46z" />
      <path className={getStyle(data, "4.0")} d="M1 307h46v47H1z" />
      <path className={getStyle(data, "4.1")} d="M47 307h47v47H47z" />
      <path className={getStyle(data, "4.2")} d="M93 307h47v47H93z" />
      <path className={getStyle(data, "4.3")} d="M140 307h47v47h-47z" />
      <path className={getStyle(data, "4.4")} d="M187 307h47v47h-47z" />
      <path className={getStyle(data, "4.5")} d="M233 307h47v47h-46z" />
      <path className={getStyle(data, "5.0")} d="M1 354h46v46H1z" />
      <path className={getStyle(data, "5.1")} d="M47 354h47v46H47z" />
      <path className={getStyle(data, "5.2")} d="M93 354h47v46H93z" />
      <path className={getStyle(data, "5.3")} d="M140 354h47v46h-47z" />
      <path className={getStyle(data, "5.4")} d="M187 354h47v46h-47z" />
      <path className={getStyle(data, "5.5")} d="M233 354h47v46h-46z" />
      <text className={styles.labelBold} x="278" y="116">
        {headerY}
      </text>
      <text x="289" y="148">
        {labelY[0]}
      </text>
      <text x="289" y="195">
        {labelY[1]}
      </text>
      <text x="289" y="242">
        {labelY[2]}
      </text>
      <text x="289" y="289">
        {labelY[3]}
      </text>
      <text x="289" y="336">
        {labelY[4]}
      </text>
      <text x="289" y="383">
        {labelY[5]}
      </text>
      <path className={styles.line} d="M1 121h279v279H1z" />
      <path
        className={styles.line}
        d="M47 121v280M93 121v280M140 121v280M187 121v280M233 121v279M1 354h279M1 307h279M1 260h279M1 213h279M1 167h279"
      />
      {!data && <NoData height={400} width={400} />}
    </svg>
  );
}

export default Grid;
