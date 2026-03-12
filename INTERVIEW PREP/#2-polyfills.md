## 2. Polyfills

### 2.1 Function.prototype.bind Polyfill

```javascript
Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("Bind must be called on a function");
  }

  const fn = this;

  return function (...newArgs) {
    return fn.apply(context, [...args, ...newArgs]);
  };
};

// Usage
function greet(greeting, name) {
  console.log(`${greeting}, ${name}! I am ${this.title}`);
}

const obj = { title: "Mr." };
const boundGreet = greet.myBind(obj, "Hello");
boundGreet("John"); // "Hello, John! I am Mr."
```

---

### 2.2 Array.prototype.reduce Polyfill

```javascript
Array.prototype.myReduce = function (callback, initialValue) {
  if (this == null) {
    throw new TypeError("Array.prototype.reduce called on null or undefined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const arr = this;
  let accumulator;
  let startIndex;

  if (initialValue !== undefined) {
    accumulator = initialValue;
    startIndex = 0;
  } else {
    if (arr.length === 0) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
    accumulator = arr[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < arr.length; i++) {
    accumulator = callback(accumulator, arr[i], i, arr);
  }

  return accumulator;
};

// Usage
const sum = [1, 2, 3, 4].myReduce((acc, curr) => acc + curr, 0);
console.log(sum); // 10
```

---

### 2.3 Array.prototype.map Polyfill

```javascript
Array.prototype.myMap = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError('Cannot read property "map" of null or undefined');
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      // Handle sparse arrays
      result[i] = callback.call(thisArg, this[i], i, this);
    }
  }
  return result;
};

// Usage
const doubled = [1, 2, 3].myMap((x) => x * 2);
console.log(doubled); // [2, 4, 6]

// Map using reduce
Array.prototype.mapUsingReduce = function (callback) {
  return this.reduce((acc, curr, idx, arr) => {
    acc.push(callback(curr, idx, arr));
    return acc;
  }, []);
};
```

---

### 2.4 Promise.all Polyfill

```javascript
Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("Argument must be an array"));
    }

    const results = [];
    let completedCount = 0;

    if (promises.length === 0) {
      return resolve(results);
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value;
          completedCount++;

          if (completedCount === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
};

// Usage
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

Promise.myAll([p1, p2, p3]).then(console.log); // [1, 2, 3]
```

---

### 2.5 Promise.race Polyfill

```javascript
Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      Promise.resolve(promise).then(resolve).catch(reject);
    });
  });
};

// Implement API timeout using Promise.race
function fetchWithTimeout(url, timeout = 5000) {
  const fetchPromise = fetch(url);
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Request timeout")), timeout);
  });

  return Promise.race([fetchPromise, timeoutPromise]);
}
```

---

### 2.6 Promise Class Implementation

```javascript
class MyPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.handlers = [];

    const resolve = (value) => {
      if (this.state !== "pending") return;
      this.state = "fulfilled";
      this.value = value;
      this.handlers.forEach((h) => this.executeHandler(h));
    };

    const reject = (reason) => {
      if (this.state !== "pending") return;
      this.state = "rejected";
      this.value = reason;
      this.handlers.forEach((h) => this.executeHandler(h));
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  executeHandler(handler) {
    if (this.state === "pending") {
      this.handlers.push(handler);
      return;
    }

    const callback =
      this.state === "fulfilled" ? handler.onFulfilled : handler.onRejected;

    if (!callback) {
      if (this.state === "fulfilled") {
        handler.resolve(this.value);
      } else {
        handler.reject(this.value);
      }
      return;
    }

    queueMicrotask(() => {
      try {
        const result = callback(this.value);
        handler.resolve(result);
      } catch (error) {
        handler.reject(error);
      }
    });
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.executeHandler({
        onFulfilled,
        onRejected,
        resolve,
        reject,
      });
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  static resolve(value) {
    return new MyPromise((resolve) => resolve(value));
  }

  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }
}
```

---

### 2.7 Deep Clone Polyfill (with Cyclic Reference Handling)

```javascript
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // Handle cyclic references
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  // Handle Date
  if (obj instanceof Date) {
    return new Date(obj);
  }

  // Handle RegExp
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }

  // Handle Array
  if (Array.isArray(obj)) {
    const clonedArr = [];
    hash.set(obj, clonedArr);
    obj.forEach((item, index) => {
      clonedArr[index] = deepClone(item, hash);
    });
    return clonedArr;
  }

  // Handle Object
  const clonedObj = {};
  hash.set(obj, clonedObj);

  Object.keys(obj).forEach((key) => {
    clonedObj[key] = deepClone(obj[key], hash);
  });

  return clonedObj;
}

// Usage with cyclic reference
const obj = { a: 1 };
obj.self = obj; // Cyclic reference
const cloned = deepClone(obj);
console.log(cloned.self === cloned); // true (circular reference preserved)
```

---

### 2.8 Array.prototype.flat Polyfill

```javascript
Array.prototype.myFlat = function (depth = 1) {
  const result = [];

  const flatten = (arr, d) => {
    for (const item of arr) {
      if (Array.isArray(item) && d > 0) {
        flatten(item, d - 1);
      } else {
        result.push(item);
      }
    }
  };

  flatten(this, depth);
  return result;
};

// Usage
const nested = [1, [2, [3, [4]]]];
console.log(nested.myFlat(1)); // [1, 2, [3, [4]]]
console.log(nested.myFlat(2)); // [1, 2, 3, [4]]
console.log(nested.myFlat(Infinity)); // [1, 2, 3, 4]
```

---

### 2.9 \_.get (Lodash get) Polyfill

```javascript
function get(obj, path, defaultValue = undefined) {
  const keys = Array.isArray(path)
    ? path
    : path.replace(/\[(\d+)\]/g, ".$1").split(".");

  let result = obj;

  for (const key of keys) {
    if (result == null) {
      return defaultValue;
    }
    result = result[key];
  }

  return result === undefined ? defaultValue : result;
}

// Usage
const obj = {
  a: {
    b: {
      c: 42,
    },
  },
  arr: [1, 2, { d: 3 }],
};

console.log(get(obj, "a.b.c")); // 42
console.log(get(obj, "a.b.x", "default")); // 'default'
console.log(get(obj, "arr[2].d")); // 3
console.log(get(obj, ["arr", 2, "d"])); // 3
```

---

### 2.10 Debounce Polyfill

```javascript
function debounce(fn, delay) {
  let timeoutId;

  return function (...args) {
    const context = this;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

// Usage
const handleSearch = debounce((query) => {
  console.log("Searching for:", query);
}, 300);

// Only the last call within 300ms will execute
handleSearch("h");
handleSearch("he");
handleSearch("hel");
handleSearch("hell");
handleSearch("hello"); // Only this executes after 300ms
```

---

### 2.11 Throttle Polyfill

```javascript
function throttle(fn, limit) {
  let inThrottle = false;
  let lastArgs = null;

  return function (...args) {
    const context = this;

    if (!inThrottle) {
      fn.apply(context, args);
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
        if (lastArgs) {
          fn.apply(context, lastArgs);
          lastArgs = null;
        }
      }, limit);
    } else {
      lastArgs = args;
    }
  };
}

// Usage
const handleScroll = throttle(() => {
  console.log("Scroll event handled");
}, 1000);

window.addEventListener("scroll", handleScroll);
```

---

### 2.12 setInterval using setTimeout

```javascript
function mySetInterval(callback, delay) {
  let isRunning = true;

  function interval() {
    if (isRunning) {
      callback();
      setTimeout(interval, delay);
    }
  }

  setTimeout(interval, delay);

  return {
    clear() {
      isRunning = false;
    },
  };
}

// Usage
let count = 0;
const interval = mySetInterval(() => {
  console.log(++count);
  if (count >= 5) interval.clear();
}, 1000);
```

---
