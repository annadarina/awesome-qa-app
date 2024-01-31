import React, { MouseEvent } from 'react';
import './IconButton.css';

interface Props {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactElement;
  label?: string;
  className?: string;
}

const IconButton: React.FC<Props> = ({
  onClick,
  children,
  className,
  label = 'icon',
}) => {
  return (
    <button
      aria-label={label}
      className={`icon-button ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default IconButton;
