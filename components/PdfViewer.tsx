"use client";
import { useEffect, useReducer, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Document, Page, pdfjs } from "react-pdf";

import Spinner from "./icons/Spinner";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs"; // we host this statically in public folder

let rerenderTimout: ReturnType<typeof setTimeout>;

function Loading() {
  const { t } = useTranslation();
  return (
    <span className="mx-auto my-4 flex items-center justify-center gap-2 text-lg">
      <Spinner className="h-5 w-5" />
      {t("userLocations.loading")}
    </span>
  );
}

function PdfViewer({ href }: { href: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [numPages, setNumPages] = useState<null | number>(null);
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
    <div ref={containerRef}>
      {containerRef?.current ? (
        <Document
          file={href}
          loading={<Loading />}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {Array.from(new Array(numPages), (_, index) => (
            <Page
              key={`page_${index + 1}`}
              loading={<Loading />}
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

export default PdfViewer;
