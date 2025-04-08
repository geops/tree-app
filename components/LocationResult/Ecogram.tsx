import { useState } from "react";
import { useTranslation } from "react-i18next";

import EcogramPopup from "./EcogramPopup";

import type { Ecogram as EcogramType } from "@geops/tree-lib/types";

const classNameLabel = "fill-[#999999] text-2xl [text-anchor:middle]";
const classNameButtonText =
  "pointer-events-none fill-white text-2xl [text-anchor:middle]";

function Ecogram({ data }: { data: EcogramType[] }) {
  const [popup, setPopup] = useState<{
    forestTypes: string[];
    id: string;
  }>({ forestTypes: [], id: "" });
  const { t } = useTranslation();

  return (
    <div className="relative">
      <EcogramPopup forestTypes={popup.forestTypes} />
      <svg className="max-w-[525px]" viewBox="0 0 1050 1050" x="0px" y="0px">
        <g transform="translate(49,1)">
          <line
            className="stroke-primary-100"
            x1="200"
            x2="200"
            y1="0"
            y2="1000"
          />
          <line
            className="stroke-primary-100"
            x1="500"
            x2="500"
            y1="0"
            y2="1000"
          />
          <line
            className="stroke-primary-100"
            x1="800"
            x2="800"
            y1="0"
            y2="1000"
          />
          <line
            className="stroke-primary-100"
            x1="0"
            x2="1000"
            y1="200"
            y2="200"
          />
          <line
            className="stroke-primary-100"
            x1="0"
            x2="1000"
            y1="492"
            y2="492"
          />
          <line
            className="stroke-primary-100"
            x1="0"
            x2="1000"
            y1="800"
            y2="800"
          />
          {data
            .sort((a, b) => a.z - b.z)
            .map(({ a, foresttypes, h, ox, oy, r, w, x, y }) => (
              <>
                <rect
                  className={`stroke pointer-events-none cursor-pointer fill-[#999] stroke-white stroke-2 ${a && "pointer-events-auto fill-primary-500 hover:fill-primary-200"}`}
                  data-tooltip-id="ecogram-popup"
                  height={h}
                  onClick={() =>
                    setPopup({
                      forestTypes: foresttypes,
                      id: `ecogram-popup-${foresttypes.toString()}`,
                    })
                  }
                  rx="5"
                  ry="5"
                  width={w}
                  x={x}
                  y={y}
                />
                {(r ?? ox ?? oy) ? (
                  [...new Array(r)].map((_, i) => (
                    <text
                      className={classNameButtonText}
                      key={i}
                      x={ox ? x + w / 2 + ox * 10 : x + w / 2}
                      y={
                        y +
                        h / 2 -
                        (r ? 20 * r : 0) +
                        35 * (i + 1) -
                        (oy ? 35 * oy : 0)
                      }
                    >
                      {foresttypes
                        .slice(
                          Math.floor(foresttypes.length / (r ?? 1)) * i,
                          i + 1 === r
                            ? foresttypes.length
                            : Math.floor(foresttypes.length / (r ?? 1)) *
                                (i + 1),
                        )
                        .join(" ")}
                    </text>
                  ))
                ) : (
                  <text
                    className={classNameButtonText}
                    x={x + w / 2}
                    y={y + h / 2 + 10}
                  >
                    {foresttypes.join(" ")}
                  </text>
                )}
              </>
            ))}
          <rect
            className="pointer-events-none fill-transparent stroke-[#999999] stroke-2"
            height={1000}
            width={1000}
            x={0}
            y={0}
          />
        </g>
        <text
          className={classNameLabel}
          transform="rotate(270,100,100)"
          x="100"
          y="30"
        >
          {t("ecogram.dry")}
        </text>
        <text
          className={classNameLabel}
          transform="rotate(270,100,100)"
          x="-720"
          y="30"
        >
          {t("ecogram.wet")}
        </text>
        <text className={classNameLabel} x="150" y="1040">
          {t("ecogram.acid")}
        </text>
        <text className={classNameLabel} x="940" y="1040">
          {t("ecogram.alkaline")}
        </text>
      </svg>
    </div>
  );
}

export default Ecogram;
