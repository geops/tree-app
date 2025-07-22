import { useEffect, useState } from "react";

import useStore from "@/store";

const cache: Record<string, boolean> = {};

/**
 * Custom hook to check if a PDF exists at the given URL.
 * It caches the result to avoid repeated network requests.
 *
 * @param {string | null} pdfUrl - The URL of the PDF to check.
 * @returns {boolean} - True if the PDF exists, false otherwise.
 */
const useHasPdf = (pdfUrl: null | string, profiles: string[] = []) => {
  const [hasPdf, setHasPdf] = useState(false);
  const activeProfile = useStore((state) => state.activeProfile);

  useEffect(() => {
    if (!pdfUrl || (profiles.length && !profiles.includes(activeProfile))) {
      setHasPdf(false);
      return;
    }
    let abortCtrl = new AbortController();
    if (pdfUrl in cache) {
      setHasPdf(cache[pdfUrl]);
    } else {
      const fetchPDF = () => {
        fetch(pdfUrl, { signal: abortCtrl.signal })
          .then((res) => {
            const response = res.ok === true && res.status === 200;
            setHasPdf(response);
            cache[pdfUrl] = response;
          })
          .catch((err: Error) => {
            if (err.name === "AbortError") {
              // Fetch was aborted, do nothing
              return;
            }
            // eslint-disable-next-line no-console
            console.warn(`No PDF found at ${pdfUrl}`, err);
            cache[pdfUrl] = false;
            setHasPdf(false);
          });
      };
      abortCtrl.abort();
      abortCtrl = new AbortController();
      fetchPDF();
    }
    return () => {
      abortCtrl.abort();
    };
  }, [pdfUrl, activeProfile, profiles]);
  return hasPdf;
};

export default useHasPdf;
