## 8. Browser & Rendering

### 8.1 Browser Rendering Pipeline

```
1. Parse HTML → DOM Tree
2. Parse CSS → CSSOM Tree
3. Combine → Render Tree
4. Layout (Reflow) → Calculate positions
5. Paint → Fill pixels
6. Composite → Layer composition
```

**Reflow triggers:**

- Window resize
- Font changes
- Content changes
- Adding/removing elements
- CSS changes affecting layout

**Avoid reflow:**

- Batch DOM changes
- Use `transform` instead of `top/left`
- Use `opacity` for visibility changes

---

### 8.2 Cookies vs Local Storage vs Session Storage

| Feature       | Cookies                  | Local Storage | Session Storage |
| ------------- | ------------------------ | ------------- | --------------- |
| Size          | ~4KB                     | ~5-10MB       | ~5-10MB         |
| Expires       | Set expiry               | Never         | On tab close    |
| Server access | Yes (sent with requests) | No            | No              |
| Scope         | Domain + path            | Domain        | Tab             |
| Use case      | Auth, tracking           | Preferences   | Form data       |

```javascript
// Cookies
document.cookie =
  "username=John; expires=Thu, 18 Dec 2025 12:00:00 UTC; path=/";

// Local Storage
localStorage.setItem("key", "value");
localStorage.getItem("key");

// Session Storage
sessionStorage.setItem("key", "value");
sessionStorage.getItem("key");
```

---

### 8.3 Web Workers

```javascript
// main.js
const worker = new Worker("worker.js");
worker.postMessage({ type: "CALCULATE", data: [1, 2, 3] });
worker.onmessage = (e) => console.log("Result:", e.data);

// worker.js
self.onmessage = (e) => {
  const { type, data } = e.data;
  if (type === "CALCULATE") {
    const result = heavyCalculation(data);
    self.postMessage(result);
  }
};

// Web Worker: separate thread, no DOM access
// Service Worker: proxy between app and network, caching
```

---

### 8.4 WebSockets

```javascript
// WebSocket provides full-duplex communication
const socket = new WebSocket("wss://example.com/socket");

socket.onopen = () => {
  socket.send(JSON.stringify({ type: "subscribe", channel: "updates" }));
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log("Received:", data);
};

socket.onclose = () => console.log("Disconnected");
socket.onerror = (error) => console.error("Error:", error);

// HTTP vs WebSocket
// HTTP: Request-response, connection closes after each request
// WebSocket: Persistent connection, server can push data
```

---

### 8.5 HTTP/HTTPS

```javascript
// HTTP Methods
GET     // Retrieve data
POST    // Create resource
PUT     // Update entire resource
PATCH   // Partial update
DELETE  // Remove resource
OPTIONS // Preflight for CORS

// Status Codes
200 OK
201 Created
204 No Content
301 Moved Permanently
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
500 Internal Server Error

// HTTPS
// - Uses TLS/SSL encryption
// - Certificates from Certificate Authority
// - Protects data in transit
```

---
