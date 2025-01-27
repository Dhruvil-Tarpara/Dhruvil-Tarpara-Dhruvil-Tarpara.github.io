'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "eeb13760be49b5de21a0993397434da6",
"version.json": "6b3048d6cb189b16a8bd45d97a787f19",
"index.html": "8e7ffb4fd9aa8ef799bff00a2d62d141",
"/": "8e7ffb4fd9aa8ef799bff00a2d62d141",
"main.dart.js": "9f2ee8f2cb63795df7dfaee4c4bb1b98",
"flutter.js": "f393d3c16b631f36852323de8e583132",
"favicon.png": "d67411f71a733a4a9b6731c0cbaf3145",
"loading.svg": "c37477488ed3c9284c18aee0ac85df3c",
"icons/Icon-192.png": "85b153e679869740fcf27fa7e5f3fb45",
"icons/Icon-maskable-192.png": "85b153e679869740fcf27fa7e5f3fb45",
"icons/Icon-maskable-512.png": "996720fa128691a36817bf20b0ff4f31",
"icons/Icon-512.png": "996720fa128691a36817bf20b0ff4f31",
"manifest.json": "93d92f9efa36281e5ebbb171091543d0",
"assets/AssetManifest.json": "21a1e3165c5bc2a481e81c6eba085ac4",
"assets/NOTICES": "d99f78e4f50ba2efa765ae8ad30f45f7",
"assets/FontManifest.json": "043d06e7f8169d248cbd57db109635f8",
"assets/AssetManifest.bin.json": "f0538ad9106d46abd1e855f10e52eba8",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "4ac107f14fb9aa4a841bc6bb41ed9b04",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "d14f02650d87c1aeec6ad8687698f0b6",
"assets/fonts/MaterialIcons-Regular.otf": "0db35ae7a415370b89e807027510caf0",
"assets/assets/images/mobile-development.png": "0764a6445b112ed0d6291ace9d082344",
"assets/assets/images/database-storage.png": "60de7e603ac42f21e4c34e12064ce8c6",
"assets/assets/images/certificate_flutter_1.png": "b10a07d0e51f65cb0861e41210b093b7",
"assets/assets/images/certificate_flutter_3.png": "47c011750339ff6c8129ee539318f943",
"assets/assets/images/github.png": "d22ee3727a7216019c3848df6eafa024",
"assets/assets/images/certificate_flutter_2.png": "30732b719d1652ec4676501f9221d29d",
"assets/assets/images/linkedin.png": "fd0d5546fdbdc85c76c4372a0d51f1bc",
"assets/assets/images/certificate_flutter.png": "d0b0991268a33c8d61bc7533808732cb",
"assets/assets/images/profile.png": "d7d603bcb4c73c2e7a26ec3e0d3d168a",
"assets/assets/images/ui-design.png": "e70008b147b600235944621cd37e7f56",
"assets/assets/images/api.png": "2245b48ade412fa50d50d3c3b194bb26",
"assets/assets/images/software-developer.png": "badf38aa20fe75d9fae3bdc4ba5d5c60",
"assets/assets/images/stackoverflow.png": "e89afa3d48129ecc54023b8fbbf577cd",
"assets/assets/images/about.png": "198e34070de803b7ae67ad9eeef30353",
"assets/assets/Resume.pdf": "05b3cd29ce85748368afd9e50c135b8d",
"assets/assets/icons/github.svg": "f26802b8dbef596268dd36546a50a0b0",
"assets/assets/icons/stackoverflow.svg": "41534f42827d6ac06eb51767b26e6e09",
"assets/assets/icons/linkedin.svg": "8a211719155308491eda974f78de7762",
"assets/assets/fonts/ClashDisplay-Medium.otf": "4c49fc387f94a3022d00245e4590cc9f",
"assets/assets/fonts/ClashDisplay-Semibold.otf": "a09de8515fa0c37044d41c9dcd6a5226",
"assets/assets/fonts/ClashDisplay-Light.otf": "fc021ed6277e6514908990ef8ebeae0f",
"assets/assets/fonts/ClashDisplay-Variable.ttf": "2fcd723a1a012506da3928146b19364d",
"assets/assets/fonts/ClashDisplay-Bold.otf": "fa966a217f919e3436cf92a06ffa910b",
"assets/assets/fonts/ClashDisplay-Regular.otf": "8a81aaa5c6c6cba6e387259de997bfe9",
"assets/assets/fonts/ClashDisplay-Extralight.otf": "cd47c76ec25074d59dec41dd36ff4c5f",
"canvaskit/skwasm.js": "694fda5704053957c2594de355805228",
"canvaskit/skwasm.js.symbols": "262f4827a1317abb59d71d6c587a93e2",
"canvaskit/canvaskit.js.symbols": "48c83a2ce573d9692e8d970e288d75f7",
"canvaskit/skwasm.wasm": "9f0c0c02b82a910d12ce0543ec130e60",
"canvaskit/chromium/canvaskit.js.symbols": "a012ed99ccba193cf96bb2643003f6fc",
"canvaskit/chromium/canvaskit.js": "671c6b4f8fcc199dcc551c7bb125f239",
"canvaskit/chromium/canvaskit.wasm": "b1ac05b29c127d86df4bcfbf50dd902a",
"canvaskit/canvaskit.js": "66177750aff65a66cb07bb44b8c6422b",
"canvaskit/canvaskit.wasm": "1f237a213d7370cf95f443d896176460",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
