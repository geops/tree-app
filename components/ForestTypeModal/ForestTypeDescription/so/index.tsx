"use client";
import { useEffect, useReducer, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs"; // we host this statically in public folder

import { buttonStyles, primaryStyles } from "@/components/ui/Button";

let rerenderTimout: ReturnType<typeof setTimeout>;

const soPdfEndpoint = process.env.NEXT_PUBLIC_SO_PDF_ENDPOINT;

function ForestTypeDescription({ code }: { code: string }) {
  const name = code?.replace("*", "stern");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [numPages, setNumPages] = useState<null | number>(null);
  const { t } = useTranslation();
  const [, forceUpdate] = useReducer((x: number) => x + 1, 0);

  const onDocumentLoadSuccess = ({
    numPages: nextNumPages,
  }: {
    numPages: number;
  }) => {
    setNumPages(nextNumPages);
  };

  useEffect(() => {
    // Force rerender PDF on resize, important for mobile devices
    const debouncedRerender = () => {
      clearTimeout(rerenderTimout);
      rerenderTimout = setTimeout(forceUpdate, 50);
    };
    const resizeObserver = new ResizeObserver(debouncedRerender);
    resizeObserver.observe(document.body);
    return () => {
      clearTimeout(rerenderTimout);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col gap-2" ref={containerRef}>
      <a
        className={`${buttonStyles} ${primaryStyles} self-end`}
        href={`${soPdfEndpoint}/${name}.pdf`}
        target="so-data"
      >
        {t("export.exportForestTypeDescription")}
      </a>
      {containerRef?.current ? (
        <Document
          file={`${soPdfEndpoint}/${name}.pdf`}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {Array.from(new Array(numPages), (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              width={(containerRef.current?.clientWidth ?? 500) - 10}
            />
          ))}
        </Document>
      ) : null}
    </div>
  );
}

export default ForestTypeDescription;
