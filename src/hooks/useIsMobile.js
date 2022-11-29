import { useState, useEffect } from 'react';

function useIsMobile() {
  const isClient = typeof window === 'object';
  const getMobile = () => (isClient ? window.innerWidth <= 768 : false);
  const [isMobile, setIsMobile] = useState(getMobile);

  useEffect(() => {
    if (!isClient) {
      return false;
    }
    const handleResize = () => setIsMobile(getMobile());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  return isMobile;
}

export default useIsMobile;
