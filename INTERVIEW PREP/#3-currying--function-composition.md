## 3. Currying & Function Composition

### 3.1 Basic Currying

```javascript
// Convert sum(a, b, c) to sum(a)(b)(c)
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function (...nextArgs) {
      return curried.apply(this, [...args, ...nextArgs]);
    };
  };
}

// Usage
function sum(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum);
console.log(curriedSum(1)(2)(3)); // 6
console.log(curriedSum(1, 2)(3)); // 6
console.log(curriedSum(1)(2, 3)); // 6
console.log(curriedSum(1, 2, 3)); // 6
```

---

### 3.2 Infinite Currying with Running Sum

```javascript
// Sum(1) -> 1, Sum(2) -> 3, Sum(30) -> 33 (accumulates)
function Sum(n) {
  let total = n;

  function inner(num) {
    total += num;
    return inner;
  }

  inner.valueOf = function () {
    return total;
  };

  inner.toString = function () {
    return total;
  };

  return inner;
}

console.log(+Sum(1)); // 1
console.log(+Sum(1)(2)); // 3
console.log(+Sum(1)(2)(30)); // 33
```

---

### 3.3 Flexible Currying (Multiple Arguments)

```javascript
// add(1)(2)(3)() = 6
// add(1, 2)(3, 4)(5)() = 15
function add(...args) {
  let sum = args.reduce((a, b) => a + b, 0);

  function inner(...newArgs) {
    if (newArgs.length === 0) {
      return sum;
    }
    sum += newArgs.reduce((a, b) => a + b, 0);
    return inner;
  }

  return inner;
}

console.log(add(1)(2)(3)()); // 6
console.log(add(1, 2)(3, 4)(5)()); // 15
console.log(add(1, 2, 3)()); // 6
```

---

### 3.4 Currying with .end()

```javascript
// addition(6,1,2,3,4)(1)(23, 5,6, 7)....(1).end()
function addition(...args) {
  let sum = args.reduce((a, b) => a + b, 0);

  function inner(...newArgs) {
    sum += newArgs.reduce((a, b) => a + b, 0);
    return inner;
  }

  inner.end = function () {
    return sum;
  };

  return inner;
}

console.log(addition(6, 1, 2, 3, 4)(1)(23, 5, 6, 7)(1).end()); // 54
```

---

### 3.5 createBase Function

```javascript
function createBase(base) {
  return function (num) {
    return base + num;
  };
}

const addSix = createBase(6);
console.log(addSix(10)); // 16
console.log(addSix(21)); // 27

const addFive = createBase(5);
console.log(addFive(11)); // 16
```

---

### 3.6 Partial Application for sum

```javascript
// Create sum10(5) = 15, sum20(7) = 27
function sum(a, b) {
  return a + b;
}

function partial(fn, ...presetArgs) {
  return function (...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
}

const sum10 = partial(sum, 10);
const sum20 = partial(sum, 20);

console.log(sum10(5)); // 15
console.log(sum20(7)); // 27
```

---

### 3.7 Method Chaining (Math Builder)

```javascript
// math().add(3).sub(2).mul(5).sub(3).value()
function math(initial = 0) {
  let value = initial;

  return {
    add(n) {
      value += n;
      return this;
    },
    sub(n) {
      value -= n;
      return this;
    },
    mul(n) {
      value *= n;
      return this;
    },
    div(n) {
      value /= n;
      return this;
    },
    value() {
      return value;
    },
  };
}

console.log(math().add(3).sub(2).mul(5).sub(3).value()); // (0+3-2)*5-3 = 2
```

---
