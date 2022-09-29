import React from "react";
import { useField } from "formik";

type Props = {
  label: string;
  name: string;
  hideLabels?: boolean;
};

const Input = ({ label, name, hideLabels, ...props }: Props) => {
  const [field, meta] = useField(name);

  const valid = !(meta.touched && meta.error);

  return (
    <div className="input-wrapper">
      <label
        className={`input-label ${valid ? "" : "touched-label"}`}
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className={`input-field-main ${valid ? "" : "touched-input"}`}
        type="text"
        id={name}
        {...field}
        {...props}
      />
    </div>
  );
};

export default Input;
