## 4. Promises & Async Programming

### 4.1 Promise vs setTimeout Order

```javascript
console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

console.log("4");

// Output: 1, 4, 3, 2
// Promises (microtasks) execute before setTimeout (macrotasks)
```

---

### 4.2 Sequential Promise Execution with Parallel Fetch

```javascript
// Fetch n promises in parallel but render data sequentially
async function fetchAndRenderSequentially(urls) {
  // Start all fetches in parallel
  const promises = urls.map((url) => fetch(url).then((r) => r.json()));

  // Render in order as each completes
  for (const promise of promises) {
    const data = await promise;
    renderData(data);
  }
}

// Alternative implementation
function fetchParallelRenderSequential(urls) {
  const promises = urls.map((url) => fetch(url).then((r) => r.json()));

  return promises.reduce((chain, promise) => {
    return chain.then(() => promise).then((data) => renderData(data));
  }, Promise.resolve());
}
```

---

### 4.3 Promise Chaining

```javascript
// Promise chaining properly
fetchUser(1)
  .then((user) => fetchPosts(user.id))
  .then((posts) => fetchComments(posts[0].id))
  .then((comments) => console.log(comments))
  .catch((error) => console.error(error));

// Avoiding callback hell
// BAD:
fetchUser(1).then((user) => {
  fetchPosts(user.id).then((posts) => {
    fetchComments(posts[0].id).then((comments) => {
      console.log(comments);
    });
  });
});
```

---

### 4.4 Async/Await Error Handling

```javascript
async function fetchData() {
  try {
    const response = await fetch("/api/data");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
```

---
