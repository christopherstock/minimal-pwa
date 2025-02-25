
    console.log('sw.js!')

    // const cacheStorageKey = 'minimal-pwa-8'
    const cacheStorageKey = 'chrisy-key-1'

    const cacheList = [
        '/',
        "index.html",
        "test-image.jpg"
    ]

    self.addEventListener('install', function (e) {
        console.log('>> EVENT: install (the "cache" event)')
        e.waitUntil(
            caches.open(cacheStorageKey).then(function (cache) {
                console.log('Adding to Cache:', cacheList)
                return cache.addAll(cacheList)
            }).then(function () {
                console.log('Skip waiting!')
                return self.skipWaiting()
            })
        )
    })

    self.addEventListener('activate', function (e) {
        console.log('>> EVENT: activate')
        e.waitUntil(
            Promise.all(
                caches.keys().then(cacheNames => {
                    return cacheNames.map(name => {
                        if (name !== cacheStorageKey) {
                            return caches.delete(name)
                        }
                    })
                })
            ).then(() => {
                console.log('Clients claims.')
                return self.clients.claim()
            })
        )
    })

    self.addEventListener('fetch', function (e) {
        console.log('>> EVENT: fetch:', e.request.url)
        e.respondWith(
            caches.match(e.request).then(function (response) {
                if (response != null) {
                    console.log('Using cache for:', e.request.url)
                    return response
                }
                console.log('Fallback to fetch:', e.request.url)
                return fetch(e.request.url)
            })
        )
    })
