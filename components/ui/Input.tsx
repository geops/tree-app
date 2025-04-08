import { Field, Input as HUIInput } from "@headlessui/react";
import { InputProps as HUIInputProps } from "@headlessui/react";

import Label from "./Label";

import type { ReactNode } from "react";

interface InputProps extends Omit<HUIInputProps, "className"> {
  className?: string;
  label?: ReactNode;
}

function Input({ className, label, ...otherProps }: InputProps) {
  return label ? (
    <Field as="div">
      <Label>{label}</Label>
      <HUIInput
        className={`focus:border-teal block flex min-h-10 w-full min-w-36 flex-col items-center justify-between gap-2 rounded-lg border border-2 border-primary-500 px-2 hover:border-primary-300 focus:outline-none ${className}`}
        {...otherProps}
      />
    </Field>
  ) : (
    <HUIInput {...otherProps} />
  );
}

export default Input;
