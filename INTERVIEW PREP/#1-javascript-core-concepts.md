## 1. JavaScript Core Concepts

### 1.1 Hoisting

**What is Hoisting?**

Hoisting is JavaScript's default behavior of moving declarations to the top of their scope during the compilation phase.

```javascript
// What you write:
console.log(x); // undefined (not ReferenceError)
var x = 5;

// How JavaScript interprets it:
var x;
console.log(x); // undefined
x = 5;

// Function declarations are fully hoisted
sayHello(); // "Hello!"
function sayHello() {
  console.log("Hello!");
}

// Function expressions are NOT hoisted
sayBye(); // TypeError: sayBye is not a function
var sayBye = function() {
  console.log("Bye!");
};

// let and const are hoisted but in "Temporal Dead Zone"
console.log(a); // ReferenceError: Cannot access 'a' before initialization
let a = 10;
```

**Key Points:**

- `var` declarations are hoisted and initialized with `undefined`
- `let` and `const` are hoisted but NOT initialized (Temporal Dead Zone)
- Function declarations are fully hoisted (including body)
- Function expressions follow variable hoisting rules

---

### 1.2 let, var, and const

```javascript
// var - function scoped, can be redeclared
function varExample() {
  var x = 1;
  if (true) {
    var x = 2; // Same variable
    console.log(x); // 2
  }
  console.log(x); // 2
}

// let - block scoped, cannot be redeclared
function letExample() {
  let x = 1;
  if (true) {
    let x = 2; // Different variable
    console.log(x); // 2
  }
  console.log(x); // 1
}

// const - block scoped, cannot be reassigned
const PI = 3.14;
PI = 3.15; // TypeError: Assignment to constant variable

// But objects/arrays can be mutated
const arr = [1, 2, 3];
arr.push(4); // Works fine
arr = [5, 6]; // TypeError
```

---

### 1.3 Closures

**What is a Closure?**

A closure is a function that has access to variables from its outer (enclosing) scope, even after the outer function has returned.

```javascript
// Basic Closure Example
function outer() {
  let count = 0;
  return function inner() {
    count++;
    return count;
  };
}

const counter = outer();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

// Practical Example: Counter with methods
function createCounter() {
  let total = 0;
  return {
    add(a) {
      total += a;
    },
    retrieve() {
      return total;
    }
  };
}

const c = createCounter();
c.add(5);
c.add(9);
console.log(c.retrieve()); // 14

// Same example WITHOUT closure (using object)
const counterWithoutClosure = {
  total: 0,
  add(a) {
    this.total += a;
  },
  retrieve() {
    return this.total;
  }
};
```

**Classic Interview Problem: Loop with var**

```javascript
// Problem: prints 5 five times
for (var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i);
  }, 500);
}
// Output: 5, 5, 5, 5, 5

// Solution 1: Use IIFE
for (var i = 0; i < 5; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j);
    }, 500);
  })(i);
}
// Output: 0, 1, 2, 3, 4

// Solution 2: Use let
for (let i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i);
  }, 500);
}
// Output: 0, 1, 2, 3, 4
```

---

### 1.4 Event Loop

**How Event Loop Works:**

```
┌───────────────────────────┐
│         Call Stack        │
└───────────────────────────┘
              ↓
┌───────────────────────────┐
│     Microtask Queue       │ ← Promises, queueMicrotask
│   (Higher Priority)       │
└───────────────────────────┘
              ↓
┌───────────────────────────┐
│     Macrotask Queue       │ ← setTimeout, setInterval, I/O
│   (Lower Priority)        │
└───────────────────────────┘
```

```javascript
console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

Promise.resolve().then(() => {
  console.log('3');
});

console.log('4');

// Output: 1, 4, 3, 2
// Explanation:
// 1. '1' is logged (synchronous)
// 2. setTimeout callback goes to macrotask queue
// 3. Promise.then callback goes to microtask queue
// 4. '4' is logged (synchronous)
// 5. Microtask queue is processed: '3' is logged
// 6. Macrotask queue is processed: '2' is logged
```

**More Complex Example:**

```javascript
function abc() {
  setTimeout(() => {
    console.log("setTimeout");
  }, 0);
  Promise.resolve("promise resolved").then(res => console.log(res));
  console.log("hey");
}
abc();

// Output:
// hey
// promise resolved
// setTimeout
```

---

### 1.5 this Keyword

```javascript
// 1. Global context
console.log(this); // Window (browser) or global (Node)

// 2. Object method
const obj = {
  name: 'John',
  greet() {
    console.log(this.name); // 'John'
  }
};

// 3. Arrow functions - lexically bound
const obj2 = {
  name: 'Jane',
  greet: () => {
    console.log(this.name); // undefined (inherits from outer scope)
  }
};

// 4. Constructor function
function Person(name) {
  this.name = name;
}
const tom = new Person('Tom');
console.log(tom.name); // 'Tom'

// 5. Arrow function in prototype - PROBLEM!
Person.prototype.getName = () => {
  return this.name; // 'this' is NOT the instance!
};
console.log(tom.getName()); // undefined

// Correct way:
Person.prototype.getName = function() {
  return this.name;
};
console.log(tom.getName()); // 'Tom'
```

---

### 1.6 Scope Chaining

```javascript
function a() {
  var one = 'one';
  
  function b() {
    var one = 'two';
    c();
  }
  
  function c() {
    console.log(one); // Looks up scope chain
  }
  
  b();
}

a(); // Output: 'one'

// Explanation:
// c() is defined inside a(), so its scope chain is: c -> a -> global
// When c() looks for 'one', it finds it in a's scope (not b's)
// This is LEXICAL SCOPING - scope is determined by where function is DEFINED, not called
```

---

### 1.7 Prototype & Inheritance

```javascript
// Constructor Function
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log(`${this.name} makes a sound`);
};

// Inheritance
function Dog(name, breed) {
  Animal.call(this, name); // Call parent constructor
  this.breed = breed;
}

// Set up prototype chain
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  console.log(`${this.name} barks!`);
};

const dog = new Dog('Max', 'Labrador');
dog.speak(); // "Max makes a sound"
dog.bark();  // "Max barks!"

// ES6 Class Syntax
class Animal2 {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

class Dog2 extends Animal2 {
  constructor(name, breed) {
    super(name); // Call parent constructor
    this.breed = breed;
  }
  
  bark() {
    console.log(`${this.name} barks!`);
  }
}
```

**Object.create vs Object.assign:**

```javascript
var employee = { company: 'xyz' };

// Object.create - creates prototype chain
var emp1 = Object.create(employee);
delete emp1.company;
console.log(emp1.company); // 'xyz' (found in prototype)

// Object.assign - shallow copy
var emp2 = Object.assign({}, employee);
delete emp2.company;
console.log(emp2.company); // undefined (no prototype chain)
```

---

### 1.8 call, apply, bind

```javascript
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const person = { name: 'John' };

// call - invokes immediately, arguments passed individually
greet.call(person, 'Hello', '!'); // "Hello, John!"

// apply - invokes immediately, arguments passed as array
greet.apply(person, ['Hi', '?']); // "Hi, John?"

// bind - returns new function, can be invoked later
const boundGreet = greet.bind(person, 'Hey');
boundGreet('...'); // "Hey, John..."
```

---

### 1.9 Object.freeze & Object.seal

```javascript
// Object.freeze - prevents all modifications
const frozen = { a: 1 };
Object.freeze(frozen);
frozen.a = 2;     // Silently fails (or throws in strict mode)
frozen.b = 3;     // Cannot add new properties
delete frozen.a;  // Cannot delete
console.log(frozen); // { a: 1 }

// Object.seal - prevents adding/deleting, but allows modification
const sealed = { a: 1 };
Object.seal(sealed);
sealed.a = 2;     // Works!
sealed.b = 3;     // Cannot add
delete sealed.a;  // Cannot delete
console.log(sealed); // { a: 2 }

// Object.freeze polyfill
function customFreeze(obj) {
  Object.keys(obj).forEach(key => {
    Object.defineProperty(obj, key, {
      writable: false,
      configurable: false
    });
  });
  Object.preventExtensions(obj);
  return obj;
}
```

---

### 1.10 Type Error vs Reference Error

```javascript
// ReferenceError - variable doesn't exist
console.log(undeclaredVar); // ReferenceError: undeclaredVar is not defined

// TypeError - wrong type operation
const num = 42;
num(); // TypeError: num is not a function

const obj = null;
obj.property; // TypeError: Cannot read property 'property' of null

// Classic example
sayName();  // TypeError: sayName is not a function
sayAnotherName(); // Works! "World"

var sayName = () => console.log("Hello");
function sayAnotherName() { console.log("World"); }
```

---
