// Сеть в приоритете, кэш только как запасной вариант без связи. API никогда не кэшируется.
const C='heione-v17';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(['./','index.html','config.js','manifest.json','icon-192.png','icon-512.png'].map(u=>c.add(u).catch(()=>{})))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);
 if(r.method!=='GET'||u.origin!==location.origin||u.pathname.startsWith('/api/'))return;
 e.respondWith(fetch(r,{cache:"no-cache"}).then(x=>{if(x.ok){const c=x.clone();caches.open(C).then(k=>k.put(r,c))}return x}).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||(r.mode==='navigate'?caches.match('index.html'):Response.error()))))});
