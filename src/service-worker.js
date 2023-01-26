/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';

const CACHE_NAME = 'tree-app-tiles-v9';
const OLD_CACHES = [
  'tree-app-tiles-v1',
  'tree-app-tiles-v2',
  'tree-app-tiles-v3',
  'tree-app-tiles-v4',
  'tree-app-tiles-v5',
  'tree-app-tiles-v6',
  'tree-app-tiles-v7',
  'tree-app-tiles-v8',
  'tree-app-tiles-v9',
];
const {
  REACT_APP_MATOMO_URL_BASE: matomoUrl,
  REACT_APP_VECTOR_TILES_ENDPOINT: endpoint,
} = process.env;

clientsClaim();

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA
// eslint-disable-next-line no-underscore-dangle
precacheAndRoute(self.__WB_MANIFEST);

// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell. Learn more at
// https://developers.google.com/web/fundamentals/architecture/app-shell
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }) => {
    // If this isn't a navigation, skip.
    if (request.mode !== 'navigate') {
      return false;
    } // If this is a URL that starts with /_, skip.

    if (url.pathname.startsWith('/_')) {
      return false;
    } // If this looks like a URL for a resource, because it contains // a file extension, skip.

    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    } // Return true to signal that we want to use the handler.

    return true;
  },
  createHandlerBoundToURL(`${process.env.PUBLIC_URL}/index.html`),
);

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

OLD_CACHES.forEach((OLD_CACHE) => caches.delete(OLD_CACHE));

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      fetch(`${endpoint}/tiles.txt`)
        .then((response) => response.text())
        .then(async (response) => {
          const tiles = response.split(/\r?\n/);
          // eslint-disable-next-line no-plusplus
          for (let index = 0; index < tiles.length; index++) {
            const tileUrl = `${endpoint}/${tiles[index]}`;
            // eslint-disable-next-line no-await-in-loop
            if (tiles[index] && !(await cache.match(tileUrl))) {
              try {
                // eslint-disable-next-line no-await-in-loop
                const tileResponse = await fetch(tileUrl);
                cache.put(tileUrl, tileResponse);
              } catch (error) {
                // Some tiles do not exist.
              }
            }
          }
          return true;
        }),
    ),
  );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', (event) => {
  if (event.request.url.startsWith(endpoint)) {
    event.respondWith(
      caches
        .match(event.request)
        .then((response) => response || fetch(event.request)),
    );
  }
});

self.importScripts(`${matomoUrl}offline-service-worker.js`);
// eslint-disable-next-line no-undef
matomoAnalytics.initialize();
