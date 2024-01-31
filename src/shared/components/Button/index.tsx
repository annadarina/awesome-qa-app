import React, { ButtonHTMLAttributes } from 'react';
import './Button.css';

type Variant =
  | 'default'
  | 'primary'
  | 'danger'
  | 'info'
  | 'warning'
  | 'success';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
}

const getVariantClassName = (variant: Variant) => {
  if (variant === 'default') {
    return '';
  }

  return `button--${variant}`;
};

const Button: React.FC<Props> = ({
  children,
  className = '',
  variant = 'default',
  ...props
}) => {
  return (
    <button
      className={`button ${getVariantClassName(variant)} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
