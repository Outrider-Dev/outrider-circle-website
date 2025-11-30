self.addEventListener("install", event => {
    console.log("Service worker installed");
    event.waitUntil(
        caches.open("outrider-cache-v1").then(cache => {
            return cache.addAll([
                "./",
                "./index.html",
                "./styles.css",
                "./script.js",
                "./manifest.json",
                "./images/center_logo.png",
                "./images/icons/icon-192.png",
                "./images/icons/icon-512.png"

            ]);
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
