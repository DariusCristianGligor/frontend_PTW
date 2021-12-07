import React, { Component } from "react";
import Input from "./input";
import Select from "./select";

class Form extends React.Component {
  state = {
    data: {},
    errors: {},
  };
  validate1 = () => {
    const options = {
      abortEarly: false,
    };
    const result = Joi.validate(this.state.data, this.schema, options);
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate1();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };
  renderButtonFaPlus(label) {
    return (
      <button
        className="addCategoryButton"
        disabled={this.validate1()}
        onClick={this.handleSubmit}
      >
        {label}
      </button>
    );
  }
  renderInput(name, label, type) {
    const { data, errors } = this.state;
    return (
      <div className="form-group">
        <Input
          name={name}
          label={label}
          value={data[name]}
          error={errors[name]}
          type={type}
          onChange={this.handleChange}
        />
      </div>
    );
  }
  renderSelect(name, label, options) {
    const { data } = this.state;
    return (
      <Select
        name={name}
        label={label}
        //error={errors[name]}
        options={options}
        //value={data[name]}
        onChange={this.handleChange}
      ></Select>
    );
  }
}

export default Form;
