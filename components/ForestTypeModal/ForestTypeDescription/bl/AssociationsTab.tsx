import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import ForestTypeLinksList from "@/components/ForestTypeLinksList";
import Table from "@/components/ui/Table";
import useStore from "@/store";
import useIsMobile from "@/utils/hooks/useIsMobile";
import parseString from "@/utils/parseString";

import type { BlAssociationGroup, BlForestType } from "@geops/tree-lib/types";

function AssociationsTab({
  onForestTypeChange,
}: {
  data: BlForestType;
  onForestTypeChange: () => void;
}) {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const setForestTypeDescription = useStore(
    (state) => state.setForestTypeDescription,
  );
  const treeClient = useStore((state) => state.treeClient);

  const associationGroup = treeClient.getTypes<BlAssociationGroup>(
    "bl_associationgroup",
    undefined,
    undefined,
    `WHERE '15' IN (
      SELECT value
      FROM json_each(bl_associationgroup.locations)
      )`,
  )?.[0];

  const forestSubTypes = useMemo(() => {
    if (!associationGroup?.locations) return [];
    const forestTypes = treeClient.getTypes<BlForestType>("bl_foresttype");
    return forestTypes?.filter((ft) =>
      associationGroup.locations?.includes(ft.code),
    );
  }, [associationGroup?.locations, treeClient]);

  return (
    <>
      <h3>
        {associationGroup
          ? `${associationGroup.category} - ${associationGroup.de}`
          : t("forestTypeModal.noDataHeader")}
      </h3>
      {associationGroup && (
        <Table stackable={isMobile}>
          <Table.Row className="border-t-0">
            <Table.Cell isHeader>Nutzung und Pflege</Table.Cell>
            <Table.Cell>
              <p>{parseString(associationGroup.useandcare)}</p>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell isHeader>Waldbild</Table.Cell>
            <Table.Cell>
              <p>{parseString(associationGroup?.forestappearance)}</p>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell isHeader>Höhenverbreitung</Table.Cell>
            <Table.Cell>
              <p>{parseString(associationGroup.heightdispersion)}</p>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell isHeader>Standortbeschreibung</Table.Cell>
            <Table.Cell>
              <p>{parseString(associationGroup?.description)}</p>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell isHeader>Standortstypen</Table.Cell>
            <Table.Cell>
              <ForestTypeLinksList
                forestTypes={forestSubTypes}
                onClick={(evt, code) => {
                  setForestTypeDescription(code);
                  onForestTypeChange();
                }}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell isHeader>Fläche</Table.Cell>
            <Table.Cell>
              <div>
                <strong>Basel-Land:</strong>
                {` ${associationGroup.areabl}ha`}
              </div>
              <div>
                <strong>Basel-Stadt:</strong>
                {` ${associationGroup.areabs}ha`}
              </div>
              <div>
                <strong>Gesamter Flächenanteil:</strong>
                {` ${associationGroup.areablbspercent}%`}
              </div>
            </Table.Cell>
          </Table.Row>
        </Table>
      )}
    </>
  );
}

export default AssociationsTab;
