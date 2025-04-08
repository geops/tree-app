import { LuForestType } from "@geops/tree-lib/types";
import { useMemo } from "react";

import { label, medium, often } from "../styles";

import { getTilleringTreeTypes, TilleringRow } from "./getTilleringTreeTypes";

const mediumSecondary = "fill-[#a5bae1] stroke-[#a5bae1]";
const oftenSecondary = "fill-[#254185] stroke-[#254185]";

export const getRowWidth = (value: null | number) => (value ?? 0) * 2.5;

const renderRow = (row: TilleringRow, index: number) => {
  const barPadding = 1.6;
  const barHeight = 10 + barPadding;
  const barY = barPadding * 0.5 * index * 35;

  return (
    <g key={row.type}>
      <rect
        className={medium}
        height={barHeight - barPadding}
        width={getRowWidth(row.naturalForest?.[1] as unknown as number)}
        x="40"
        y={barY}
      />
      <rect
        className={often}
        height={barHeight - barPadding}
        width={getRowWidth(row.naturalForest?.[0] as unknown as number)}
        x="40"
        y={barY}
      />
      {row.farmForest && (
        <rect
          className={mediumSecondary}
          height={barHeight - barPadding}
          width={getRowWidth(row.farmForest[1] as unknown as number)}
          x="40"
          y={barY + 10}
        />
      )}
      {row.farmForest && (
        <rect
          className={oftenSecondary}
          height={barHeight - barPadding}
          width={getRowWidth(row.farmForest[0] as unknown as number)}
          x="40"
          y={barY + 10}
        />
      )}
      <svg style={{ overflow: "visible" }} x="35" y={barY + 12}>
        <text
          alignmentBaseline="middle"
          fontFamily="Lato,'Helvetica Neue',Arial,Helvetica,sans-serif"
          textAnchor="end"
        >
          {row.type}
        </text>
      </svg>
    </g>
  );
};

const BAR_WIDTH_100 = getRowWidth(100);

export function TilleringGrid({ height }: { height: number }) {
  return (
    <>
      <line
        stroke="black"
        x1="40"
        x2={BAR_WIDTH_100 + 40}
        y1={height - 5}
        y2={height - 5}
      />
      {[...Array(11).keys()].map((i) => {
        const factor = i / 10;
        return (
          <g key={i}>
            <line
              opacity={i > 0 ? 0.3 : 1}
              stroke="black"
              strokeDasharray={i > 0 && i % 2 !== 0 ? 4 : undefined}
              x1={BAR_WIDTH_100 * factor + 40}
              x2={BAR_WIDTH_100 * factor + 40}
              y1="0"
              y2={height}
            />
            {i % 2 === 0 && (
              <text
                alignmentBaseline="middle"
                fontFamily="Lato,'Helvetica Neue',Arial,Helvetica,sans-serif"
                fontSize="10"
                x={BAR_WIDTH_100 * factor + 32}
                y={height + 12}
              >
                {`${i * 10}%`}
              </text>
            )}
          </g>
        );
      })}
    </>
  );
}

function Tillering({ data }: { data: LuForestType["tillering"] }) {
  const rows = useMemo(() => getTilleringTreeTypes(data), [data]);

  if (!rows.length) {
    return null;
  }

  const gridHeight = rows.length * 28;
  const legendHeight = 40;

  return (
    <svg
      className="max-h-80 max-w-96"
      viewBox={`0 0 310 ${gridHeight + legendHeight}`}
      x="0"
      xmlns="http://www.w3.org/2000/svg"
    >
      {rows.map((row, index) => renderRow(row, index))}
      <TilleringGrid height={gridHeight} />
      <text
        className={label}
        fontFamily="Lato,'Helvetica Neue',Arial,Helvetica,sans-serif"
        x="40"
        y={gridHeight + legendHeight}
      >
        Naturwald
      </text>
      <rect
        className={often}
        height="10"
        width="20"
        x="10"
        y={gridHeight + legendHeight - 10}
      />
      <text
        className={label}
        fontFamily="Lato,'Helvetica Neue',Arial,Helvetica,sans-serif"
        x="180"
        y={gridHeight + legendHeight}
      >
        Wirtschaftswald
      </text>
      <rect
        className={oftenSecondary}
        height="10"
        width="20"
        x="150"
        y={gridHeight + legendHeight - 10}
      />
    </svg>
  );
}

export default Tillering;
