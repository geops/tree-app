import {
  RadioGroup as HUIRadioGroup,
  Radio,
  RadioGroupProps,
} from "@headlessui/react";

import Label from "./Label";

interface RadioItemProps {
  className?: string;
  key?: number | string;
  label: string;
  value: string;
}

interface Props extends RadioGroupProps {
  items: RadioItemProps[];
}

function RadioGroup({ items, value, ...otherProps }: Props) {
  return (
    <HUIRadioGroup
      className="flex flex-col gap-2"
      value={value}
      {...otherProps}
    >
      {items.map((item) => {
        return (
          <Radio
            className="flex cursor-pointer items-center gap-2"
            data-checked={value === item.value}
            key={item.key ?? item.value}
            value={item.value}
          >
            {({ checked }) => {
              return (
                <>
                  <svg
                    fill="none"
                    height="22"
                    viewBox="0 0 22 22"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {checked ? (
                      <>
                        <path
                          clipRule="evenodd"
                          d="M11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0C4.92487 0 0 4.92487 0 11C0 17.0751 4.92487 22 11 22Z"
                          fill="#006268"
                          fillRule="evenodd"
                        />
                        <path
                          clipRule="evenodd"
                          d="M11 15C13.2091 15 15 13.2091 15 11C15 8.79086 13.2091 7 11 7C8.79086 7 7 8.79086 7 11C7 13.2091 8.79086 15 11 15Z"
                          fill="white"
                          fillRule="evenodd"
                        />
                      </>
                    ) : (
                      <>
                        <path
                          clipRule="evenodd"
                          d="M11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0C4.92487 0 0 4.92487 0 11C0 17.0751 4.92487 22 11 22Z"
                          fill="white"
                          fillRule="evenodd"
                        />
                        <path
                          d="M21.5 11C21.5 16.799 16.799 21.5 11 21.5C5.20101 21.5 0.5 16.799 0.5 11C0.5 5.20101 5.20101 0.5 11 0.5C16.799 0.5 21.5 5.20101 21.5 11Z"
                          stroke="#000D4D"
                          strokeOpacity="0.45"
                        />
                      </>
                    )}
                  </svg>
                  <Label className="cursor-pointer !text-base font-normal">
                    {checked ? <b>{item.label}</b> : item.label}
                  </Label>
                </>
              );
            }}
          </Radio>
        );
      })}
    </HUIRadioGroup>
  );
}

export default RadioGroup;
