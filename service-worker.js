const CACHE_NAME = "momentmap-v6";
const APP_SHELL = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",
    "./icon.svg"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(APP_SHELL))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys()
            .then(cacheNames => Promise.all(
                cacheNames
                    .filter(cacheName => cacheName !== CACHE_NAME)
                    .map(cacheName => caches.delete(cacheName))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", event => {
    if (event.request.method !== "GET") {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => cachedResponse || fetch(event.request)
                .then(networkResponse => {
                    if (networkResponse.ok && new URL(event.request.url).origin === self.location.origin) {
                        const responseToCache = networkResponse.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => cache.put(event.request, responseToCache));
                    }

                    return networkResponse;
                })
            )
    );
});
