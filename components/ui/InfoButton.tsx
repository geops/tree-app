import { Button } from "@headlessui/react";

import InfoIcon from "../icons/InfoIcon";

import type { ButtonProps } from "@headlessui/react";

interface InfoButtonProps extends ButtonProps {
  circle?: boolean;
  className?: string;
}
function InfoButton({
  circle = true,
  className,
  ...otherProps
}: InfoButtonProps) {
  return (
    <Button
      {...otherProps}
      className={`flex items-center justify-center text-primary-500 hover:text-primary-200 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}`}
    >
      <InfoIcon circle={circle} />
    </Button>
  );
}

export default InfoButton;
