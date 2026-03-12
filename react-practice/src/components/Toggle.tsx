import { useState } from "react";

export const Toggle = () => {
  const [value, setValue] = useState(false);

  const handleChange = () => {
    setValue((prev) => !prev);
  };

  return (
    <>
      <p>Status: {value ? "ON" : "OFF"}</p>
      <input type="checkbox" checked={value} onChange={handleChange} />
    </>
  );
};

// import { useState } from "react";

// type ToggleType = "ON" | "OFF";

// export const Toggle = () => {
//   const [value, setValue] = useState<ToggleType>("OFF");

//   const handleClick = () => {
//     setValue((prev) => (prev === "OFF" ? "ON" : "OFF"));
//   };

//   return (
//     <>
//       <p>Status: {value}</p>
//       <input type="checkbox" checked={value === "ON"} onChange={handleClick} />
//     </>
//   );
// };
