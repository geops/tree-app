import { useTranslation } from "react-i18next";

import useLocalStorage from "@/utils/hooks/useLocalStorage";

import Logo from "./icons/Logo";
import InfoAbout from "./infos/InfoAbout";
import LanguageSwitcher from "./LanguageSwitcher";
import ProfileSelect from "./ProfileSelect";
import Dialog from "./ui/Dialog";

function WelcomeDialog() {
  const { t } = useTranslation();
  const [lsValue, setLsValue] = useLocalStorage("tree.welcomeModal", "open");

  return (
    <Dialog
      body={
        <div className="w-full grid-cols-[1fr,5fr] gap-6 px-4 py-2 sm:grid">
          <Logo className="mx-auto mb-4 h-1/3 w-1/3 sm:h-auto sm:w-auto" />
          <div>
            <InfoAbout />
          </div>
        </div>
      }
      footer={
        <div className="flex items-center justify-between gap-6 px-4 py-2 sm:justify-end">
          <LanguageSwitcher />
          <ProfileSelect className="max-w-60" portal={false} />
        </div>
      }
      onClose={() => setLsValue("close")}
      open={lsValue === "open"}
      title={t("welcome.header")}
    />
  );
}

export default WelcomeDialog;
