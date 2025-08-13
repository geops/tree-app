import { defaultCache } from "@serwist/next/worker";
import { Serwist } from "serwist";
import { createHandlerBoundToURL } from "workbox-precaching";
import { NavigationRoute, registerRoute } from "workbox-routing";

import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest. By default, this string is set to
// `"self.__SW_MANIFEST"`.
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const treePdfCacheString = "tree-data-v"; // IMPORTANT: This string should NEVER be changed, otherwise the old caches will not be identifyable anymore
const currentTreePdfVersion = 1; // Current Tree PDF version, needs to be increased every time new PDFs are deployed
const TREE_CACHE_NAME = `${treePdfCacheString}${currentTreePdfVersion}`; // Cache name for Tree profile data

// Create an array of 'tree-data-v[1 - currentVersion]' strings for the caches to be removed
const OLD_TREE_PDF_CACHES = Array.from(Array(currentTreePdfVersion).keys()).map(
  (version) => `${treePdfCacheString}${version}`,
);

const soPdfCacheString = "so-data-v"; // IMPORTANT: This string should NEVER be changed, otherwise the old caches will not be identifyable anymore
const currentSoPdfVersion = 3; // Current SO PDF version, needs to be increased every time new PDFs are deployed
const SO_CACHE_NAME = `${soPdfCacheString}${currentSoPdfVersion}`; // Cache name for SO profile data

// Create an array of 'so-data-v[1 - currentVersion]' strings for the caches to be removed
const OLD_SO_PDF_CACHES = Array.from(Array(currentSoPdfVersion).keys()).map(
  (version) => `${soPdfCacheString}${version}`,
);

const tileCacheString = "tree-app-tiles-v"; // IMPORTANT: This string should NEVER be changed, otherwise the old caches will not be identifyable anymore
const currentTileVersion = 24; // Current tile version, needs to be increased every time new tiles are deployed
const TILE_CACHE_NAME = `${tileCacheString}${currentTileVersion}`;

// Create an array of 'tree-app-tiles-v[1 - currentVersion]' strings for the caches to be removed
const OLD_TILE_CACHES = Array.from(Array(currentTileVersion).keys()).map(
  (version) => `${tileCacheString}${version}`,
);

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener("message", (event) => {
  if (event.data && (event.data as MessageEvent).type === "SKIP_WAITING") {
    void self.skipWaiting();
  }
});

[...OLD_SO_PDF_CACHES, ...OLD_TILE_CACHES, ...OLD_TREE_PDF_CACHES].forEach(
  (OLD_CACHE) => void caches.delete(OLD_CACHE),
);

self.addEventListener("install", (event) => {
  const soPdfEndpoint = process.env.NEXT_PUBLIC_SO_PDF_ENDPOINT;
  const vectorTilesEndpoint = process.env.NEXT_PUBLIC_VECTOR_TILES_ENDPOINT;
  const treePdfEndpoint = process.env.NEXT_PUBLIC_TREE_PDF_ENDPOINT;
  event.waitUntil(
    (async () => {
      await caches.open(TILE_CACHE_NAME).then((cache) =>
        fetch(`${vectorTilesEndpoint}/tiles.txt`)
          .then((response) => response.text())
          .then(async (response) => {
            const tiles = response.split(/\r?\n/);
            // eslint-disable-next-line no-plusplus
            for (const tile of tiles) {
              const tileUrl = `${vectorTilesEndpoint}/${tile}`;
              // eslint-disable-next-line no-await-in-loop
              if (tile && !(await cache.match(tileUrl))) {
                try {
                  // eslint-disable-next-line no-await-in-loop
                  const tileResponse = await fetch(tileUrl);
                  void cache.put(tileUrl, tileResponse);
                } catch (error) {
                  // Some tiles do not exist.
                }
              }
            }
            return true;
          }),
      );

      await caches.open(SO_CACHE_NAME).then((cache) =>
        fetch(`${soPdfEndpoint}/list.txt`)
          .then((response) => response.text())
          .then(async (response) => {
            const forestTypes = response.split(/\r?\n/);
            for (const forestType of forestTypes) {
              const pdfUrl = `${soPdfEndpoint}/${forestType}`;
              if (forestType && !(await cache.match(pdfUrl))) {
                try {
                  const pdfResponse = await fetch(pdfUrl);
                  void cache.put(pdfUrl, pdfResponse);
                } catch (error) {
                  // Some PDFs do not exist.
                }
              }
            }
            return true;
          }),
      );

      await caches.open(TREE_CACHE_NAME).then((cache) =>
        fetch(`${treePdfEndpoint}/list.txt`)
          .then((response) => response.text())
          .then(async (response) => {
            const treeTypes = response.split(/\r?\n/);
            for (const treeType of treeTypes) {
              const pdfUrl = `${treePdfEndpoint}/${treeType}`;
              if (treeType && !(await cache.match(pdfUrl))) {
                try {
                  const pdfResponse = await fetch(pdfUrl);
                  void cache.put(pdfUrl, pdfResponse);
                } catch (error) {
                  // Some PDFs do not exist.
                }
              }
            }
            return true;
          }),
      );
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const clients = await self.clients.matchAll({
        includeUncontrolled: true,
      });
      clients.forEach((client) => {
        client.postMessage({ type: "CACHE_READY" });
      });
    })(),
  );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener("fetch", (event) => {
  const cacheUrls = [
    process.env.NEXT_PUBLIC_VECTOR_TILES_ENDPOINT,
    process.env.NEXT_PUBLIC_SO_PDF_ENDPOINT,
  ];
  const shouldFetchFromCache = cacheUrls.some(
    (url) => url && event.request.url.startsWith(url),
  );
  if (shouldFetchFromCache) {
    event.respondWith(
      caches
        .match(event.request)
        .then((response) => response ?? fetch(event.request)),
    );
  }
});

// Necessary to make PWA work on iOS
const handler = createHandlerBoundToURL("/");

const navigationRoute = new NavigationRoute(handler, {
  denylist: [
    /^\/_next\//, // exclude Next.js internals
    /\/api\//, // exclude API routes
    /\/.*\.[^/]+$/, // exclude files with an extension (e.g., .png, .js)
  ],
});

registerRoute(navigationRoute);

const serwist = new Serwist({
  clientsClaim: true,
  navigationPreload: true,
  precacheEntries: [
    ...(self.__SW_MANIFEST ?? []),
    { revision: null, url: "/" },
  ],
  runtimeCaching: defaultCache,
  skipWaiting: true,
});

serwist.addEventListeners();
