import { Field, Switch as HUISwitch } from "@headlessui/react";

import Label from "./Label";

import type { ReactNode } from "react";

export interface SwitchProps {
  checked: boolean;
  className?: string;
  classNameContainer?: string;
  classNameLabel?: string;
  classNameSlider?: string;
  disabled?: boolean;
  label?: ReactNode;
  onChange: (checked: boolean) => void;
}

function Switch({
  checked,
  className = "",
  classNameContainer = "",
  classNameLabel = "",
  classNameSlider = "",
  disabled,
  label,
  onChange,
  ...otherProps
}: SwitchProps) {
  return (
    <Field className={`flex items-center ${classNameContainer}`}>
      <HUISwitch
        checked={checked}
        className={`group inline-flex h-6 min-w-12 items-center rounded-full border-2 border-primary-500 bg-gray-200 transition data-[checked]:bg-primary-500 data-[disabled]:opacity-50 ${className}`}
        disabled={disabled}
        onChange={onChange}
        {...otherProps}
      >
        <span
          className={`inline-block h-6 w-6 translate-x-[-2px] transform rounded-full border-2 border-primary-500 bg-white transition-transform data-[checked=true]:translate-x-[19px] ${classNameSlider}`}
          data-checked={checked}
        />
      </HUISwitch>
      {label && (
        <Label
          className={`ml-2 data-[checked=false]:text-gray-700 data-[checked=true]:text-primary-500 ${disabled ? "cursor-default opacity-50" : "cursor-pointer"} text-base ${classNameLabel}`}
          data-checked={checked}
          data-disabled={disabled}
        >
          {label}
        </Label>
      )}
    </Field>
  );
}

export default Switch;
