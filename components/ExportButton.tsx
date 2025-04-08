import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import Button from "./ui/Button";

function ExportButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick: () => Promise<void>;
}) {
  const { t } = useTranslation();
  const [exporting, setExporting] = useState(false);
  const label = useMemo(() => children ?? t("export.export"), [children, t]);
  const exportDocx = useCallback(() => {
    setExporting(true);
    // exportFunction needs to return a promise (e.g. Packer.toBlob() from docxjs)
    onClick()
      .then(() => {
        setExporting(false);
      })
      .catch((err) => {
        setExporting(false);
        console.error("Could not export document", err);
      });
  }, [onClick]);
  return (
    <Button
      className={`bg-primary-500 data-[disabled]:bg-primary-500 ${className}`}
      disabled={exporting}
      onClick={exportDocx}
    >
      {exporting ? t("export.exporting") : label}
    </Button>
  );
}

export default ExportButton;
