import React, { ElementType, HTMLAttributes } from 'react';
import './Header.css';

interface Props extends HTMLAttributes<HTMLHeadElement> {
  as?: ElementType;
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<Props> = ({
  as: Tag = 'h6',
  children,
  className = '',
  ...props
}) => {
  const classes = `header header--${Tag} ${className}`;

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
};

export default Header;
