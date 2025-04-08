import { medium, often } from "../styles";

import { getRowWidth, TilleringGrid } from "./Tillering";

import type { LuForestType } from "@geops/tree-lib/types";

function TilleringSingle({
  data,
}: {
  data: LuForestType["tilleringhardwood"];
}) {
  if (!data || data.filter((i) => i).length === 0) {
    return "-";
  }

  return (
    <svg
      className="max-h-14 max-w-96"
      viewBox="0 0 310 45"
      x="0"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <rect
          className={medium}
          height="15"
          width={getRowWidth(data[1])}
          x="40"
          y="5"
        />
        <rect
          className={often}
          height="15"
          width={getRowWidth(data[0])}
          x="40"
          y="5"
        />
        <TilleringGrid height={30} />
      </g>
    </svg>
  );
}

export default TilleringSingle;
