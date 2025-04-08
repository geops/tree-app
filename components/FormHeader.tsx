import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { Coordinate } from "ol/coordinate";
import { useTranslation } from "react-i18next";

import useStore from "@/store";
import useIsMobile from "@/utils/hooks/useIsMobile";

import MapPosition from "./icons/MapPosition";
import LanguageButtonGroup from "./LanguageSwitcher";
import ProfileSelect from "./ProfileSelect";
import ProjectionsModeSwitcher from "./ProjectionsModeSwitcher";
import { buttonStyles, outlinedStyles } from "./ui/Button";
import UserLocationDialog from "./UserLocationModal";

const formatCoordinates = (coordinates: Coordinate) =>
  coordinates
    .map((c) => c?.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1'"))
    .join(", ");

function FormHeader({ className }: { className?: string }) {
  const isMobile = useIsMobile();
  const projectionMode = useStore((state) => state.projectionMode);
  const mapLocation = useStore((state) => state.mapLocation);
  const opacity = projectionMode === "m" ? "opacity-100" : "opacity-40";
  const { t } = useTranslation();
  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-2 p-5 @container ${className}`}
    >
      <div
        className={`flex w-full items-center justify-between @[642px]:w-auto @[642px]:justify-start`}
      >
        <div className="flex">
          <div className={`w-14 rounded-l p-[10px] ${opacity}`}>
            <MapPosition />
          </div>
          <div className={`flex h-[42px] items-center px-4 ${opacity}`}>
            {mapLocation?.coordinate
              ? formatCoordinates(mapLocation?.coordinate)
              : t("map.hint")}
          </div>
        </div>
        <UserLocationDialog />
      </div>
      <div className="flex w-full justify-between gap-4 @[642px]:w-auto @[642px]:justify-normal">
        <Popover>
          {({ open }) => {
            return (
              <>
                <PopoverButton
                  className={`flex h-12 w-48 min-w-max items-center gap-2 rounded border border-primary-500 bg-white !px-3 ${buttonStyles} ${outlinedStyles}`}
                >
                  {t("app.languageAndProfile")}
                  <ChevronDownIcon
                    className={`h-6 w-6 transition ${open ? "rotate-180" : ""}`}
                  />
                </PopoverButton>
                <PopoverPanel
                  anchor={
                    isMobile ? { to: "bottom start" } : { to: "bottom end" }
                  }
                  className="z-50 mt-1 flex min-w-72 items-center justify-center rounded-lg backdrop-blur-sm"
                >
                  <div className="flex w-full flex-col gap-2 rounded-lg bg-[rgba(255,255,255,0.85)] p-3 shadow-3d">
                    <LanguageButtonGroup fullWidth />
                    <ProfileSelect />
                  </div>
                </PopoverPanel>
              </>
            );
          }}
        </Popover>
        <ProjectionsModeSwitcher />
      </div>
    </div>
  );
}

export default FormHeader;
