const CACHE_NAME = 'ctc-v4'
const PRECACHE = [
  '/',
  '/manifest.json',
  '/favicon.svg',
  '/icon-192.png',
  '/icon-512.png',
]

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE))
  )
  self.skipWaiting()
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return
  const url = new URL(e.request.url)
  if (url.origin !== location.origin) return

  // Hashed assets are immutable — cache-first
  if (url.pathname.startsWith('/assets/')) {
    e.respondWith(
      caches.match(e.request).then((cached) =>
        cached || fetch(e.request).then((res) => {
          if (res.ok) {
            const clone = res.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone))
          }
          return res
        })
      )
    )
    return
  }

  // Everything else: network-first with cache fallback
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        if (res.ok) {
          const clone = res.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone))
        }
        return res
      })
      .catch(() => caches.match(e.request).then((cached) => {
        if (cached) return cached
        if (e.request.mode === 'navigate') return caches.match('/')
        return new Response('Network error', { status: 503, statusText: 'Service Unavailable' })
      }))
  )
})
