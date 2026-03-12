import { useCallback, useState } from "react";
import { Child } from "./Child";
import { usePrevious } from "../../../hooks/usePrevious";

export const Parent = () => {
  const [count, setCount] = useState(0);

  const onClickFunction = useCallback(() => {
    console.log("Child button clicked");
  }, []);

  const previousCount = usePrevious(count);

  return (
    <>
      <p>Count is: {count}</p>
      <p>Previous value is: {previousCount ?? "undefined"}</p>

      <button onClick={() => setCount((prev) => prev + 1)}>Increase</button>

      <Child message="hii" onClickMessage={onClickFunction} />
    </>
  );
};
