import { useTranslation } from "react-i18next";

import useStore from "@/store";

import Dropdown from "./ui/Dropdown";

import type { TreeAppProfile } from "@geops/tree-lib/types";

import type { DropdownOption } from "./ui/Dropdown";

function ProfileSelect({
  className = "",
  portal = true,
}: {
  className?: string;
  portal?: boolean;
}) {
  const { t } = useTranslation();
  const profiles = useStore((state) => state.profiles);
  const activeProfile = useStore((state) => state.activeProfile);
  const setActiveProfile = useStore((state) => state.setActiveProfile);

  const options = profiles.map((profile: string) => {
    return {
      label: t(`profiles.${profile}`),
      value: profile,
    };
  });

  return (
    <Dropdown
      className={`w-full min-w-40 rounded-lg bg-white ${className}`}
      label={t("app.profile")}
      menuPlacement="auto"
      menuPortalTarget={portal ? document.body : undefined}
      onChange={(val) =>
        setActiveProfile((val as DropdownOption)?.value as TreeAppProfile)
      }
      options={options}
      value={options.find((opt) => opt.value === activeProfile)}
    />
  );
}

export default ProfileSelect;
