import React, { useState } from 'react';
import './Tooltip.css';

interface Props {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Tooltip: React.FC<Props> = ({ title, children, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="tooltip"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered && (
        <div className={`tooltip__content ${className}`}>{title}</div>
      )}
    </div>
  );
};

export default Tooltip;
