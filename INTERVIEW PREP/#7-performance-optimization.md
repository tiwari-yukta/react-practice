## 7. Performance Optimization

### 7.1 Web Performance Checklist

1. **Code Splitting/Chunking**

```javascript
// Dynamic imports
const LazyComponent = React.lazy(() => import("./LazyComponent"));

// Webpack magic comments
import(/* webpackChunkName: "dashboard" */ "./Dashboard");
```

1. **Tree Shaking**

```javascript
// Use ES modules for tree shaking
import { map } from "lodash-es"; // Good
import _ from "lodash"; // Bad - imports everything
```

1. **Minification & Uglification**

```javascript
// Webpack production mode does this automatically
module.exports = { mode: "production" };
```

1. **Image Optimization**

```javascript
// Use modern formats
<picture>
  <source type="image/webp" srcset="image.webp">
  <source type="image/jpeg" srcset="image.jpg">
  <img src="image.jpg" alt="...">
</picture>

// Lazy loading
<img loading="lazy" src="image.jpg" alt="...">
```

1. **Caching**

```javascript
// Service Worker caching
// HTTP caching headers (Cache-Control, ETag)
// CDN caching
```

1. **Compression**

```javascript
// Brotli (better than gzip)
// Enable in server config
```

---

### 7.2 First Meaningful Paint vs First Contentful Paint

| Metric                             | Description               |
| ---------------------------------- | ------------------------- |
| **First Paint**                    | Any pixel rendered        |
| **First Contentful Paint (FCP)**   | First text/image rendered |
| **First Meaningful Paint (FMP)**   | Primary content visible   |
| **Time to Interactive (TTI)**      | Page fully interactive    |
| **Largest Contentful Paint (LCP)** | Largest content rendered  |

---

### 7.3 Memory Leak Detection

```javascript
// 1. Chrome DevTools Memory tab
// 2. Take heap snapshots before and after actions
// 3. Compare snapshots for retained objects

// Common causes:
// - Forgotten timers/intervals
// - Event listeners not removed
// - Closures holding references
// - Detached DOM nodes
// - Global variables

// Example leak:
function leak() {
  const element = document.getElementById("button");
  element.addEventListener("click", () => {
    // This closure holds reference to element
  });
  // Element removed but listener still references it
}

// Fix:
function noLeak() {
  const element = document.getElementById("button");
  const handler = () => {};
  element.addEventListener("click", handler);

  // Cleanup
  return () => element.removeEventListener("click", handler);
}
```

---

### 7.4 RequestIdleCallback & RequestAnimationFrame

```javascript
// requestAnimationFrame - for visual updates (60fps)
function animate() {
  updateAnimation();
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// requestIdleCallback - for non-urgent work
requestIdleCallback((deadline) => {
  while (deadline.timeRemaining() > 0) {
    doNonCriticalWork();
  }
});

// Use cases:
// RAF: animations, scrolling, DOM updates
// RIC: analytics, preloading, data syncing
```

---

### 7.5 Async vs Defer

```html
<!-- Normal: blocks parsing -->
<script src="script.js"></script>

<!-- Async: downloads parallel, executes immediately when ready -->
<script async src="script.js"></script>
<!-- Use for: independent scripts (analytics, ads) -->

<!-- Defer: downloads parallel, executes after parsing -->
<script defer src="script.js"></script>
<!-- Use for: scripts that need DOM ready, maintains order -->
```

```
Normal:    |--HTML--|        |--Script--|        |--HTML--|
Async:     |--HTML--|--Script--|--HTML--|
           |========Download=====|
Defer:     |--------HTML--------|--Script--|
           |=====Download======|
```

---

### 7.6 Service Workers & PWA

```javascript
// Register service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((reg) => console.log("SW registered"))
    .catch((err) => console.log("SW failed", err));
}

// sw.js - basic caching
const CACHE_NAME = "v1";
const urlsToCache = ["/", "/styles.css", "/app.js"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request)),
  );
});
```

---

### 7.7 Differential Serving

```html
<!-- Modern browsers get ES6+ -->
<script type="module" src="modern.js"></script>

<!-- Legacy browsers get transpiled code -->
<script nomodule src="legacy.js"></script>
```

---
