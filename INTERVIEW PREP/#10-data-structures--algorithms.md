## 10. Data Structures & Algorithms

### 10.1 Find Pair with Given Sum

```javascript
function findPairWithSum(arr, target) {
  const seen = new Set();
  const pairs = [];

  for (const num of arr) {
    const complement = target - num;
    if (seen.has(complement)) {
      pairs.push([complement, num]);
    }
    seen.add(num);
  }

  return pairs;
}

// Example
const input = [1, 2, 3, 4, 5, 6, 7, 2, 9, 10];
console.log(findPairWithSum(input, 6)); // [[4,2], [3,3], [5,1], ...]
```

---

### 10.2 Max Sum of K Consecutive Elements

```javascript
function maxSumKConsecutive(arr, k) {
  if (arr.length < k) return null;

  // Calculate first window
  let windowSum = 0;
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }

  let maxSum = windowSum;

  // Slide window
  for (let i = k; i < arr.length; i++) {
    windowSum = windowSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}

// Example
const arr = [3, 4, 5, 8, 12, 0, 4, 2];
console.log(maxSumKConsecutive(arr, 3)); // 25 (5 + 8 + 12)
```

---

### 10.3 Sort Array of 0s and 1s

```javascript
function sort01(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    if (arr[left] === 0) {
      left++;
    } else if (arr[right] === 1) {
      right--;
    } else {
      // arr[left] = 1, arr[right] = 0, swap
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
  }

  return arr;
}

console.log(sort01([1, 0, 1, 0, 0, 1, 1, 0])); // [0, 0, 0, 0, 1, 1, 1, 1]
```

---

### 10.4 Validate BST

```javascript
function isValidBST(root, min = -Infinity, max = Infinity) {
  if (!root) return true;

  if (root.val <= min || root.val >= max) {
    return false;
  }

  return (
    isValidBST(root.left, min, root.val) &&
    isValidBST(root.right, root.val, max)
  );
}
```

---

### 10.5 Find Missing Number (1 appears twice)

```javascript
function findMissing(arr) {
  const n = arr.length;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = arr.reduce((a, b) => a + b, 0);

  // If one is missing and one is repeated:
  // actualSum = expectedSum - missing + repeated
  // We need more info or use XOR method

  // Using frequency count
  const freq = new Array(n + 1).fill(0);
  let repeated, missing;

  for (const num of arr) {
    freq[num]++;
  }

  for (let i = 1; i <= n; i++) {
    if (freq[i] === 0) missing = i;
    if (freq[i] === 2) repeated = i;
  }

  return { missing, repeated };
}
```

---

### 10.6 Count Binary Strings Without Consecutive 1s

```javascript
function countStrings(n) {
  if (n <= 0) return 0;

  // dp[i][0] = strings of length i ending with 0
  // dp[i][1] = strings of length i ending with 1
  let endsWith0 = 1;
  let endsWith1 = 1;

  for (let i = 2; i <= n; i++) {
    const new0 = endsWith0 + endsWith1; // 0 can follow both
    const new1 = endsWith0; // 1 can only follow 0
    endsWith0 = new0;
    endsWith1 = new1;
  }

  return endsWith0 + endsWith1;
}

console.log(countStrings(2)); // 3: "00", "01", "10"
console.log(countStrings(3)); // 5: "000", "001", "010", "100", "101"
```

---

### 10.7 Anagram Pairs Count

```javascript
function countAnagramPairs(str) {
  let count = 0;

  // Generate all substrings
  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j <= str.length; j++) {
      const sub1 = str.slice(i, j);

      // Find all anagrams after this position
      for (let k = i + 1; k < str.length; k++) {
        for (let l = k + 1; l <= str.length; l++) {
          const sub2 = str.slice(k, l);

          if (sub1.length === sub2.length && isAnagram(sub1, sub2)) {
            count++;
          }
        }
      }
    }
  }

  return count;
}

function isAnagram(s1, s2) {
  return s1.split("").sort().join("") === s2.split("").sort().join("");
}

console.log(countAnagramPairs("abba")); // 4: [a,a], [b,b], [ab,ba], [abb,bba]
```

---

### 10.8 Reverse String Without Changing Special Characters

```javascript
function reverseWithoutSpecial(str) {
  const arr = str.split("");
  let left = 0;
  let right = arr.length - 1;

  const isAlphanumeric = (c) => /[a-zA-Z0-9]/.test(c);

  while (left < right) {
    if (!isAlphanumeric(arr[left])) {
      left++;
    } else if (!isAlphanumeric(arr[right])) {
      right--;
    } else {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
  }

  return arr.join("");
}

console.log(reverseWithoutSpecial("a,b$c")); // 'c,b$a'
```

---
