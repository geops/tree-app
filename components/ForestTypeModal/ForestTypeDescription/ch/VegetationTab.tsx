import { ReactNode, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import Table from "@/components/ui/Table";
import { TreeAppLanguage } from "@/i18n/i18next";
import useStore from "@/store";
import useIsMobile from "@/utils/hooks/useIsMobile";

import type {
  TranslatedTypeRecordLatin,
  VegetationInfo,
} from "@geops/tree-lib/types";

function VegetationTypesList({
  type,
  types,
}: {
  type: string;
  types: number[];
}) {
  const { i18n } = useTranslation();
  const tc = useStore((state) => state.treeClient);

  const getTypeInfo = useCallback(
    () =>
      (typeCode: number): null | TranslatedTypeRecordLatin => {
        if (!typeCode || !type) return null;

        return (
          tc.getTypes<TranslatedTypeRecordLatin>(`${type}`, undefined, {
            code: `= '${typeCode}'`,
          })?.[0] ?? null
        );
      },
    [type, tc],
  );

  const infos = useMemo(() => types.map(getTypeInfo()), [getTypeInfo, types]);

  return (
    <>
      {infos.length ? (
        infos
          .map((i) => {
            if (!i) return null;
            const { code, [i18n.language as TreeAppLanguage]: name, la } = i;
            return (
              <span key={code}>
                {name} (<i>{la}</i>)
              </span>
            );
          })
          .filter(Boolean)
          .reduce((finalNodes: ReactNode[], node, index: number) => {
            return index ? [...finalNodes, ", ", node] : [node];
          }, [])
      ) : (
        <>-</>
      )}
    </>
  );
}

export interface VegetationTabProps {
  data: {
    code: string;
    height: number[];
    location_de: string;
    location_fr: string;
    naturalforest_de: string;
    naturalforest_fr: string;
    vegetation_de: string;
    vegetation_fr: string;
  };
}

function VegetationTab({ data }: VegetationTabProps) {
  const { i18n, t } = useTranslation();
  const treeClient = useStore((state) => state.treeClient);
  const isMobile = useIsMobile();

  const [t1, t2, t3] = useMemo(
    () =>
      treeClient.getVegetationList({
        forestType: data.code,
      }),
    [data.code, treeClient],
  );

  const vegetationInfo = useMemo(() => {
    return treeClient.getVegetation({
      forestType: data.code,
    }) as VegetationInfo;
  }, [data.code, treeClient]);

  const [b1, b2] = vegetationInfo.bush;
  const [h1, h2] = vegetationInfo.herb;
  const [m1, m2] = vegetationInfo.moss;

  return (
    <Table stackable={isMobile}>
      <Table.Row className="border-t-0">
        <Table.Cell isHeader>{t("forestType.naturalForest")}</Table.Cell>
        <Table.Cell>
          {data[`naturalforest_${i18n.language as TreeAppLanguage}`]}
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell isHeader>{t("forestType.treeLayerHeight")}</Table.Cell>
        {data.height ? (
          <>
            <Table.Cell>
              {data.height[2]}m - {data.height[3]}m
            </Table.Cell>
            <Table.Cell>
              <strong>{t("forestType.coniferTreeHeightMax")}</strong>{" "}
              {data.height[0]}m
            </Table.Cell>
            <Table.Cell>
              <strong>{t("forestType.deciduousTreeHeightMax")}</strong>{" "}
              {data.height[1]}m
            </Table.Cell>
          </>
        ) : (
          <Table.Cell colSpan={3}>-</Table.Cell>
        )}
      </Table.Row>
      <Table.Row>
        <Table.Cell isHeader>{t("forestType.location")}</Table.Cell>
        <Table.Cell colSpan={3}>
          {data[`location_${i18n.language as TreeAppLanguage}`]}
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell isHeader>{t("forestType.vegetation")}</Table.Cell>
        <Table.Cell colSpan={3}>
          {data[`vegetation_${i18n.language as TreeAppLanguage}`]}
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell isHeader>{t("projection.treeTypesOne")}</Table.Cell>
        <Table.Cell colSpan={3}>
          <VegetationTypesList type="treetype" types={t1} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell isHeader>{t("projection.treeTypesTwo")}</Table.Cell>
        <Table.Cell colSpan={3}>
          <VegetationTypesList type="treetype" types={t2} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell isHeader>{t("projection.treeTypesThree")}</Table.Cell>
        <Table.Cell colSpan={3}>
          <VegetationTypesList type="treetype" types={t3} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell isHeader>
          {t("forestType.bush")} {t("forestType.often")}
        </Table.Cell>
        <Table.Cell colSpan={3}>
          <VegetationTypesList type="bushtype" types={b1} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell isHeader>
          {t("forestType.bush")} {t("forestType.rare")}
        </Table.Cell>
        <Table.Cell colSpan={3}>
          <VegetationTypesList type="bushtype" types={b2} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell isHeader>
          {t("forestType.herb")} {t("forestType.often")}
        </Table.Cell>
        <Table.Cell colSpan={3}>
          <VegetationTypesList type="herbtype" types={h1} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell isHeader>
          {t("forestType.herb")} {t("forestType.rare")}
        </Table.Cell>
        <Table.Cell colSpan={3}>
          <VegetationTypesList type="herbtype" types={h2} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell isHeader>
          {t("forestType.moss")} {t("forestType.often")}
        </Table.Cell>
        <Table.Cell colSpan={3}>
          <VegetationTypesList type="mosstype" types={m1} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell isHeader>
          {t("forestType.moss")} {t("forestType.rare")}
        </Table.Cell>
        <Table.Cell colSpan={3}>
          <VegetationTypesList type="mosstype" types={m2} />
        </Table.Cell>
      </Table.Row>
    </Table>
  );
}

export default VegetationTab;
