import React from 'react';
import './Checkbox.css';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Checkbox: React.FC<Props> = ({ label, id, disabled, ...props }) => {
  return (
    <label
      htmlFor={id}
      className={`container ${disabled ? 'container--disabled' : ''}`}
    >
      {label}
      <input type="checkbox" {...props} id={id} />
      <span className="checkmark"></span>
    </label>
  );
};

export default Checkbox;
