const STATIC_CAHCE = "static3";
const DYNAMIC_CAHCE = "dynamic2";

var ASSETS = [
  "/",
  "/index.html",
  "/src/css/app.css",
  "/src/css/feed.css",
  "/src/js/app.js",
  "/src/js/feed.js",
  "/src/js/material.min.js",
  "/src/images/main-image.jpg",
  "https://fonts.googleapis.com/css?family=Roboto:400,700",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css",
];

self.addEventListener("install", (e) => {
  console.log("[Service worker] install", e);
  e.waitUntil(
    caches.open(STATIC_CAHCE).then((cache) => {
      cache.addAll(ASSETS);
    })
  );
});
self.addEventListener("activate", (e) => {
  console.log("[Service worker] activated", e);
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== STATIC_CAHCE && key !== DYNAMIC_CAHCE) {
            console.log("[Service Worker] Removing old cache", key);

            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      if (response) {
        return response;
      } else {
        return fetch(e.request).then((res) => {
          console.log("res", res);
          caches.open(DYNAMIC_CAHCE).then((cache) => {
            cache.put(e.request.url, res.clone());
            return res;
          });
        });
      }
    })
  );
});
