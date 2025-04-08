import { useEffect, useState } from "react";

const networkEvents: (keyof WindowEventMap)[] = ["online", "offline"];

const useIsOnline = () => {
  const [isOnline, setIsOnline] = useState<boolean>(false);

  useEffect(() => {
    function update() {
      setIsOnline(navigator?.onLine);
    }
    networkEvents.forEach((event) => window.addEventListener(event, update));
    update();
    return () => {
      networkEvents.forEach((event) =>
        window.removeEventListener(event, update),
      );
    };
  }, []);

  return isOnline;
};

export default useIsOnline;
