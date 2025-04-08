import { Trans, useTranslation } from "react-i18next";

function InfoContact() {
  const { t } = useTranslation();
  const { href } = document.location;
  const body = encodeURIComponent(t("info.contactBody", { url: href }));
  return (
    <Trans i18nKey="info.contact">
      contact{" "}
      <a href={`mailto:info@tree-app.ch?body=${body}`}>info@tree-app.ch</a>
    </Trans>
  );
}

export default InfoContact;
