self.addEventListener("install", (e) => {
  console.log("[Service worker] install", e);
});
self.addEventListener("activate", (e) => {
  console.log("[Service worker] activated", e);
  return self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  console.log("[Service worker] fetching", e);
  e.respondWith(fetch(e.request));
});
