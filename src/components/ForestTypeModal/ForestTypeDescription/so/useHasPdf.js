import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const {
  REACT_APP_SO_PDF_ENDPOINT: soPdfEndpoint,
} = process.env;
const cache = {};

const useHasPdf = (
  forestType,
  url = `${soPdfEndpoint}`,
) => {
  const activeProfile = useSelector((state) => state.activeProfile);
  const [hasPdf, setHasPdf] = useState(false);
  useEffect(() => {
    let abortCtrl = new AbortController();
    if (forestType && activeProfile === 'so') {
      const pdfUrl = `${url}/${forestType.replace('*', 'stern')}.pdf`;
      if (cache[pdfUrl]) {
        setHasPdf(cache[pdfUrl]);
      } else {
        const fetchPDF = async () => {
          fetch(pdfUrl, { signal: abortCtrl.signal })
            .then((res) => {
              const response = res.ok === true && res.status === 200;
              setHasPdf(response);
              cache[pdfUrl] = response;
            })
            .catch((err) => {
              // eslint-disable-next-line no-console
              console.warn(`No PDF found for ${forestType}`, err);
              cache[pdfUrl] = false;
              setHasPdf(false);
            });
        };
        abortCtrl.abort();
        abortCtrl = new AbortController();
        fetchPDF();
      }
    }
    return () => {
      abortCtrl.abort();
    };
  }, [forestType, activeProfile, url]);
  return hasPdf;
};

export default useHasPdf;
