"use client";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";

import { buttonStyles, primaryStyles } from "@/components/ui/Button";
import { useModalContext } from "@/components/ui/Modal";

const soPdfEndpoint = process.env.NEXT_PUBLIC_SO_PDF_ENDPOINT;

const PdfViewer = dynamic(() => import("@/components/PdfViewer"), {
  ssr: false,
}); // Needs to be dynamic due to react-pdf pdf.worker.min.mjs

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
      {/* We react to isOpen to rerender the component */}
      {isOpen ? <PdfViewer href={`${soPdfEndpoint}/${name}.pdf`} /> : null}
    </div>
  );
}

export default ForestTypeDescription;
