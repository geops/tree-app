import { Tab, TabGroup, TabList } from "@headlessui/react";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import useIsMobile from "@/utils/hooks/useIsMobile";

import Info from "./icons/InfoIcon";
import Location from "./icons/LocationIcon";
import MapIcon from "./icons/MapIcon";
import Tree from "./icons/TreeIcon";

interface TabProps {
  className?: string;
  icon: React.ReactNode;
  isMobile?: boolean;
  onClick?: () => void;
  pathname?: string;
  title?: React.ReactNode;
}

const tabs = [
  {
    icon: <MapIcon className="h-8 w-8 text-inherit" />,
    isMobile: true,
    pathname: "/",
  },
  {
    icon: <Location className="h-6 w-6 text-inherit" />,
    pathname: "/location",
    title: "app.location",
  },
  {
    icon: <Tree className="h-6 w-6 text-inherit" />,
    pathname: "/projection",
    title: "app.recommendation",
  },
  {
    icon: <Info className="h-6 w-6 scale-150 text-inherit" />,
    pathname: "/info",
    title: "app.info",
  },
  {
    className:
      "bg-primary-500 text-white focus:bg-primary-300 hover:!bg-primary-300",
    icon: <ArrowUpOnSquareIcon className="h-6 w-6 text-inherit" />,
    isMobile: true,
    onClick: () => {
      const copyInput = document.createElement("input");
      document.body.appendChild(copyInput);
      copyInput.value = window.location.href;
      copyInput.select();
      document.execCommand("copy");
      document.body.removeChild(copyInput);
      // toast(t('app.shared'), { type: toast.TYPE.SUCCESS });
    },
  },
];

function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  useEffect(() => {
    tabs.forEach((tab) => {
      if (tab.pathname) {
        router.prefetch(tab.pathname);
      }
    });
  }, [router]);

  return (
    <footer className="absolute bottom-0 right-0 z-40 h-16 w-full bg-[#eeeeee] shadow-[0_0_20px_#777] md:w-2/4 md:max-w-[800px]">
      <TabGroup>
        <TabList
          className={`grid w-full ${isMobile ? "grid-cols-5" : "grid-cols-3"}`}
        >
          {tabs.map((tab: TabProps, idx) => {
            const children = (
              <>
                {tab.icon}
                {!isMobile && t(tab.title)}
              </>
            );

            let active = pathname === tab.pathname;

            if (!isMobile) {
              active = pathname.split("/")[1]
                ? tab.pathname === pathname
                : tab.pathname === "/location";
            }

            return !isMobile && tab.isMobile ? null : (
              <Tab
                className={`${
                  active ? "bg-white" : ""
                } relative flex h-16 grow items-center justify-evenly text-primary-500 hover:bg-white ${tab.className}`}
                key={idx}
                onClick={() => {
                  if (tab.onClick) {
                    tab.onClick();
                    return;
                  }

                  if (tab.pathname) {
                    void router.push(
                      `${tab.pathname}${window.location.search}`,
                    );
                  }
                  return null;
                }}
              >
                {active ? (
                  <div className="absolute -top-2 left-1/2 h-0 w-0 -translate-x-1/2 transform border-b-8 border-l-[10px] border-r-[10px] border-transparent border-b-white"></div>
                ) : null}
                <span className="flex h-full w-full flex-col items-center justify-center">
                  {children}
                </span>
                {/* {tab.pathname ? (
                  // prefetch all pages with default prefetch=true
                  <Link
                    className="flex h-full w-full flex-col items-center justify-center"
                    href={tab.pathname}
                    onClick={() => handleNavigation(tab.pathname)}
                  >
                    {children}
                  </Link>
                ) : (
                  <span>{children}</span>
                )} */}
              </Tab>
            );
          })}
        </TabList>
      </TabGroup>
    </footer>
  );
}

export default NavBar;
