import { Button } from "@headlessui/react";
import { Field } from "@headlessui/react";
import { ReactNode } from "react";

import Label from "./Label";

export interface ButtonGroupItem {
  active?: boolean;
  className?: string;
  disabled?: boolean;
  label: ReactNode | string;
  onClick: () => void;
  title?: string;
}

type ButtonGroupProps =
  | {
      children: React.ReactNode;
      className?: string;
      items?: ButtonGroupItem[];
      label?: ReactNode;
    } // When `children` is provided, `items` is not allowed
  | {
      children?: never;
      className?: string;
      items: ButtonGroupItem[];
      label?: ReactNode;
    }; // When `items` is provided, `children` is not allowed

const disabledClasses =
  "data-[disabled]:border-gray-500 data-[disabled]:bg-gray-500 data-[disabled]:opacity-60";

const activeClasses = " bg-primary-500 hover:bg-primary-200 text-white";

const notActiveClasses = " bg-white text-primary-500 hover:text-primary-200";
function ButtonGroup({
  children,
  className = "",
  items,
  label,
}: ButtonGroupProps) {
  return (
    <Field className="h-auto">
      {label && <Label>{label}</Label>}
      <div className={`flex ${className}`}>
        {items?.map((item, index) => (
          <Button
            className={`rounded-0 f h-inherit w-full border-2 border-primary-500 p-2.5 text-sm font-bold first:rounded-l-lg last:rounded-r-lg hover:border-primary-200 sm:w-auto sm:text-base ${item.active ? activeClasses : notActiveClasses} ${disabledClasses} ${item.className}`}
            disabled={item.disabled}
            key={index}
            onClick={item.onClick}
            title={item.title}
          >
            {item.label}
          </Button>
        )) ?? children}
      </div>
    </Field>
  );
}

export default ButtonGroup;
