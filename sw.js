// Service worker для ASCII SLAYER — робить гру встановлюваною (PWA) і
// дозволяє відкрити її офлайн з останньої відомої версії.
//
// НАВМИСНО дуже консервативний: чіпає ЛИШЕ GET-запити до ЦЬОГО ж origin
// (index.html, manifest.json, іконки) — жодного втручання в запити до
// Supabase (лідерборд/нікнейми) чи CDN (jsdelivr — supabase-js бібліотека,
// companion-репозиторій з музикою). Ці запити просто НЕ перехоплюються
// (early return без event.respondWith), тож жодна мережева функція гри
// не залежить від цього service worker'а і не може ним зламатись.
//
// Стратегія для самої гри — "мережа спочатку, кеш як запасний варіант":
// ми випускаємо оновлення дуже часто, тож онлайн-гравець має ЗАВЖДИ
// бачити найсвіжішу версію; кеш використовується лише коли мережі
// справді нема. Це означає, що версію кешу НЕ треба вручну синхронізувати
// з GAME_VERSION при кожному релізі — успішний онлайн-візит сам оновлює
// кеш. CACHE_NAME треба бампати лише якщо міняється сам ПІДХІД
// кешування (список файлів/стратегія), не контент.
//
// {cache:'no-store'} у fetch() нижче — КРИТИЧНО, знайдено живим тестом
// одразу після першого деплою: голий fetch(req) без цього сам собі "мережа
// спочатку" НЕ гарантує — браузер може мовчки повернути власний HTTP-кеш
// (звичайний, не Cache API) замість реального походу в мережу, якщо
// відповідь мала кешовні заголовки. Тоді "найсвіжіша версія онлайн" різко
// переставала бути правдою (реальний прояв: щойно задеплой index.html
// показував старий вміст, доки HTTP-кеш браузера не протух сам).
const CACHE_NAME = 'ascii-slayer-sw-v1';
const CORE_ASSETS = ['./', './index.html', './manifest.json'];

self.addEventListener('install', (e)=>{
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(CORE_ASSETS)).catch(()=>{}));
});

self.addEventListener('activate', (e)=>{
  e.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch', (e)=>{
  const req = e.request;
  if(req.method!=='GET') return;
  const url = new URL(req.url);
  if(url.origin !== self.location.origin) return; // Supabase/CDN — не наша справа

  e.respondWith(
    fetch(req, {cache:'no-store'}).then(res=>{
      const resClone = res.clone();
      caches.open(CACHE_NAME).then(cache=>cache.put(req, resClone)).catch(()=>{});
      return res;
    }).catch(()=> caches.match(req).then(cached=>cached || caches.match('./index.html')))
  );
});
