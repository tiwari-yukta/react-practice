## 6. React & Hooks

### 6.1 Why Use React?

1. **Virtual DOM**: Efficient updates through diffing algorithm
2. **Component-Based**: Reusable, composable UI components
3. **Unidirectional Data Flow**: Predictable state management
4. **JSX**: Declarative syntax mixing JavaScript and HTML
5. **Rich Ecosystem**: Redux, React Router, etc.
6. **Large Community**: Extensive resources and libraries

---

### 6.2 Virtual DOM

```javascript
// React creates a lightweight copy of the actual DOM
// When state changes:
// 1. New Virtual DOM is created
// 2. Diffing: Compare new VDOM with previous VDOM
// 3. Reconciliation: Calculate minimal changes needed
// 4. Batch updates to real DOM

// Why two Virtual DOMs?
// - Comparing VDOM to VDOM is faster than VDOM to real DOM
// - Real DOM has many properties and is expensive to traverse
// - VDOM is a plain JavaScript object - much faster
```

---

### 6.3 componentDidMount & componentWillUnmount with Hooks

```javascript
import { useEffect } from "react";

function MyComponent() {
  // componentDidMount
  useEffect(() => {
    console.log("Component mounted");

    // Setup code here (subscriptions, event listeners, etc.)
    const subscription = someAPI.subscribe();

    // componentWillUnmount (cleanup function)
    return () => {
      console.log("Component will unmount");
      subscription.unsubscribe();
    };
  }, []); // Empty dependency array = run once on mount

  return <div>My Component</div>;
}
```

---

### 6.4 useEffect Patterns

```javascript
// Run on every render
useEffect(() => {
  console.log("Runs on every render");
});

// Run only on mount
useEffect(() => {
  console.log("Runs only on mount");
}, []);

// Run when dependency changes
useEffect(() => {
  console.log("Runs when count changes");
}, [count]);

// Cleanup function
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  return () => clearInterval(timer);
}, []);
```

---

### 6.5 Count 0 to 10 with setInterval

```javascript
import { useState, useEffect, useRef } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);

  useEffect(() => {
    countRef.current = count;
  }, [count]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (countRef.current < 10) {
        setCount((c) => c + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div>Count: {count}</div>;
}

// Alternative with useRef for interval
function CounterAlt() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= 10) return;

    const timer = setTimeout(() => {
      setCount(count + 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count]);

  return <div>Count: {count}</div>;
}
```

---

### 6.6 Why React Needs Keys for Arrays

```javascript
// Keys help React identify which items changed, added, or removed
// Without keys, React re-renders entire list

// BAD - using index as key (issues with reordering)
items.map((item, index) => <Item key={index} {...item} />);

// GOOD - using unique identifier
items.map((item) => <Item key={item.id} {...item} />);

// Why index is bad:
// - If items are reordered, React thinks different items
// - Can cause state/animation bugs
// - Only safe for static lists that never change
```

---

### 6.7 Hooks vs Class Components

```javascript
// Class Component
class Counter extends React.Component {
  state = { count: 0 };

  componentDidMount() {
    document.title = `Count: ${this.state.count}`;
  }

  componentDidUpdate() {
    document.title = `Count: ${this.state.count}`;
  }

  render() {
    return (
      <button onClick={() => this.setState({ count: this.state.count + 1 })}>
        {this.state.count}
      </button>
    );
  }
}

// Functional Component with Hooks
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

---

### 6.8 useLayoutEffect vs useEffect

```javascript
// useEffect - runs asynchronously after paint
useEffect(() => {
  // Good for: data fetching, subscriptions, logging
}, []);

// useLayoutEffect - runs synchronously after DOM mutations, before paint
useLayoutEffect(() => {
  // Good for: measuring DOM, preventing flicker
  // Blocks visual update until complete
}, []);

// Example: Measuring element
function Tooltip() {
  const ref = useRef();
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    // Measure before paint to avoid flicker
    setHeight(ref.current.offsetHeight);
  }, []);

  return <div ref={ref}>...</div>;
}
```

---

### 6.9 useState Implementation Concept

```javascript
// Simplified useState implementation concept
let state = [];
let stateIndex = 0;

function useState(initialValue) {
  const currentIndex = stateIndex;

  if (state[currentIndex] === undefined) {
    state[currentIndex] = initialValue;
  }

  const setState = (newValue) => {
    state[currentIndex] = newValue;
    render(); // Trigger re-render
  };

  stateIndex++;
  return [state[currentIndex], setState];
}

// This is why hooks must be called in same order every render
// And why they can't be in conditions or loops
```

---

### 6.10 Why Redux over Context API

| Redux                           | Context API                      |
| ------------------------------- | -------------------------------- |
| DevTools, time travel debugging | No dev tools                     |
| Middleware (thunk, saga)        | No middleware                    |
| Better for large apps           | Good for simple state            |
| Optimized re-renders            | Can cause unnecessary re-renders |
| Predictable state updates       | Direct state updates             |

```javascript
// Context re-renders all consumers when any value changes
// Redux only re-renders components that subscribe to changed state
```

---

### 6.11 React Fiber

React Fiber is a complete rewrite of React's core algorithm:

1. **Incremental Rendering**: Break rendering work into chunks
2. **Ability to Pause/Resume**: Prioritize work
3. **Concurrent Mode**: Multiple versions of UI in memory
4. **Better Error Handling**: Error boundaries

```javascript
// Fiber enables features like:
// - Suspense for data fetching
// - Concurrent rendering
// - Priority-based updates
// - Better handling of long render times
```

---

### 6.12 Synthetic Events

```javascript
// React wraps native events in SyntheticEvent for:
// 1. Cross-browser compatibility
// 2. Event pooling (performance)
// 3. Consistent API

function handleClick(e) {
  // e is a SyntheticEvent, not native event
  console.log(e.type); // 'click'
  console.log(e.nativeEvent); // Access native event if needed

  // In React 17+, events are attached to root, not document
  // This improves micro-frontend compatibility
}

// Event delegation: React uses single event listener at root
// Benefits: Memory efficient, works with dynamic elements
```

---
