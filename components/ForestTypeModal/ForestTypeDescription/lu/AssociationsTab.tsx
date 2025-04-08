import { useTranslation } from "react-i18next";

import ForestTypeLinksList from "@/components/ForestTypeLinksList";
import Table from "@/components/ui/Table";
import useStore from "@/store";
import useIsMobile from "@/utils/hooks/useIsMobile";
import parseString from "@/utils/parseString";

import type { LuAssociationGroup, LuForestType } from "@geops/tree-lib/types";

function AssociationsTab({
  data,
  onForestTypeChange,
}: {
  data: LuForestType;
  onForestTypeChange: () => void;
}) {
  const { t } = useTranslation();
  const setForestTypeDescription = useStore(
    (state) => state.setForestTypeDescription,
  );
  const isMobile = useIsMobile();
  const treeClient = useStore((state) => state.treeClient);
  const associationGroup = treeClient.getTypes<LuAssociationGroup>(
    "lu_associationgroup",
    undefined,
    { code: `= '${data.associationgroupcode}'` },
  )?.[0];
  const forestSubTypes = treeClient.getTypes<LuForestType>(
    "lu_foresttype",
    undefined,
    { associationgroupcode: `= '${data.associationgroupcode}'` },
  );

  return (
    <>
      <h3>
        {associationGroup ? (
          <>
            {associationGroup.code} - {associationGroup.de}{" "}
            {associationGroup.la ? <i>{associationGroup.la}</i> : null}
          </>
        ) : (
          t("forestTypeModal.noDataHeader")
        )}
      </h3>
      <Table stackable={isMobile}>
        <Table.Row>
          <Table.Cell isHeader>{t("lu.forestType.aptitudeMeaning")}</Table.Cell>
          <Table.Cell>
            <p>{parseString(associationGroup.aptitudemeaning)}</p>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell isHeader>{t("lu.forestType.description")}</Table.Cell>
          <Table.Cell>
            <p>{parseString(associationGroup.description)}</p>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell isHeader>
            {t("lu.forestType.heightDispersion")}
          </Table.Cell>
          <Table.Cell>
            <p>{parseString(associationGroup.heightdispersion)}</p>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell isHeader>{t("lu.forestType.location")}</Table.Cell>
          <Table.Cell>
            <p>{parseString(associationGroup.location)}</p>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell isHeader>{t("forestTypeDiagram.soil.header")}</Table.Cell>
          <Table.Cell>
            <p>{parseString(associationGroup.soil)}</p>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell isHeader>{t("lu.forestType.subGroups")}</Table.Cell>
          <Table.Cell data-cypress="forestTypeDescription.lu.associationsTabSubGroups">
            <ForestTypeLinksList
              forestTypes={forestSubTypes}
              onClick={(evt, code) => {
                setForestTypeDescription(code);
                onForestTypeChange();
              }}
            />
          </Table.Cell>
        </Table.Row>
      </Table>
    </>
  );
}

export default AssociationsTab;
