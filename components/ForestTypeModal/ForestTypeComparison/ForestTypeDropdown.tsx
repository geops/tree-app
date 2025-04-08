import { useTranslation } from "react-i18next";
import { Tooltip } from "react-tooltip";

import Dropdown, {
  DropdownOption,
  DropdownProps,
} from "@/components/ui/Dropdown";
import useStore from "@/store";
import useIsMobile from "@/utils/hooks/useIsMobile";

interface ForestTypeDropdownProps extends DropdownProps<DropdownOption> {
  options?: DropdownOption[];
}

function ForestTypeDropdown({
  options = [],
  ...props
}: ForestTypeDropdownProps) {
  const { t } = useTranslation();
  const setForestTypeComparison = useStore(
    (state) => state.setForestTypeComparison,
  );
  const forestTypeComparison = useStore((state) => state.forestTypeComparison);
  const isMobile = useIsMobile();

  return (
    <>
      <div data-tooltip-id="maximum-items-tooltip">
        <Dropdown
          component="combobox"
          isClearable
          isMulti
          label={t("forestTypeModal.compare")}
          menuIsOpen={forestTypeComparison.length < 4 ? undefined : false}
          onChange={(vals) => {
            setForestTypeComparison(
              ((vals ?? []) as DropdownOption[]).map((opt) => opt.value),
            );
          }}
          options={options}
          value={options.filter((opt) =>
            forestTypeComparison?.includes(opt.value),
          )}
          {...props}
        />
      </div>
      {forestTypeComparison.length >= 4 && (
        <Tooltip
          className="pointer-events-auto flex flex-col border-2 border-primary-300 !bg-white !text-black !opacity-100"
          content={t("forestTypeModal.maximumForestTypes")}
          delayHide={3000}
          globalCloseEvents={{
            clickOutsideAnchor: true,
            resize: true,
            scroll: true,
          }}
          id="maximum-items-tooltip"
          noArrow
          openEvents={
            isMobile
              ? {
                  click: true,
                }
              : undefined
          }
          place="bottom-end"
        />
      )}
    </>
  );
}

export default ForestTypeDropdown;
