import Table from "@/components/ui/Table";

import type { ReactNode } from "react";

const HeaderCell = ({
  children,
  className = "",
  ...props
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <Table.Cell className={`align-top ${className}`} isHeader {...props}>
      {children}
    </Table.Cell>
  );
};

export default HeaderCell;
