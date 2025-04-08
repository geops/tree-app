import dynamic from "next/dynamic";
import Head from "next/head";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";

import CookieBanner from "@/components/CookieBanner";
import Layout from "@/components/Layout";
import SafeHydrate from "@/components/SafeHydrate";
import TreeClientProvider from "@/components/TreeClientProvider";
import TreeToast from "@/components/TreeToast";
import useIsMobile from "@/utils/hooks/useIsMobile";

import "../i18n/index";

import "tailwindcss/tailwind.css";
import "./global.css";

import type { AppProps } from "next/app";

const Map = dynamic(() => import("../components/Map"), {
  loading: ({ error, isLoading }) => {
    if (error) {
      console.error(error);
      return <p>Error loading map...</p>;
    }
    if (isLoading) return <p>Loading...</p>;
    return null;
  },
  ssr: false,
});

interface SWMessage {
  type: "CACHE_READY";
}

const useServiceWorker = () => {
  const { t } = useTranslation();
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      void navigator.serviceWorker.ready.then((registration) => {
        if (registration.waiting) {
          console.log("A new service worker is waiting to activate.");
        }
        registration.addEventListener("updatefound", () => {
          if (registration.installing) {
            registration.installing.addEventListener("statechange", () => {
              if (registration.waiting) {
                toast.custom(
                  (tst) => (
                    <TreeToast
                      duration={40}
                      id="update"
                      instance={tst}
                      message={t("offline.update")}
                      onClick={() => window.location.reload()}
                    />
                  ),
                  {
                    duration: Infinity,
                    id: "update",
                  },
                );
              }
            });
          }
        });
      });

      const messageHandler = (event: MessageEvent<SWMessage>) => {
        if (event.data?.type === "CACHE_READY") {
          toast.custom(
            (tst) => (
              <TreeToast
                id="success"
                instance={tst}
                message={t("offline.success")}
              />
            ),
            {
              duration: Infinity,
              id: "success",
            },
          );
        }
      };

      navigator.serviceWorker.addEventListener("message", messageHandler);
      return () => {
        navigator.serviceWorker.removeEventListener("message", messageHandler);
      };
    }
  }, [t]);
};

function TreeApp({ Component, pageProps }: AppProps) {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  useServiceWorker();

  return (
    <SafeHydrate>
      <Head>
        <meta content="Tree-App" name="Tree-App" />
        <title>Tree-App</title>
        <meta content="yes" name="apple-mobile-web-app-capable" />
        <meta content="default" name="apple-mobile-web-app-status-bar-style" />
        <meta content="Tree-App" name="apple-mobile-web-app-title" />
        <meta
          content="Spatial PWA for getting tree recommendations"
          name="description"
        />
        <meta content="telephone=no" name="format-detection" />
        <meta content="yes" name="mobile-web-app-capable" />
        <meta content="/icons/browserconfig.xml" name="msapplication-config" />
        <meta content="#2B5797" name="msapplication-TileColor" />
        <meta content="no" name="msapplication-tap-highlight" />
        <meta content="#000000" name="theme-color" />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato&display=swap"
          rel="stylesheet"
        />
        <link href="/manifest.json" rel="manifest" />
        <link href="/favicon.ico" rel="shortcut icon" />
        <link
          href="/images/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <link
          href="/images/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="/images/android-192x192.png"
          rel="icon"
          sizes="192x192"
          type="image/png"
        />
        <link
          href="/images/apple-touch-icon-180x180.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <title>Tree-App</title>
      </Head>
      <CookieBanner />
      <div className="h-screen overflow-hidden">
        <Toaster position="top-right" />
        <TreeClientProvider>
          <Layout
            map={
              <Map
                className={`${isMobile && pathname !== "/" ? "hidden" : ""}`}
              />
            }
          >
            <Component {...pageProps} />
          </Layout>
        </TreeClientProvider>
      </div>
    </SafeHydrate>
  );
}

export default TreeApp;
