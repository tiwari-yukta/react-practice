## 9. Security

### 9.1 XSS (Cross-Site Scripting)

```javascript
// Attack: Injecting malicious scripts
// Example: <script>stealCookies()</script>

// Prevention:
// 1. Escape user input
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, char => ({
    '&': '&',
    '<': '<',
    '>': '>',
    '"': '"',
    "'": '''
  }[char]));
}

// 2. Use textContent instead of innerHTML
element.textContent = userInput;

// 3. Content Security Policy header
// Content-Security-Policy: default-src 'self'

// 4. React automatically escapes JSX
<div>{userInput}</div> // Safe
<div dangerouslySetInnerHTML={{__html: userInput}} /> // Dangerous!
```

---

### 9.2 CSRF (Cross-Site Request Forgery)

```javascript
// Attack: Tricking user to make unwanted requests
// Example: Image tag that transfers money
// <img src="https://bank.com/transfer?to=attacker&amount=1000">

// Prevention:
// 1. CSRF Tokens
// Server generates token, client sends with requests
fetch("/api/transfer", {
  method: "POST",
  headers: {
    "X-CSRF-Token": csrfToken,
  },
  body: data,
});

// 2. SameSite Cookie attribute
// Set-Cookie: session=abc123; SameSite=Strict

// 3. Check Origin/Referer headers
```

---

### 9.3 CORS (Cross-Origin Resource Sharing)

```javascript
// Browser security: scripts can only fetch from same origin
// CORS allows controlled cross-origin requests

// Server response headers:
// Access-Control-Allow-Origin: https://example.com
// Access-Control-Allow-Methods: GET, POST, PUT
// Access-Control-Allow-Headers: Content-Type
// Access-Control-Allow-Credentials: true

// Preflight request (OPTIONS) for:
// - Methods other than GET/POST
// - Custom headers
// - Content-Type other than form-urlencoded, multipart, text/plain

// Mobile apps don't have CORS - it's a browser security feature
```

---

### 9.4 Secure Cookies

```javascript
// Secure cookie attributes
document.cookie = `session=abc123; 
  Secure;           // Only sent over HTTPS
  HttpOnly;         // Not accessible via JavaScript
  SameSite=Strict;  // Not sent with cross-site requests
  Path=/;
  Expires=...`;
```

---
