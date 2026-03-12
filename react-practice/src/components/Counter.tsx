import { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);

  const handleIncrease = () => {
    setCount((prev) => prev + 1);
  };
  const handleDecrease = () => {
    setCount((prev) => prev - 1);
  };
  const handleReset = () => {
    setCount(0);
  };

  return (
    <>
      <div>
        <p>Count is {count}</p>
        <button onClick={handleIncrease}>Increase</button>
        <button onClick={handleDecrease}>Decrease</button>
        <button onClick={handleReset}>Reset </button>
      </div>
    </>
  );
};
