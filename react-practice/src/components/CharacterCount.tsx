import { useState } from "react";

export const CharacterCount = () => {
  const [value, setValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
  };

  return (
    <>
      <div>
        <label htmlFor="finput">label</label>
        <input
          id="finput"
          onChange={handleChange}
          type="text"
          maxLength={20}
          value={value}
        />
        <p>Character counts is {value?.length}</p>
      </div>
    </>
  );
};
