import React from 'react';
import './FormLabel.css';

interface Props {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}

const Label: React.FC<Props> = ({ htmlFor, children, className = '' }) => {
  return (
    <label htmlFor={htmlFor} className={`form-label ${className}`}>
      {children}
    </label>
  );
};

export default Label;
