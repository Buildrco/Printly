const CACHE='mne-print-calc-v7';
const FILES=['./','./index.html','./manifest.webmanifest','./assets/mark-echo-logo.png','./assets/mark-echo-app-icon-192.png','./assets/mark-echo-app-icon.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil((async()=>{const openClients=await self.clients.matchAll({type:'window',includeUncontrolled:true});await self.clients.claim();await Promise.all(openClients.map(client=>client.navigate(client.url).catch(()=>null)));await caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))));})()));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return res}).catch(()=>caches.match('./index.html'))))});
