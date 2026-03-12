import { useEffect, useRef, useState } from "react";

type otpInputProp = {
  len: number;
};

export const OtpInput = ({ len }: otpInputProp) => {
  const arr = new Array(len).fill("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [value, setValues] = useState<string[]>(new Array(len).fill(""));

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    setValues(new Array(len).fill(""));
  }, [length]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
  ) => {
    const val = e.target?.value;

    if (!/^[0-9]?$/.test(val)) return;
    let newArr = [...value];
    newArr[idx] = val;
    setValues(newArr);

    if (val && idx < len - 1) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number,
  ) => {
    if (e?.key === "Backspace" && !value[idx] && idx > 0) {
      inputRefs?.current[idx - 1]?.focus();
    }
  };

  const handleReset = () => {
    setValues(new Array(len)?.fill(""));
    inputRefs.current[0]?.focus();
  };

  const isFullyTyped = value.every((digit) => digit !== "");
  const hasOneField = value.some((digit) => digit !== "");

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        {arr.map((item, idx) => (
          <div key={idx}>
            <input
              type="text"
              maxLength={1}
              onChange={(e) => handleChange(e, idx)}
              value={value[idx]}
              ref={(element) => (inputRefs.current[idx] = element)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              style={{
                width: "40px",
                height: "45px",
                textAlign: "center",
                fontSize: "18px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
            />
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        <button onClick={handleReset} disabled={!hasOneField}>
          Reset
        </button>
        <button disabled={!isFullyTyped}>Submit</button>
      </div>
    </>
  );
};
