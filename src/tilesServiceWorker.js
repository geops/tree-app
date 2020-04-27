const CACHE_NAME = 'tree-app-tiles-v1';
const { REACT_APP_VECTOR_TILES_ENDPOINT: endpoint } = process.env;

// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return fetch(`${endpoint}/tiles.txt`)
        .then((response) => response.text())
        .then(async (response) => {
          const tiles = response.split(/\r?\n/);
          // eslint-disable-next-line no-plusplus
          for (let index = 0; index < tiles.length; index++) {
            const tileUrl = `${endpoint}/${tiles[index]}`;
            try {
              // eslint-disable-next-line no-await-in-loop
              const tileResponse = await fetch(tileUrl);
              cache.put(tileUrl, tileResponse);
            } catch (error) {
              // Some tiles do not exist.
            }
          }
        });
    }),
  );
});
