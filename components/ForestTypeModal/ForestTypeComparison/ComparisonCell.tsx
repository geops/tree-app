import ForestTypeLink from "@/components/ForestTypeLink";
import useIsMobile from "@/utils/hooks/useIsMobile";

import { getStringWithUnit } from "./getStringWithUnit";

interface ComparisonCellProps {
  children?: React.ReactNode;
  className?: string;
  code: string;
  data?: number | string;
  footer?: React.ReactNode;
  hasSameValues?: boolean;
  unit?: string;
}

const ComparisonCell = ({
  children = null,
  className = "",
  code,
  data,
  footer,
  hasSameValues,
  unit = "",
}: ComparisonCellProps) => {
  const isMobile = useIsMobile();
  return (
    <td className={`align-top ${className}`}>
      <>
        <span className="flex">
          {isMobile && (
            <span className="min-w-16">
              <ForestTypeLink code={code} />:
            </span>
          )}
          <span className={`${hasSameValues ? "text-primary-500" : ""}`}>
            {!data && !children && "-"}
            {data ? getStringWithUnit(`${data}`, unit) : children}
          </span>
        </span>
        {footer}
      </>
    </td>
  );
};

export default ComparisonCell;
