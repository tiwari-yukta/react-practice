import { useEffect, useRef, useState } from "react";

export const usePrevious = (value: number) => {
  const ref = useRef<number | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
