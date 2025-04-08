import { useTranslation } from "react-i18next";

import SoilIcon from "./icons/SoilIcon";
import Table from "./ui/Table";

function DataTable({
  data,
  getLabel = (value: number) => `${value}`,
  getValue = (value: number) => value,
}: {
  data: (null | number)[];
  getLabel: (value: number) => string;
  getValue?: (value: number) => number;
}) {
  const { t } = useTranslation();
  if (!data?.length) {
    return <strong>{t("forestTypeModal.noDataHeader")}</strong>;
  }

  const rows = data.map((row, index) => {
    return row
      ? { icon: <SoilIcon value={getValue(row)} />, label: getLabel(index) }
      : null;
  });

  return (
    <div className="w-full max-w-md">
      <Table>
        {rows.filter(Boolean).map((row, index) => (
          <Table.Row
            className={index === 0 ? "border-t-0" : ""}
            key={row?.label}
          >
            <Table.Cell>
              <div className="flex items-center justify-between">
                <span className="w-9/10 max-w-xs">{row?.label}</span>
                {row?.icon}
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table>
    </div>
  );
}

export default DataTable;
