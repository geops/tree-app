import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const cache = {};

const useHasPdf = (forestType) => {
  const activeProfile = useSelector((state) => state.activeProfile);
  const [hasPdf, setHasPdf] = useState(false);
  useEffect(() => {
    let abortCtrl = new AbortController();
    if (forestType && activeProfile === 'so') {
      const url = `https://so-data.tree-app.ch/forest-types/${forestType.replace(
        '*',
        'stern',
      )}.pdf`;
      if (url in cache) {
        setHasPdf(cache[url]);
      } else {
        const fetchPDF = async () => {
          fetch(url, { signal: abortCtrl.signal })
            .then((res) => {
              const response = res.ok === true && res.status === 200;
              setHasPdf(response);
              cache[url] = response;
            })
            .catch((err) => {
              // eslint-disable-next-line no-console
              console.warn(`No PDF found for ${forestType}`, err);
              cache[url] = false;
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
  }, [forestType, activeProfile]);
  return hasPdf;
};

export default useHasPdf;
