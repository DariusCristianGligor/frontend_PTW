import React, { Component } from "react";
const Input = ({
  name,
  label,
  value,
  onChange,
  error,
  type,
  disabled,
  placeHolder,
}) => {
  return (
    <div className={"form-group1"}>
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        id={name}
        name={name}
        error={error}
        type={type}
        disabled={disabled}
        className="form-control"
        placeholder={placeHolder}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};
export default Input;
