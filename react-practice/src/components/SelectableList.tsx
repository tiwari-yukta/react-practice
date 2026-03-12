import { useState } from "react";

export const SelectableList = () => {
  const list = ["Apple", "Banana", "Grapes", "Orange", "Pineapple"];
  const [selected, setSelected] = useState<number[]>([]);

  const handleChange = (idx: number) => {
    setSelected((prev) => {
      if (prev.includes(idx)) {
        return prev.filter((item) => item !== idx);
      } else {
        return [...prev, idx];
      }
    });
  };

  return (
    <>
      <div>
        {list.map((item, idx) => (
          <div style={{ display: "flex", gap: "1rem" }}>
            <input
              type="checkbox"
              onChange={() => handleChange(idx)}
              checked={selected.includes(idx)}
            ></input>
            <p>{item}</p>
          </div>
        ))}
        <p>selected items</p>
        {selected?.map((item) => (
          <p>{list[item]}</p>
        ))}
      </div>
    </>
  );
};
