"use client";
import { useEffect, useState } from "react";

// From https://stackoverflow.com/a/78523667
function SafeHydrate({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Forces a rerender
    setHydrated(true);
  }, []);

  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }

  return <div>{children}</div>;
}

export default SafeHydrate;
