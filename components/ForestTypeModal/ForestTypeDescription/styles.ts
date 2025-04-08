export const svg = "block mb-8";

export const line = "stroke-[#333] fill-none";
export const thinLine = `${line} stroke-[0.5px]`;
export const greyLine = "stroke-[#999] fill-none";
export const dashedLine = "[stroke-dasharray:10,10]";
export const bgLine =
  "fill-none stroke-[#fff] stroke-[8.52px] [stroke-miterlimit:4] [fill-rule:nonzero]";

export const header = "text-xl font-bold";

export const label = "text-base";
export const labelBold = `${label} font-bold`;
export const labelMiddle = "text-base [text-anchor:middle]";
export const labelMiddleBold = `${labelMiddle} font-bold`;
export const labelSmallBold = "text-[8px] font-bold";
export const labelXsBold = "text-[6px] font-bold";

export const rare = "fill-diagram-rare stroke-diagram-rare";
export const often = "fill-diagram-often stroke-diagram-often";
export const medium = "fill-diagram-medium stroke-diagram-medium";

const styles = {
  bgLine,
  dashedLine,
  greyLine,
  header,
  label,
  labelBold,
  labelMiddle,
  labelMiddleBold,
  labelSmallBold,
  labelXsBold,
  line,
  medium,
  often,
  rare,
  svg,
  thinLine,
};

export default styles;
