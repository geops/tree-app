import { useEffect, useState } from "react";

import getIsSSR from "@/utils/getIsSSR";

function useIsMobile() {
  const isSsr = getIsSSR();
  const getMobile = () => (!isSsr ? window.innerWidth < 768 : false);
  const [isMobile, setIsMobile] = useState(getMobile());

  useEffect(() => {
    if (isSsr) {
      return;
    }
    const handleResize = () => setIsMobile(getMobile());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return isMobile;
}

export default useIsMobile;
