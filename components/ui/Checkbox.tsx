import { Field, Checkbox as HUICheckbox } from "@headlessui/react";

import Label from "./Label";

import type { ReactNode } from "react";

function Checkbox({
  checked,
  className = "",
  classNameCheckbox = "",
  colorBackground = "",
  colorBorder = "",
  colorCheckmark = "",
  key,
  label,
  onChange = () => null,
}: {
  checked: boolean;
  className?: string;
  classNameCheckbox?: string;
  colorBackground?: string;
  colorBorder?: string;
  colorCheckmark?: string;
  key?: number | string;
  label?: ReactNode;
  onChange: (checked: boolean) => void;
}) {
  return (
    <Field
      as="div"
      className={`flex w-auto cursor-pointer items-center gap-2 ${className}`}
      key={key}
    >
      <HUICheckbox
        checked={checked}
        className={`group ${classNameCheckbox}`}
        onChange={onChange}
      >
        {checked ? (
          <svg
            fill="none"
            height="22"
            viewBox="0 0 22 22"
            width="22"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 4C0 1.79086 1.79086 0 4 0H18C20.2091 0 22 1.79086 22 4V18C22 20.2091 20.2091 22 18 22H4C1.79086 22 0 20.2091 0 18V4Z"
              fill={colorBackground || "#006268"}
            />
            <path
              d="M5 12.6667L8.75 16L17 6"
              stroke={colorCheckmark || "white"}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              d="M0.5 4C0.5 2.067 2.067 0.5 4 0.5H18C19.933 0.5 21.5 2.067 21.5 4V18C21.5 19.933 19.933 21.5 18 21.5H4C2.067 21.5 0.5 19.933 0.5 18V4Z"
              stroke={colorBorder}
              strokeOpacity="0.45"
            />
          </svg>
        ) : (
          <svg
            fill="none"
            height="22"
            viewBox="0 0 22 22"
            width="22"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 4C0 1.79086 1.79086 0 4 0H18C20.2091 0 22 1.79086 22 4V18C22 20.2091 20.2091 22 18 22H4C1.79086 22 0 20.2091 0 18V4Z"
              fill={colorBackground || "white"}
            />
            <path
              d="M0.5 4C0.5 2.067 2.067 0.5 4 0.5H18C19.933 0.5 21.5 2.067 21.5 4V18C21.5 19.933 19.933 21.5 18 21.5H4C2.067 21.5 0.5 19.933 0.5 18V4Z"
              stroke={colorBorder || "#000D4D"}
              strokeOpacity="0.45"
            />
          </svg>
        )}
      </HUICheckbox>
      {label ? (
        <Label className="cursor-pointer !text-base font-normal">{label}</Label>
      ) : null}
    </Field>
  );
}

export default Checkbox;
