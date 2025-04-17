import { useEffect, useState } from "react";

const networkEvents: (keyof WindowEventMap)[] = ["online", "offline"];

const useIsOnline = () => {
  const [isOnline, setIsOnline] = useState<boolean>(false);

  useEffect(() => {
    const abortController = new AbortController();
    function update() {
      setIsOnline(navigator?.onLine);
    }
    networkEvents.forEach((event) => {
      window.addEventListener(event, update, {
        signal: abortController.signal,
      });
    });
    update();
    return () => abortController.abort();
  }, []);

  return isOnline;
};

export default useIsOnline;
