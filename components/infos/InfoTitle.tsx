import { useTranslation } from "react-i18next";

function InfoTitle({ title }: { title: string }) {
  const { t } = useTranslation();

  return <div>{t(title)}</div>;
}

export default InfoTitle;
