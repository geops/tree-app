import { useMemo } from "react";
import { createPortal } from "react-dom";
import { Trans, useTranslation } from "react-i18next";

import useLocalStorage from "@/utils/hooks/useLocalStorage";

import Button from "./ui/Button";
import Message from "./ui/Message";

const CookieBanner = () => {
  const { i18n } = useTranslation();
  const [lsValue, setLsValue] = useLocalStorage("tree.consentGiven", "false");

  const link = useMemo(
    () =>
      i18n.language === "fr"
        ? "https://www.wsl.ch/fr/a-propos-du-wsl/conditions-dutilisation.html"
        : "https://www.wsl.ch/de/ueber-die-wsl/rechtliches.html",
    [i18n.language],
  );

  return lsValue !== "true"
    ? createPortal(
        <Message className="absolute bottom-0 z-[9999] flex w-screen items-center justify-between rounded-none border-none bg-zinc-900 text-white">
          <div>
            <Trans i18nKey="cookieConsent">
              <a
                className="text-white underline hover:text-primary-200"
                href={link}
                rel="noopener noreferrer"
                target="_blank"
              >
                Datenschutzerklärung
              </a>
            </Trans>
          </div>
          <Button
            className="ml-2 border-2 border-white !bg-zinc-900 text-white hover:border-white hover:!bg-zinc-600 hover:bg-zinc-700 hover:text-white"
            data-cypress="cookie-consent-ok-btn"
            onClick={() => setLsValue("true")}
            variant="outlined"
          >
            OK
          </Button>
        </Message>,
        document.body,
      )
    : null;
};

export default CookieBanner;
