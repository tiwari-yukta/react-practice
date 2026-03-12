## 11. System Design

### 11.1 Infinite Scroll Implementation

```javascript
function InfiniteScroll() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMore();
        }
      },
      { threshold: 1.0 },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  const loadMore = async () => {
    setLoading(true);
    const newItems = await fetchItems(page);
    setItems((prev) => [...prev, ...newItems]);
    setPage((prev) => prev + 1);
    setLoading(false);
  };

  return (
    <div>
      {items.map((item) => (
        <Item key={item.id} {...item} />
      ))}
      <div ref={loaderRef}>Loading...</div>
    </div>
  );
}
```

---

### 11.2 Virtualized List (for 1000s of items)

```javascript
function VirtualizedList({ items, itemHeight, containerHeight }) {
  const [scrollTop, setScrollTop] = useState(0);

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + 1,
    items.length,
  );

  const visibleItems = items.slice(startIndex, endIndex);
  const offsetY = startIndex * itemHeight;

  return (
    <div
      style={{ height: containerHeight, overflow: "auto" }}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: items.length * itemHeight, position: "relative" }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, i) => (
            <div key={startIndex + i} style={{ height: itemHeight }}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

### 11.3 Pub/Sub Pattern

```javascript
class PubSub {
  constructor() {
    this.subscribers = {};
  }

  subscribe(event, callback) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(callback);

    return () => {
      this.subscribers[event] = this.subscribers[event].filter(
        (cb) => cb !== callback,
      );
    };
  }

  publish(event, data) {
    if (!this.subscribers[event]) return;
    this.subscribers[event].forEach((callback) => callback(data));
  }
}

// Usage
const pubsub = new PubSub();
const unsubscribe = pubsub.subscribe("userLogin", (user) => {
  console.log("User logged in:", user);
});

pubsub.publish("userLogin", { name: "John" });
unsubscribe();
```

---

### 11.4 Redux Store Implementation

```javascript
function createStore(reducer, initialState) {
  let state = initialState;
  let listeners = [];

  return {
    getState() {
      return state;
    },

    dispatch(action) {
      state = reducer(state, action);
      listeners.forEach((listener) => listener());
      return action;
    },

    subscribe(listener) {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter((l) => l !== listener);
      };
    },
  };
}

// Usage
const reducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const store = createStore(reducer);
store.subscribe(() => console.log(store.getState()));
store.dispatch({ type: "INCREMENT" }); // { count: 1 }
```

---

### 11.5 LRU Cache

```javascript
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;

    // Move to end (most recently used)
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Remove least recently used (first item)
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
}
```

---

### 11.6 Card Deck Data Structure

```javascript
class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }

  toString() {
    return `${this.value} of ${this.suit}`;
  }
}

class Deck {
  constructor(numDecks = 1) {
    this.cards = [];
    this.suits = ["Spade", "Heart", "Diamond", "Club"];
    this.values = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];

    for (let i = 0; i < numDecks; i++) {
      for (const suit of this.suits) {
        for (const value of this.values) {
          this.cards.push(new Card(suit, value));
        }
      }
    }
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
    return this;
  }

  merge(otherDeck) {
    this.cards = [...this.cards, ...otherDeck.cards];
    return this;
  }

  getIndicesBySuit(suit) {
    return this.cards
      .map((card, index) => (card.suit === suit ? index : -1))
      .filter((index) => index !== -1);
  }
}

// Usage
const deck = new Deck(1); // 52 cards
deck.shuffle();
const spadeIndices = deck.getIndicesBySuit("Spade");
```

---
