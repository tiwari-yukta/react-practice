import { useState } from "react";

export const PasswordChecker = () => {
  const [value, setValues] = useState("");
  const [isHide, setIsHide] = useState(true);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues(e.target.value);
  };
  const checkStrength = (password: string) => {
    if (password.length < 6) {
      return "Weak";
    } else if (/[0-9]/.test(password)) {
      if (/[^a-zA-Z0-9]/.test(password) && password?.length >= 8) {
        return "Strong";
      } else {
        return "Moderate";
      }
    }
  };

  const handleShow = () => {
    setIsHide((prev) => !prev);
  };
  return (
    <>
      <div>
        <label htmlFor="finput">Password</label>
        <input
          onChange={handleValueChange}
          type={isHide ? "password" : "text"}
          value={value}
          id="finout"
          placeholder="enter password"
        ></input>
        <button onClick={handleShow}>show password</button>
      </div>
      <p>{checkStrength(value)}</p>
    </>
  );
};
