"use client";
import { useTranslation } from "react-i18next";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs"; // we host this statically in public folder

import PdfViewer from "@/components/PdfViewer";
import { buttonStyles, primaryStyles } from "@/components/ui/Button";
import { useModalContext } from "@/components/ui/Modal";

const soPdfEndpoint = process.env.NEXT_PUBLIC_SO_PDF_ENDPOINT;

function ForestTypeDescription({ code }: { code: string }) {
  const name = code?.replace("*", "stern");
  const { t } = useTranslation();
  const { isOpen } = useModalContext();

  return (
    <div className="flex flex-col gap-2">
      <a
        className={`${buttonStyles} ${primaryStyles} self-end`}
        href={`${soPdfEndpoint}/${name}.pdf`}
        target="so-data"
      >
        {t("export.exportForestTypeDescription")}
      </a>
      {/* We react to is open to rerender the component */}
      {isOpen ? <PdfViewer href={`${soPdfEndpoint}/${name}.pdf`} /> : null}
    </div>
  );
}

export default ForestTypeDescription;
