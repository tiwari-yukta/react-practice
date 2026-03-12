import React from "react";

type ChildProps = {
  message: string;
  onClickMessage: () => void;
};

export const Child = React.memo(({ message, onClickMessage }: ChildProps) => {
  return (
    <>
      <p>{message}</p>
      <button onClick={onClickMessage}>Child Button</button>
    </>
  );
});
