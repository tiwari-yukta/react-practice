## 12. Output-Based Questions

### 12.1

```javascript
var length = 10;
function fn() {
  console.log(this.length);
}
var obj = {
  length: 5,
  method: function (fn) {
    fn(); // 10 (global context)
    arguments[0](); // 2 (arguments is array-like, length is 2)
  },
};
obj.method(fn, 1);
// Output: 10, then 2
```

### 12.2

```javascript
var a = 1;
function b() {
  a = 10;
  return;
  function a() {} // Hoisted, creates local 'a'
}
b();
console.log(a); // 1
// The function declaration hoists and creates a local 'a',
// so a = 10 modifies local, not global
```

### 12.3

```javascript
console.log(new Array(5).map((_, i) => i + 1));
// Output: [empty × 5]
// new Array(5) creates sparse array with no values
// map skips empty slots

// Fix:
console.log(Array.from({ length: 5 }, (_, i) => i + 1)); // [1,2,3,4,5]
console.log([...Array(5)].map((_, i) => i + 1)); // [1,2,3,4,5]
```

### 12.4

```javascript
var name = "ruhi";
var a = {
  name: "rohan",
  printName: () => {
    console.log(this.name);
  },
};
a.printName(); // undefined (in strict mode) or '' (in browser)
// Arrow functions don't have their own 'this'
```

### 12.5

```javascript
0.1 + 0.2 !== 0.3; // true!
console.log(0.1 + 0.2); // 0.30000000000000004
// Floating point precision issue

// Fix:
Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON; // true
```

---
