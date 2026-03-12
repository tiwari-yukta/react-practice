import { useState } from "react";

//ui should be derived from state not with the flags
export const SmartCounter = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setCount((prev) => prev - 1);
  };

  return (
    <>
      <div>Count is : {count}</div>
      <div>
        <button onClick={handleIncrement} disabled={count === 10}>
          Increase count
        </button>
        <button onClick={handleDecrement} disabled={count < 1}>
          Decrease count
        </button>
        <button onClick={() => setCount(0)}> Reset</button>
      </div>
      {count === 10 && <p style={{ color: "red" }}>Maximum reached</p>}
    </>
  );
};
