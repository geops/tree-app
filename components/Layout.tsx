"use client";
import { usePathname } from "next/navigation";

import useStore from "@/store";
import useIsMobile from "@/utils/hooks/useIsMobile";
import useLangOverride from "@/utils/hooks/useLangOverride";

import ForestTypeModal from "./ForestTypeModal";
import NavBar from "./NavBar";
import WelcomeDialog from "./WelcomeDialog";

// import type { Metadata, Viewport } from "next";
import type { Viewport } from "next";

interface Props {
  children: React.ReactNode;
  map: React.ReactNode;
}

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

function Layout({ children, map }: Props) {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const treeClient = useStore((state) => state.treeClient);
  useLangOverride();

  return treeClient ? (
    <>
      <div className="relative block h-full grid-cols-[auto_min(800px,_50%)] md:grid">
        {map}
        <div
          className={`${isMobile && pathname === "/" ? "hidden" : ""} mb-16 max-h-[calc(100%-4rem)] overflow-y-auto`}
        >
          {children}
        </div>
      </div>
      <ForestTypeModal />
      <NavBar />
      <WelcomeDialog />
    </>
  ) : (
    <p>Loading...</p>
  );
}

export default Layout;
