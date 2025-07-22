"use client";
import { useTranslation } from "react-i18next";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs"; // we host this statically in public folder

import PdfViewer from "@/components/PdfViewer";
import { buttonStyles, primaryStyles } from "@/components/ui/Button";

const soPdfEndpoint = process.env.NEXT_PUBLIC_SO_PDF_ENDPOINT;

function ForestTypeDescription({ code }: { code: string }) {
  const name = code?.replace("*", "stern");
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-2">
      <a
        className={`${buttonStyles} ${primaryStyles} self-end`}
        href={`${soPdfEndpoint}/${name}.pdf`}
        target="so-data"
      >
        {t("export.exportForestTypeDescription")}
      </a>
      <PdfViewer href={`${soPdfEndpoint}/${name}.pdf`} />
    </div>
  );
}

export default ForestTypeDescription;
