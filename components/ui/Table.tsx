import renderChildrenWithProps from "@/utils/renderChildrenWithProps";

import type { FC, HTMLAttributes, ReactNode } from "react";

interface TableProps extends HTMLAttributes<HTMLTableElement> {
  children?: ReactNode;
  className?: string;
  stackable?: boolean;
}

function Table({
  children,
  className = "",
  stackable = true,
  ...props
}: TableProps) {
  return (
    <table
      className={`w-full border text-left rtl:text-right ${className}`}
      {...props}
    >
      <tbody className={`${stackable ? "block w-auto" : ""}`}>
        {renderChildrenWithProps(children, {
          stackable,
        })}
      </tbody>
    </table>
  );
}

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children?: React.ReactNode;
  className?: string;
  stackable?: boolean;
}

function TableRow({
  children,
  className = "",
  stackable,
  ...props
}: TableRowProps) {
  return (
    <tr
      className={`border-t ${className} ${stackable ? "block flex flex-col gap-2 p-2" : ""}`}
      {...props}
    >
      {renderChildrenWithProps(children, { stackable })}
    </tr>
  );
}

type TableCellProps = {
  children?: React.ReactNode;
  className?: string;
  isHeader?: boolean;
  stackable?: boolean;
} & React.TdHTMLAttributes<HTMLTableCellElement>;

const TableCell: FC<TableCellProps> = ({
  children,
  className = "",
  isHeader = false,
  stackable,
  ...props
}) => {
  const Tag = isHeader ? "th" : "td";
  return (
    <Tag
      className={`px-1 py-4 md:px-4 md:py-4 ${stackable ? "block w-auto px-2" : ""} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
};

Table.Row = TableRow;
Table.Cell = TableCell;

export default Table;
