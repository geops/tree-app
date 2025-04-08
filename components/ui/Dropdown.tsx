import { Field } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import Select, { components } from "react-select";

import Label from "./Label";

import type { ReactNode } from "react";
import type {
  MultiValueGenericProps,
  Props as ReactSelectProps,
  SingleValueProps,
} from "react-select";
export interface DropdownOption {
  filterValue?: string;
  label: ReactNode;
  value: string;
}

interface MultiValueLabelProps
  extends Omit<MultiValueGenericProps<DropdownOption>, "data"> {
  data: DropdownOption;
}

function MultiValueLabel(props: MultiValueLabelProps) {
  const { data, selectProps } = props;
  const options = selectProps?.options as DropdownOption[];
  const label: React.ReactNode = options?.find(
    (opt) => data?.value === opt?.value,
  )?.label;

  return (
    <components.MultiValueLabel {...props}>{label}</components.MultiValueLabel>
  );
}

interface SingleValueLabelProps
  extends Omit<SingleValueProps<DropdownOption>, "data"> {
  data: DropdownOption;
}

function SingleValue(props: SingleValueLabelProps) {
  const { data, selectProps } = props;
  const options = selectProps?.options as DropdownOption[];
  const label: React.ReactNode = options?.find(
    (opt) => data?.value === opt?.value,
  )?.label;

  return <components.SingleValue {...props}>{label}</components.SingleValue>;
}

type DropdownAs = "combobox" | "select";

export type DropdownProps<T> = {
  component?: DropdownAs;
  label?: React.ReactNode | string;
} & ReactSelectProps<T>;

export const DROPDOWN_CLASSNAMES = {
  clearIndicator: () => "cursor-pointer",
  control: (state: {
    isDisabled: boolean;
    isFocused: boolean;
    menuIsOpen: boolean;
    selectProps: Record<"isSearchable", boolean>;
  }) => {
    const { isDisabled, isFocused, selectProps } = state;
    return `${isDisabled ? "opacity-50" : ""} border-2 rounded-lg hover:border-primary-200 p-2 ${selectProps?.isSearchable ? "!cursor-text" : "!cursor-pointer"} ${isFocused ? "border-primary-200" : "border-primary-500"}`;
  },
  dropdownIndicator: (props: {
    selectProps: Record<"menuIsOpen", boolean>;
  }) => {
    const { selectProps } = props;
    return `cursor-pointer ${selectProps.menuIsOpen ? "rotate-180" : ""}`;
  },
  indicatorContainer: () => "bg-red",
  input: () => "text-black",
  menu: ({ placement }: { placement: "bottom" | "top" }) => {
    const topClasses = "pb-2 mb-[-8px] rounded-b-none border-b-0";
    const bottomClasses = "pt-2 mt-[-8px] rounded-t-none border-t-0";
    return `border-2 border-primary-200 bg-white rounded-lg !z-[999] bg-white cursor-auto ${placement === "top" ? topClasses : bottomClasses} overflow-hidden`;
  },
  multiValue: () => "bg-gray-100 rounded items-center py-0.5 pl-2 pr-1 gap-1.5",
  option: (state: { isFocused: boolean; isSelected: boolean }) => {
    return `px-4 py-2 hover:bg-gray-100 ${state.isSelected ? "font-bold" : ""} ${state.isFocused ? "bg-gray-100" : ""}`;
  },
  placeholder: () => "text-gray-400",
  valueContainer: () => {
    return "gap-2 text-primary-500";
  },
};

export function getDropdownClassNames(className = "") {
  return {
    container: () => className,
    menuPortal: () => `!z-[999] ${className}`,
    ...DROPDOWN_CLASSNAMES,
  };
}

function DropdownCombobox({
  isMulti,
  onChange,
  options = [],
  value,
  ...props
}: ReactSelectProps<DropdownOption>) {
  return (
    <Select
      closeMenuOnSelect={!isMulti}
      components={{
        MultiValueLabel,
      }}
      filterOption={(opt, val) => {
        const regex = new RegExp(val, "i");
        return regex.test(opt.data?.filterValue ?? opt.value);
      }}
      isMulti={isMulti}
      onChange={onChange}
      options={options}
      tabSelectsValue={false}
      unstyled
      value={value}
      {...props}
    />
  );
}

function DropdownListbox({
  options = [],
  value,
  ...otherProps
}: ReactSelectProps<DropdownOption>) {
  return (
    <Select
      closeMenuOnSelect
      components={{
        SingleValue,
      }}
      isSearchable={false}
      options={options}
      unstyled
      value={value}
      {...otherProps}
    />
  );
}

function Dropdown({
  className = "",
  component = "select",
  isDisabled,
  isMulti,
  label = null,
  onChange,
  options = [],
  value,
  ...otherProps
}: DropdownProps<DropdownOption>) {
  const { t } = useTranslation();
  return (
    <Field>
      {label && (
        <Label className={isDisabled ? "opacity-50" : ""}>{label}</Label>
      )}
      {component === "combobox" ? (
        <DropdownCombobox
          classNames={getDropdownClassNames(className)}
          isDisabled={isDisabled}
          isMulti={isMulti}
          menuPortalTarget={document.body}
          onChange={onChange}
          options={options}
          placeholder={t("dropdown.placeholder")}
          value={value}
          {...otherProps}
        />
      ) : (
        <DropdownListbox
          classNames={getDropdownClassNames(className)}
          isDisabled={isDisabled}
          menuPortalTarget={document.body}
          onChange={onChange}
          options={options}
          placeholder={t("dropdown.placeholder")}
          value={value}
          {...otherProps}
        />
      )}
    </Field>
  );
}

export default Dropdown;
