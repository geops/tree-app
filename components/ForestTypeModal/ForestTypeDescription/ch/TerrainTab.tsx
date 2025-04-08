import { useTranslation } from "react-i18next";

import Table from "@/components/ui/Table";

import Legend from "../Legend";

import AltitudinalZone from "./AltitudinalZoneForestEcoregion";
import Site from "./Site";

export interface TerrainTabProps {
  data: {
    altitude: number[];
    altitudinalzoneforestecoregion: number[];
    aspect: number[];
    carbonate: number[];
    geomorphology: number[];
    process: number[];
    relieftype: number[];
    slope: number[];
    water: number[];
  };
}

function TerrainTab({ data }: TerrainTabProps) {
  const { t } = useTranslation();
  const [c0, c1] = data.carbonate;
  const [r0, r1, r2, r3, r4] = data.relieftype;
  const [p0, p1, p2, p3] = data.process;
  const [g0, g1, g2, g3, g4, g5, g6] = data.geomorphology;
  const [w0, w1, w2, w3] = data.water;

  return (
    <>
      <Legend />
      <AltitudinalZone data={data.altitudinalzoneforestecoregion} />
      <Site altitude={data.altitude} aspect={data.aspect} slope={data.slope} />
      <Table stackable={false}>
        <Table.Row className="border-t-0">
          <Table.Cell isHeader rowSpan={2}>
            {t("forestType.carbonate.label")}
          </Table.Cell>
          <Table.Cell isHeader>{t("forestType.carbonate.fine")}</Table.Cell>
          <Table.Cell>
            {c0 !== null ? t(`forestType.frequency.${c0}`) : "-"}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell isHeader>{t("forestType.carbonate.rock")}</Table.Cell>
          <Table.Cell>
            {c1 !== null ? t(`forestType.frequency.${c1}`) : "-"}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell isHeader rowSpan={5}>
            {t("forestType.reliefType.label")}
          </Table.Cell>
          <Table.Cell isHeader>
            {t("forestType.reliefType.centralSlope")}
          </Table.Cell>
          <Table.Cell>
            {r0 !== null ? t(`forestType.frequency.${r0}`) : "-"}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell isHeader>{t("forestType.reliefType.hollow")}</Table.Cell>
          <Table.Cell>
            {r1 !== null ? t(`forestType.frequency.${r1}`) : "-"}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell isHeader>{t("forestType.reliefType.dome")}</Table.Cell>
          <Table.Cell>
            {r2 !== null ? t(`forestType.frequency.${r2}`) : "-"}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell isHeader>{t("forestType.reliefType.plateau")}</Table.Cell>
          <Table.Cell>
            {r3 !== null ? t(`forestType.frequency.${r3}`) : "-"}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell isHeader>{t("forestType.reliefType.steep")}</Table.Cell>
          <Table.Cell>
            {r4 !== null ? t(`forestType.frequency.${r4}`) : "-"}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell isHeader rowSpan={4}>
            {t("forestType.process.label")}
          </Table.Cell>
          <Table.Cell isHeader>{t("forestType.process.rockfall")}</Table.Cell>
          <Table.Cell>
            {p0 !== null ? t(`forestType.frequency.${p0}`) : "-"}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell isHeader>{t("forestType.process.avalanche")}</Table.Cell>
          <Table.Cell>
            {p1 !== null ? t(`forestType.frequency.${p1}`) : "-"}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell isHeader>{t("forestType.process.landslide")}</Table.Cell>
          <Table.Cell>
            {p2 !== null ? t(`forestType.frequency.${p2}`) : "-"}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell isHeader>{t("forestType.process.erosion")}</Table.Cell>
          <Table.Cell>
            {p3 !== null ? t(`forestType.frequency.${p3}`) : "-"}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell isHeader rowSpan={7}>
            {t("forestType.geomorphology.label")}
          </Table.Cell>
          <Table.Cell isHeader>
            {t("forestType.geomorphology.blockyRockyStrong")}
          </Table.Cell>
          <Table.Cell>
            {g1 !== null ? t(`forestType.frequency.${g1}`) : "-"}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell isHeader>
            {t("forestType.geomorphology.blockyRockyLittle")}
          </Table.Cell>
          <Table.Cell>
            {g2 !== null ? t(`forestType.frequency.${g2}`) : "-"}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell isHeader>
            {t("forestType.geomorphology.rocksStronglyMoved")}
          </Table.Cell>
          <Table.Cell>
            {g5 !== null ? t(`forestType.frequency.${g5}`) : "-"}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell isHeader>
            {t("forestType.geomorphology.rocksModeratelyMoved")}
          </Table.Cell>
          <Table.Cell>
            {g4 !== null ? t(`forestType.frequency.${g4}`) : "-"}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell isHeader>
            {t("forestType.geomorphology.rocksStabilised")}
          </Table.Cell>
          <Table.Cell>
            {g6 !== null ? t(`forestType.frequency.${g6}`) : "-"}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell isHeader>
            {t("forestType.geomorphology.limestonePavement")}
          </Table.Cell>
          <Table.Cell>
            {g3 !== null ? t(`forestType.frequency.${g3}`) : "-"}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell isHeader>
            {t("forestType.geomorphology.rockBand")}
          </Table.Cell>
          <Table.Cell>
            {g0 !== null ? t(`forestType.frequency.${g0}`) : "-"}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell isHeader rowSpan={3}>
            {t("forestType.water.label")}
          </Table.Cell>
          <Table.Cell isHeader>{t("forestType.water.stream")}</Table.Cell>
          <Table.Cell>
            {w0 !== null ? t(`forestType.frequency.${w0}`) : "-"}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell isHeader>{t("forestType.water.small")}</Table.Cell>
          <Table.Cell>
            {w1 !== null ? t(`forestType.frequency.${w1}`) : "-"}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell isHeader>{t("forestType.water.spring")}</Table.Cell>
          <Table.Cell>
            {w2 !== null ? t(`forestType.frequency.${w2}`) : "-"}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <td />
          <Table.Cell isHeader>{t("forestType.water.change")}</Table.Cell>
          <Table.Cell>
            {w3 !== null ? t(`forestType.frequency.${w3}`) : "-"}
          </Table.Cell>
        </Table.Row>
      </Table>
    </>
  );
}

export default TerrainTab;
