// SW v5 - Network first, sem cache agressivo
const CACHE_NAME = 'escala-pm-v5';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  // Apagar todos os caches antigos
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Nunca interceptar Supabase
  if (e.request.url.includes('supabase.co')) return;
  // Sempre buscar da rede primeiro
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
