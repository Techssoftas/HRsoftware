import React from "react";
import { Dropdown } from "primereact/dropdown";











const CommonSelect = ({
  value,
  options,
  placeholder = "Select",
  onChange,
  className = "",
  disabled = false,
  filter = true
}) => {
 
  return (
    <Dropdown
      value={value}
      options={Array.isArray(options) ? options : []}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      disabled={disabled}
      appendTo={document.body}
      filter={filter}
      panelStyle={{ maxHeight: "300px" }} />);


};

export default CommonSelect;