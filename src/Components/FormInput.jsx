import { useState } from "react";
import React from "react";
const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="formInput my-4">
      <label className="block text-lg mb-3">{label}</label>
      <input
        className="bg-white border px-4 py-2 rounded-2xl w-full"
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
        value={props.data}
      />
      <span className="err">{errorMessage}</span>
    </div>
  );
};

export default FormInput;
