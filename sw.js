const CACHE_NAME = 'lm-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './pwa_icons/icon-192.png',
  './pwa_icons/icon-512.png',
  './pwa_icons/maskable-512.png',
  './pwa_icons/apple-touch-icon-180.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k===CACHE_NAME?null:caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});