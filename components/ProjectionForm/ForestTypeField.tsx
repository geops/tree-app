import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import useStore from "@/store";

import Dropdown, {
  DROPDOWN_CLASSNAMES,
  getDropdownClassNames,
} from "../ui/Dropdown";
import InfoButton from "../ui/InfoButton";

import type { ForestType } from "@geops/tree-lib/types";

import type { TreeAppLanguage } from "@/i18n/i18next";

import type { DropdownOption, DropdownProps } from "../ui/Dropdown";

interface FtfProps extends DropdownProps<DropdownOption> {
  isTransition?: boolean;
}

function ForestTypeField({ isTransition = false, ...props }: FtfProps) {
  const treeClient = useStore((state) => state.treeClient);
  const location = useStore((state) => state.location);
  const mapLocation = useStore((state) => state.mapLocation);
  const setFormLocation = useStore((state) => state.setFormLocation);
  const setForestTypeDescription = useStore(
    (state) => state.setForestTypeDescription,
  );
  const { i18n, t } = useTranslation();
  const { options: ftOpts } = useStore((state) =>
    state.projectionMode === "m"
      ? state.projectionResult?.extreme
      : state.projectionResult.form,
  );

  const forestTypeOptions = useMemo(() => {
    return isTransition
      ? (ftOpts?.transitionForestType ?? ftOpts?.forestType)
      : ftOpts?.forestType;
  }, [ftOpts, isTransition]);

  const options = useMemo(() => {
    if (!forestTypeOptions?.length) return [];
    const forestTypes = treeClient.getTypes<ForestType>(
      "foresttype",
      ["code", i18n.language],
      forestTypeOptions?.length
        ? {
            code: `IN (${forestTypeOptions.map((ft) => `'${ft}'`).join(", ")})`,
          }
        : undefined,
    );
    return (
      forestTypes
        .filter((ft) => forestTypeOptions?.includes(ft.code))
        .map((ft) => ({
          label: (
            <div className="grid grid-cols-[min-content,20px,auto] items-center">
              <span className="text-center">{ft.code}</span>
              <span className="text-center">-</span>
              <span className="text-left">
                {ft[i18n.language as TreeAppLanguage]}
              </span>
            </div>
          ),
          value: ft.code,
        })) ?? []
    );
  }, [forestTypeOptions, treeClient, i18n.language]);

  if (!forestTypeOptions?.length) return null;

  return (
    <Dropdown
      classNames={{
        ...getDropdownClassNames(),
        control: (state) =>
          `${DROPDOWN_CLASSNAMES.control(state)} text-xl font-bold py-3 pl-3`,
        menu: (state) => `${DROPDOWN_CLASSNAMES.menu(state)} text-lg`,
      }}
      component="combobox"
      formatOptionLabel={(opt, { context }) => {
        return context === "menu" ? (
          <div className="grid grid-cols-[40px,auto] items-center">
            <InfoButton
              circle={false}
              className="h-8 w-8 rounded bg-primary-500 text-white hover:bg-primary-200 hover:text-white"
              onClick={() => setForestTypeDescription(opt.value)}
            />
            {opt.label}
          </div>
        ) : (
          opt.label
        );
      }}
      isClearable
      label={t("forestType.label")}
      onChange={(opt) => {
        setFormLocation(
          {
            forestType: (opt as DropdownOption)?.value ?? "",
          },
          mapLocation.forestType ? "f" : undefined,
        );
      }}
      options={options}
      value={
        options.find((opt) => {
          const compareVal = isTransition
            ? location.transitionForestType
            : location.forestType;
          return opt.value === compareVal;
        }) ?? null
      }
      {...props}
    />
  );
}

export default ForestTypeField;
