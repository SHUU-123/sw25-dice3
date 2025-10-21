const CACHE_NAME = 'sw25-dice-cache-v1';
const FILES = [
  './',
  './index.html',
  './manifest.json',
  './dice-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(FILES)));
  console.log('Service Worker installed');
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => k!==CACHE_NAME && caches.delete(k)))
    )
  );
  console.log('Service Worker activated');
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
