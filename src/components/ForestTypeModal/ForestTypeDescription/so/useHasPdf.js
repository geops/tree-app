import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

let abortCtrl = new AbortController();

const useHasPdf = (forestType) => {
  const activeProfile = useSelector((state) => state.activeProfile);
  const [hasPdf, setHasPdf] = useState(false);
  useEffect(() => {
    if (forestType && activeProfile === 'so') {
      abortCtrl.abort()
      abortCtrl = new AbortController();
      const fetchPDF = async () => {
        const url = `https://so-data.tree-app.ch/forest-types/${forestType.replace(
          '*',
          'stern',
        )}.pdf`;
        fetch(url, { signal: abortCtrl.signal })
          .then((res) => setHasPdf(res.ok === true && res.status === 200))
          .catch((err) => {
            // eslint-disable-next-line no-console
            console.warn(`No PDF found for ${forestType}`, err);
            setHasPdf(false);
          });
      };
      fetchPDF();
    }
    return () => {
      abortCtrl.abort()
    };
  }, [forestType, activeProfile]);
  return hasPdf;
};

export default useHasPdf;
