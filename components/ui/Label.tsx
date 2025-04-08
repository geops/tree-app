import { Label as HUILabel } from "@headlessui/react";

import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}
function Label({ children, className = "", ...otherProps }: Props) {
  return (
    <HUILabel
      className={`mb-1 mr-2 block text-sm font-bold text-primary-500 ${className}`}
      {...otherProps}
    >
      {children}
    </HUILabel>
  );
}

export default Label;
