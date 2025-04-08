import { Button as HuiButton } from "@headlessui/react";

import type { ComponentPropsWithoutRef } from "react";
import type { ReactNode } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
  className?: string;
  variant?: "outlined" | "primary" | "secondary";
}

export const primaryStyles =
  "bg-primary-500 hover:bg-primary-200 text-white hover:text-white border-none";
export const secondaryStyles =
  "bg-white border border-gray-200 hover:bg-gray-200 text-black";
export const buttonStyles =
  "center w-fit rounded-lg px-6 py-3 font-bold data-[disabled]:bg-gray-500 data-[disabled]:opacity-60 pointer";
export const outlinedStyles =
  "bg-white hover:bg-white hover:text-primary-200 text-primary-500 border border-primary-500 hover:border-primary-200 border-solid border-2";

function getStyle(variant: string) {
  let style = primaryStyles;
  switch (variant) {
    case "outlined":
      style = outlinedStyles;
      break;
    case "primary":
      style = primaryStyles;
      break;
    case "secondary":
      style = secondaryStyles;
      break;
    default:
      style = primaryStyles;
  }
  return `${buttonStyles} ${style}`;
}

function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <HuiButton className={`${getStyle(variant)} ${className}`} {...props}>
      {children}
    </HuiButton>
  );
}

export default Button;
