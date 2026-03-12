## 5. CSS & HTML

### 5.1 Box Model

```
┌────────────────────────────────────────────┐
│                  MARGIN                    │
│  ┌──────────────────────────────────────┐  │
│  │              BORDER                  │  │
│  │  ┌────────────────────────────────┐  │  │
│  │  │           PADDING              │  │  │
│  │  │  ┌──────────────────────────┐  │  │  │
│  │  │  │        CONTENT           │  │  │  │
│  │  │  └──────────────────────────┘  │  │  │
│  │  └────────────────────────────────┘  │  │
│  └──────────────────────────────────────┘  │
└────────────────────────────────────────────┘
```

```css
/* content-box (default): width/height = content only */
.content-box {
  box-sizing: content-box;
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  /* Total width = 200 + 20*2 + 5*2 = 250px */
}

/* border-box: width/height includes padding and border */
.border-box {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  /* Total width = 200px (content shrinks to 150px) */
}
```

---

### 5.2 Centering Elements

```css
/* Method 1: Flexbox (recommended) */
.parent-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Method 2: Grid */
.parent-grid {
  display: grid;
  place-items: center;
}

/* Method 3: Position + Transform (without flexbox) */
.parent {
  position: relative;
  width: 500px;
  height: 500px;
}
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
}

/* Method 4: Margin auto (horizontal only for block) */
.child-horizontal {
  width: 100px;
  margin: 0 auto;
}

/* Method 5: Absolute with all sides 0 + margin auto */
.child-absolute-auto {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 100px;
  height: 100px;
}
```

---

### 5.3 Position Types

```css
/* static: default, normal document flow */
.static {
  position: static;
}

/* relative: positioned relative to its normal position */
.relative {
  position: relative;
  top: 10px;
  left: 20px;
}

/* absolute: positioned relative to nearest positioned ancestor */
.absolute {
  position: absolute;
  top: 0;
  right: 0;
}

/* fixed: positioned relative to viewport */
.fixed {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

/* sticky: toggles between relative and fixed */
.sticky {
  position: sticky;
  top: 0;
}
```

---

### 5.4 Float vs Absolute vs Fixed

| Property | Flow              | Reference Point     | Scrolls |
| -------- | ----------------- | ------------------- | ------- |
| float    | Partially in flow | N/A                 | Yes     |
| absolute | Out of flow       | Positioned ancestor | Yes     |
| fixed    | Out of flow       | Viewport            | No      |

---

### 5.5 Display: inline vs inline-block vs block

```css
/* inline: no width/height, flows with text */
span {
  display: inline;
}

/* inline-block: accepts width/height, flows with text */
.inline-block {
  display: inline-block;
  width: 100px;
  height: 100px;
}

/* block: full width, starts on new line */
div {
  display: block;
}
```

---

### 5.6 Horizontal Layout (A B C)

```html
<div class="parent">
  <div class="a common">A</div>
  <div class="b common">B</div>
  <div class="c common">C</div>
</div>
```

```css
/* Method 1: Flexbox */
.parent {
  display: flex;
}

/* Method 2: Inline-block */
.common {
  display: inline-block;
}

/* Method 3: Float */
.common {
  float: left;
}
.parent::after {
  content: "";
  display: table;
  clear: both;
}
```

---

### 5.7 Three Diagonal Boxes

```css
.parent {
  width: 300px;
  height: 300px;
  position: relative;
  background: #eee;
}

.box {
  width: 50px;
  height: 50px;
  position: absolute;
}

.box1 {
  top: 0;
  left: 0;
  background: red;
}

.box2 {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: green;
}

.box3 {
  bottom: 0;
  right: 0;
  background: blue;
}
```

---

### 5.8 CSS Modal

```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}
```

---
